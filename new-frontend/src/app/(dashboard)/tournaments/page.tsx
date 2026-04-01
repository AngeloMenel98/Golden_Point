import { cookies } from "next/headers";
import { Tournament, TournamentStatus, Category } from "@/entities/Tournament";
import { TournamentsClient } from "@/components/tournaments/TournamentsClient";
import { Tour } from "@/entities";

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

async function fetchTournaments(
  tourId: string,
  token: string,
): Promise<Tournament[]> {
  try {
    const response = await fetch(`${API_URL}/api/tournament/tourns/${tourId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch tournaments:", response.status);
      return [];
    }

    const data = await response.json();
    const tournamentsData = data.data || data;

    const tournaments: Tournament[] = Object.entries(tournamentsData)
      .filter(([key]) => key !== "success")
      .map(([id, t]) => {
        const tournament = t as Record<string, unknown>;
        return {
          id: id,
          tour: {
            id: tourId,
          } as Tour,
          name: String(
            tournament.tournamentName || tournament.name || "Unnamed",
          ),
          masterScore: parseInt(
            String(tournament.master || tournament.masterScore || 0),
            10,
          ),
          status: (tournament.status || "pending") as TournamentStatus,
          teamsCount: parseInt(String(tournament.teamsCount || 0), 10),
          categories: Array.isArray(tournament.categories)
            ? (tournament.categories as Category[])
            : [],
          createdAt: String(
            tournament.creationDate || tournament.createdAt || "",
          ),
          startedAt: tournament.startedAt
            ? String(tournament.startedAt)
            : undefined,
          finishedAt: tournament.finishedAt
            ? String(tournament.finishedAt)
            : undefined,
        };
      });

    return tournaments;
  } catch (error) {
    console.error("Error fetching tournaments:", error);
    return [];
  }
}

export default async function TournamentsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  const user = token ? getUserFromToken(token) : null;
  const isAdmin = user?.role === "admin";

  const tourId = cookieStore.get("currentTourId")?.value;

  const initialTournaments =
    token && tourId ? await fetchTournaments(tourId, token) : [];

  return (
    <TournamentsClient
      initialTournaments={initialTournaments}
      isAdmin={isAdmin}
      tourId={tourId}
    />
  );
}
