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
    const response = await fetch(`${API_URL}/tour/tours/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    });

    console.log("response TOurs", response);

    if (!response.ok) {
      console.error("Failed to fetch tours:", response.status);
      return [];
    }

    const data = await response.json();

    // Handle various response formats
    if (Array.isArray(data)) {
      return data;
    }
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    if (data.tours && Array.isArray(data.tours)) {
      return data.tours;
    }

    return [];
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

export default async function ToursPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  console.log("token", token);

  const user = token ? getUserFromToken(token) : null;
  const userId = user?.id || "1";
  const isAdmin = user?.role === "admin";

  const initialTours = token ? await fetchTours(userId, token) : [];

  return <ToursPageClient initialTours={initialTours} isAdmin={isAdmin} />;
}
