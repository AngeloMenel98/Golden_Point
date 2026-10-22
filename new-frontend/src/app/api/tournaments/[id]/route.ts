import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getTokenFromCookie();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const response = await fetch(`${API_URL}/api/tournaments/${id}`, {
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
      if (response.status === 404) {
        return NextResponse.json(
          { success: false, error: "Torneo no encontrado" },
          { status: 404 },
        );
      }
      return NextResponse.json(
        { success: false, error: "Failed to fetch tournament" },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Normalize tournament data (backend entity: title, master, tour relation,
    // categories, teams[].teamName)
    const t = data.data || data;
    const tournament = {
      id: t.id || t.tournamentid,
      title: t.title || t.name || t.tournamentname,
      master: parseInt(
        String(t.master ?? t.masterscore ?? t.master_score ?? 0),
        10,
      ),
      status: t.status || t.state || "pending",
      categories: Array.isArray(t.categories)
        ? t.categories
        : t.category
          ? [t.category]
          : [],
      // Keep the nested tour relation (UI reads tour?.id); never flatten to tourId
      tour: t.tour
        ? { id: t.tour.id }
        : t.tourid || t.tourId
          ? { id: t.tourid || t.tourId }
          : undefined,
      // Backend team entity uses teamName — map to name for the UI
      teams: Array.isArray(t.teams)
        ? t.teams.map((team: Record<string, unknown>) => ({
            id: team.id,
            name: team.teamName || team.name,
            category: team.category,
            usersId: team.usersId,
          }))
        : [],
      createdAt: t.creationdate || t.createdat || t.createdAt,
      startedAt: t.startedat || t.startedAt,
      finishedAt: t.finishedat || t.finishedAt,
    };

    return NextResponse.json({ success: true, data: tournament });
  } catch (error) {
    console.error("Error fetching tournament:", error);
    return NextResponse.json(
      { success: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = await getTokenFromCookie();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Extract userId from token payload (JWT)
    let userId: string;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id || payload.sub;
    } catch {
      return NextResponse.json(
        { success: false, error: "Token inválido" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const response = await fetch(`${API_URL}/api/tournament/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ tournamentId: id, userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.error?.message || data.message || "Error al eliminar el torneo";
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return NextResponse.json(
      { success: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
