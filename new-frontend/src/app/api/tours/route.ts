import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

export async function GET(request: NextRequest) {
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
      if (!userId) {
        // Fallback: get from search params
        const { searchParams } = new URL(request.url);
        userId = searchParams.get("userId") || "1";
      }
    } catch {
      const { searchParams } = new URL(request.url);
      userId = searchParams.get("userId") || "1";
    }

    const response = await fetch(`${API_URL}/api/tours/${userId}`, {
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
        { success: false, error: "Failed to fetch tours" },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Backend returns { success: true, data: [{ tourid, tourtitle, ... }] }
    // Normalize to Tour[] format with camelCase field names
    const rawTours = Array.isArray(data) ? data : data.data || data.tours || [];
    const tours = rawTours.map((t: Record<string, unknown>) => ({
      id: t.tourid || t.tourId,
      name: t.tourtitle || t.tourTitle,
      tourCode: t.tourcode || t.tourCode,
      userCount: t.usercount || t.userCount || 0,
      tournamentCount: t.tournamentcount || t.tournamentCount || 0,
      userOwner: t.firstusername || t.firstUserName || "",
      createdAt: t.creationdate || t.createdat,
    }));

    return NextResponse.json({ success: true, data: tours });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { success: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getTokenFromCookie();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    let userId: string;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id || payload.sub;
      if (!userId) {
        userId = "1";
      }
    } catch {
      userId = "1";
    }

    const body = await request.json();
    const { name, clubsId } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "El nombre del tour es requerido" },
        { status: 400 },
      );
    }

    if (!clubsId || !Array.isArray(clubsId) || clubsId.length === 0) {
      return NextResponse.json(
        { success: false, error: "Selecciona al menos un club" },
        { status: 400 },
      );
    }

    const response = await fetch(`${API_URL}/api/tours`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title: name.trim(), userId, clubsId }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.error?.message || data.message || "Error al crear el tour";
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error("Error creating tour:", error);
    return NextResponse.json(
      { success: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
