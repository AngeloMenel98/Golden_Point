import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const token = await getTokenFromCookie();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { userId } = await params;

    // Fetch user's tournaments from backend
    const response = await fetch(`${API_URL}/api/tournament/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 401 },
        );
      }
      return NextResponse.json(
        { success: false, error: "Failed to fetch user tournaments" },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Normalize tournament data. Repository returns raw rows whose alias
    // casing may be camelCase or folded to lowercase — read case-tolerantly (D5).
    const tournaments = Array.isArray(data.data)
      ? data.data.map((t: Record<string, unknown>) => ({
          id: t.tournamentId || t.tournamentid || t.id,
          name: t.tournamentName || t.tournamentname || t.title || t.name,
          status: t.status || "unknown",
          category: t.teamCategory || t.teamcategory || t.category,
          matchDate: t.matchDate || t.matchdate,
          teamName: t.teamName || t.teamname,
          oppTeamName: t.oppTeamName || t.oppteamname,
          groupStage: t.groupStage || t.groupstage,
        }))
      : [];

    return NextResponse.json({ success: true, data: tournaments });
  } catch (error) {
    console.error("Error fetching user tournaments:", error);
    return NextResponse.json(
      { success: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 500 },
    );
  }
}