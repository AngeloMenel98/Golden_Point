import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Club, ClubDTO } from "@/entities/Club";

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

    let userId: string;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id || payload.sub;
    } catch {
      const { searchParams } = new URL(request.url);
      userId = searchParams.get("userId") || "1";
    }

    const response = await fetch(`${API_URL}/club/clubs/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch clubs" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const rawClubs = Array.isArray(data) ? data : data.data || [];

    const clubs: Club[] = rawClubs.map((c: ClubDTO) => ({
      id: String(c.id),
      name: c.clubName,
      address: c.address,
      courtCount: Number(c.courtcount),
      availableFrom: c.availableFrom,
      availableTo: c.availableTo,
    }));

    return NextResponse.json({ success: true, data: clubs });
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return NextResponse.json(
      { success: false, error: "Error de conexión" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getTokenFromCookie();
    if (!token)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );

    const body = await request.json();
    const { name, address, courtCount, availableFrom, availableTo } = body;

    let userId: string;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id || payload.sub;
    } catch {
      userId = "1";
    }

    console.log("Body", body);

    const response = await fetch(`${API_URL}/api/clubs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        clubName: name,
        address,
        courtsNumber: String(courtCount),
        availableFrom,
        availableTo,
      }),
    });

    const data = await response.json();
    
    // Check for backend-level errors or unsuccessful response
    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, error: data.error?.message || data.message || "Error creating club" },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error de conexión" },
      { status: 500 },
    );
  }
}
