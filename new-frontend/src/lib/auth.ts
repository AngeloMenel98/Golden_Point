import { cookies } from "next/headers";

/**
 * Reads the JWT token from the "token" cookie (server-only).
 * Returns null when the cookie is absent.
 */
export async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}

/**
 * Decodes a JWT payload (atob) and returns the user id from
 * `payload.id || payload.sub`. Returns null on parse errors or when
 * neither claim is present. Matches the set/create route pattern.
 */
export function getUserIdFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id || payload.sub || null;
  } catch {
    return null;
  }
}
