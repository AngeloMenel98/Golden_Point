import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Club, ClubDTO } from "@/entities/Club";

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
    const { userId } = await params;

    const token = await getTokenFromCookie();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const response = await fetch(`${API_URL}/clubs/available/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch available clubs" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const rawClubs = Array.isArray(data) ? data : data.data || [];

    const clubs: Club[] = rawClubs.map((c: ClubDTO) => ({
      id: String(c.id),
      clubName: c.clubName,
      address: c.address,
      courtCount: Number(c.courtcount),
      availableFrom: c.availableFrom,
      availableTo: c.availableTo,
      userId: c.userId,
    }));

    return NextResponse.json({ success: true, data: clubs });
  } catch (error) {
    console.error("Error fetching available clubs:", error);
    return NextResponse.json(
      { success: false, error: "Error de conexión" },
      { status: 500 },
    );
  }
}
