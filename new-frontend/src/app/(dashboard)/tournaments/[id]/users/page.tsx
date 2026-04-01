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
      tour: t.tour,
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

    // Extract only simplified fields: userId (or id), username, firstName, lastName
    const users = data.data || [];
    return users.map((user: Record<string, unknown>) => ({
      id: String(user.id || user.userId || ""),
      username: String(user.username || ""),
      firstName: user.firstName ? String(user.firstName) : undefined,
      lastName: user.lastName ? String(user.lastName) : undefined,
      fullName:
        user.firstName || user.lastName
          ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
          : undefined,
    }));
  } catch (error) {
    console.error("Error fetching tournament users:", error);
    return [];
  }
}

interface TeamData {
  id: string;
  name: string;
  category: string;
  usersId: string[];
}

async function fetchTeamsByTournament(
  tournamentId: string,
  token: string,
): Promise<TeamData[]> {
  try {
    const response = await fetch(`${API_URL}/api/teams/${tournamentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch teams:", response.status);
      return [];
    }

    const data = await response.json();

    if (!data.success) {
      return [];
    }

    const teams = data.data || data || [];
    return teams.map((team: Record<string, unknown>) => ({
      id: String(team.id || team.teamId || ""),
      name: String(team.name || team.teamName || ""),
      category: String(team.category || ""),
      usersId: Array.isArray(team.usersId)
        ? team.usersId.map((id: unknown) => String(id))
        : typeof team.usersId === "string"
          ? team.usersId.split(",").map((s: string) => s.trim())
          : [],
    }));
  } catch (error) {
    console.error("Error fetching teams:", error);
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

  const users = token
    ? await fetchTournamentUsers(tournament.tour.id, token)
    : [];

  // Fetch teams and build participation map
  const teams = token ? await fetchTeamsByTournament(tournament.id, token) : [];

  // Build participation map: userId -> boolean (true if in any team)
  const participationMap = new Map<string, boolean>();
  teams.forEach((team) => {
    team.usersId.forEach((userId) => {
      participationMap.set(userId, true);
    });
  });

  return (
    <div>
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
        participationMap={participationMap}
      />
    </div>
  );
}
