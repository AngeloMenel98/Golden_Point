import { cookies } from "next/headers";
import MatchesView from "@/components/matches/MatchesView";
import { Match } from "@/types/match";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string; groupStage?: string }>;
}

export default async function MatchesPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { category, groupStage } = await searchParams;

  // Default values - will be overridden by URL params if provided
  const selectedCategory = category ?? "Masculino-Septima";
  const selectedGroupStage = groupStage ?? "Grupo 1";

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
      />
    );
  } catch (error) {
    console.error("Error fetching matches:", error);
    return (
      <MatchesView
        initialMatches={[]}
        initialCategory={selectedCategory}
        initialGroupStage={selectedGroupStage}
      />
    );
  }
}
