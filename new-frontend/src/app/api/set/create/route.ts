import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
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

    // Validate token payload (JWT)
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!payload.id && !payload.sub) {
        return NextResponse.json(
          { success: false, error: "Token inválido" },
          { status: 401 },
        );
      }
    } catch {
      return NextResponse.json(
        { success: false, error: "Token inválido" },
        { status: 401 },
      );
    }

    const body = await request.json();

    // Call backend to create sets
    const response = await fetch(`${API_URL}/api/set/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.error?.message || data.message || "Error al guardar los sets";
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error("Error creating sets:", error);
    return NextResponse.json(
      { success: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
