import { cookies } from "next/headers";
import MatchesView from "@/components/matches/MatchesView";
import { Match } from "@/types/match";

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

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string; groupStage?: string }>;
}

async function fetchTournamentName(tournamentId: string, token: string): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/api/tournaments/${tournamentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    // Handle different response formats - backend uses "title"
    return json.data?.title || json.title || json.data?.name || json.data?.tournamentName || null;
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return null;
  }
}

export default async function MatchesPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { category, groupStage } = await searchParams;

  // Default values - will be overridden by URL params if provided
  const selectedCategory = category ?? "Masculino-Septima";
  const selectedGroupStage = groupStage ?? "Grupo 1";

  // Fetch tournament name for breadcrumb
  let tournamentName: string | null = null;
  let isAdmin = false;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    tournamentName = await fetchTournamentName(id, token);
    const user = getUserFromToken(token);
    isAdmin = user?.role === "admin";
  } catch (error) {
    console.error("Error fetching tournament name:", error);
  }

  // If no name fetched, use a fallback
  const displayTournamentName = tournamentName || `Tournament ${id}`;

  // Always pass isAdmin (defaults to false if not admin)
  const isAdminValue = isAdmin;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";

    const res = await fetch(
      `${API_URL}/api/matches/${id}/${encodeURIComponent(selectedCategory)}/${encodeURIComponent(selectedGroupStage)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch matches:", res.status);
      return (
        <MatchesView
          initialMatches={[]}
          initialCategory={selectedCategory}
          initialGroupStage={selectedGroupStage}
        />
      );
    }

    const json = await res.json();
    const matches: Match[] = json.success ? json.data : [];

    return (
      <MatchesView
        initialMatches={matches}
        initialCategory={selectedCategory}
        initialGroupStage={selectedGroupStage}
        tournamentName={displayTournamentName}
        isAdmin={isAdminValue}
        tournamentId={id}
      />
    );
  } catch (error) {
    console.error("Error fetching matches:", error);
    return (
      <MatchesView
        initialMatches={[]}
        initialCategory={selectedCategory}
        initialGroupStage={selectedGroupStage}
        tournamentName={displayTournamentName}
        isAdmin={isAdminValue}
        tournamentId={id}
      />
    );
  }
}
