import { cookies } from "next/headers";
import { Tour } from "@/entities/Tour";
import { ToursPageClient } from "@/components/tours/ToursPageClient";

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

async function fetchTours(userId: string, token: string): Promise<Tour[]> {
  try {
    const response = await fetch(`${API_URL}/api/tour/tours/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch tours:", response.status);
      return [];
    }

    const data = await response.json();

    // Backend returns { success: true, data: [{ tourid, tourtitle, ... }] }
    // Normalize to Tour[] format with camelCase field names
    const rawTours = Array.isArray(data) ? data : data.data || data.tours || [];
    const tours: Tour[] = (rawTours as Record<string, unknown>[]).map((t) => ({
      id: t.tourid as string,
      name: t.tourtitle as string,
      tourCode: t.tourcode as string,
      userCount: parseInt(String(t.usercount), 10) || 0,
      tournamentCount: parseInt(String(t.tournamentcount), 10) || 0,
      userOwner: (t.firstusername || t.userowner || "") as string,
    }));

    return tours;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

export default async function ToursPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  const user = token ? getUserFromToken(token) : null;
  const userId = user?.id || "1";
  const isAdmin = user?.role === "admin";

  const initialTours = token ? await fetchTours(userId, token) : [];

  return <ToursPageClient initialTours={initialTours} isAdmin={isAdmin} userId={userId} />;
}
