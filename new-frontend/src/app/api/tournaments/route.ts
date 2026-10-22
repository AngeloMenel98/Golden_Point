import { NextRequest, NextResponse } from "next/server";
import {
  getTokenFromCookie,
  getUserIdFromToken,
} from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface CategoryPayload {
  category: string;
  gender: string;
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

    // Get tourId from search params
    const { searchParams } = new URL(request.url);
    const tourId = searchParams.get("tourId");

    if (!tourId) {
      return NextResponse.json(
        { success: false, error: "tourId es requerido" },
        { status: 400 },
      );
    }

    // Fetch tournaments by tourId
    const response = await fetch(`${API_URL}/api/tournament/tourns/${tourId}`, {
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
        { success: false, error: "Failed to fetch tournaments" },
        { status: response.status },
      );
    }

    const data = await response.json();

    const tournaments: Array<{
      id: string;
      tourId: string;
      title: string;
      status: string;
      teamsCount: number;
      master: number;
      categories: CategoryPayload[];
      tour: { id: string };
    }> = [];

    // Extract the tournaments object (it's in data.data or directly in data)
    const tournamentsObj = data.data || data;

    if (
      tournamentsObj &&
      typeof tournamentsObj === "object" &&
      !Array.isArray(tournamentsObj)
    ) {
      Object.entries(tournamentsObj).forEach(([id, t]) => {
        const tournament = t as Record<string, unknown>;
        tournaments.push({
          id: id,
          tourId: tourId,
          title: String(
            tournament.tournamentName ||
              tournament.title ||
              tournament.name ||
              "Unnamed",
          ),
          status: String(tournament.status || "pending"),
          teamsCount: parseInt(String(tournament.teamsCount || 0), 10),
          master: parseInt(
            String(tournament.master || tournament.masterScore || 0),
            10,
          ),
          // Categories come as [{ category, gender }] objects
          categories: Array.isArray(tournament.categories)
            ? (tournament.categories as CategoryPayload[])
            : [],
          // Load-bearing: TournamentsClient filters t.tour.id === tourId
          tour: { id: tourId },
        });
      });
    }

    return NextResponse.json({ success: true, data: tournaments });
  } catch (error) {
    console.error("Error fetching tournaments:", error);
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

    const userId = getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Token inválido" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { name, tourId, master, categories } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "El nombre del torneo es requerido" },
        { status: 400 },
      );
    }

    if (!tourId) {
      return NextResponse.json(
        { success: false, error: "El tour es requerido" },
        { status: 400 },
      );
    }

    if (master === undefined || master === null || Number(master) < 1) {
      return NextResponse.json(
        { success: false, error: "Master obligatorio" },
        { status: 400 },
      );
    }

    const validCategories =
      Array.isArray(categories) &&
      categories.length > 0 &&
      categories.every(
        (c: unknown) =>
          c !== null &&
          typeof c === "object" &&
          typeof (c as CategoryPayload).gender === "string" &&
          (c as CategoryPayload).gender !== "" &&
          typeof (c as CategoryPayload).category === "string" &&
          (c as CategoryPayload).category !== "",
      );

    if (!validCategories) {
      return NextResponse.json(
        { success: false, error: "Categorias" },
        { status: 400 },
      );
    }

    const response = await fetch(`${API_URL}/api/tournament/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title: name.trim(),
        tourId,
        userId,
        master,
        categories,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.error?.message || data.message || "Error al crear el torneo";
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: response.status },
      );
    }

    return NextResponse.json({ success: true, data: data.data || data });
  } catch (error) {
    console.error("Error creating tournament:", error);
    return NextResponse.json(
      { success: false, error: "Error de conexión. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
