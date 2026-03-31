import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Tournament, TournamentStatus } from "@/entities/Tournament";
import { UsersList } from "./UsersList";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface UserData {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

async function fetchTournament(
  id: string,
  token: string,
): Promise<Tournament | null> {
  try {
    console.log("id", id);
    const response = await fetch(`${API_URL}/api/tournaments/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch tournament:", response.status);
      return null;
    }

    const data = await response.json();

    if (!data.success) {
      return null;
    }

    const t = data.data;
    return {
      id: String(t.id || t.tournamentid),
      tourId: String(t.tourid || t.tourId),
      name: String(t.tournamentName || t.name || t.title || "Unnamed"),
      masterScore: parseInt(String(t.master || t.masterScore || 0), 10),
      status: (t.status as TournamentStatus) || TournamentStatus.PENDING,
      teamsCount: parseInt(String(t.teamsCount || 0), 10),
      categories: Array.isArray(t.categories) ? t.categories : [],
      createdAt: String(t.creationDate || t.createdAt || ""),
    };
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return null;
  }
}

async function fetchTournamentUsers(
  tourId: string,
  token: string,
): Promise<UserData[]> {
  try {
    const response = await fetch(`${API_URL}/api/users/${tourId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch users:", response.status);
      return [];
    }

    const data = await response.json();

    if (!data.success) {
      return [];
    }

    return data.data || [];
  } catch (error) {
    console.error("Error fetching tournament users:", error);
    return [];
  }
}

export default async function TournamentUsersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  if (!token) {
    return notFound();
  }

  const tournament = token ? await fetchTournament(id, token) : null;

  if (!tournament) {
    return (
      <div className="text-center p-12">
        <h1 className="text-2xl font-bold text-gp-dark mb-4">
          Torneo no encontrado
        </h1>
        <p className="text-gp-gray">
          El torneo que buscas no existe o no tienes acceso.
        </p>
      </div>
    );
  }

  // Get tourId from tournament data to fetch users
  const tourId = tournament.tourId;
  const users =
    token && tourId ? await fetchTournamentUsers(tourId, token) : [];

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <a
              href="/tournaments"
              className="text-gp-pastel hover:text-gp-dark transition-colors"
            >
              Torneos
            </a>
          </li>
          <li className="text-gp-gray">/</li>
          <li>
            <a
              href={`/tournaments/${id}`}
              className="text-gp-pastel hover:text-gp-dark transition-colors"
            >
              {tournament.name}
            </a>
          </li>
          <li className="text-gp-gray">/</li>
          <li className="text-gp-dark font-medium">Participantes</li>
        </ol>
      </nav>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gp-dark">
          Participantes del Torneo
        </h1>
        <p className="text-gp-gray mt-1">
          {users.length} {users.length === 1 ? "participante" : "participantes"}{" "}
          en {tournament.name}
        </p>
      </div>

      {/* Users list */}
      <UsersList
        users={users}
        tournamentId={id}
        tournamentName={tournament.name}
      />
    </div>
  );
}
