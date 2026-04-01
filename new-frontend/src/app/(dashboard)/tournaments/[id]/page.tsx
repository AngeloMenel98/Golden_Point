import { cookies } from "next/headers";
import { Tournament, TournamentStatus, Category } from "@/entities/Tournament";
import { TournamentDetails } from "@/components/tournaments/TournamentDetails";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function getUserFromToken(
  token: string,
): { id: string; role: "admin" | "user" } | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload.id || payload.sub || "1",
      role: payload.role || "user",
    };
  } catch {
    return null;
  }
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
      status: (t.status || "pending") as TournamentStatus,
      teamsCount: parseInt(String(t.teamsCount || 0), 10),
      categories: Array.isArray(t.categories)
        ? (t.categories as Category[])
        : [],
      createdAt: String(t.creationDate || t.createdAt || ""),
      startedAt: t.startedAt ? String(t.startedAt) : undefined,
      finishedAt: t.finishedAt ? String(t.finishedAt) : undefined,
    };
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return null;
  }
}

export default async function TournamentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  const user = token ? getUserFromToken(token) : null;
  const isAdmin = user?.role === "admin";

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

  return (
    <div>
      <TournamentDetails tournamentId={tournament.id} isAdmin={isAdmin} />
    </div>
  );
}
