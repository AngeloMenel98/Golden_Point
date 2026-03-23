"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: number;
  username: string;
  email: string;
  role?: "admin" | "user";
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Required for cookies to be stored
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const errorMessage =
          data.error?.message || data.message || "Login failed";
        return { success: false, error: errorMessage };
      }

      const { token, user } = data.data;

      // Set cookie for frontend domain (localhost:3001) so SSR can read it
      // This cookie is readable by Next.js Server Components via cookies()
      document.cookie = `token=${token}; path=/; max-age=${24 * 60 * 60}; samesite=lax`;

      setUser({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Network error. Please try again." };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // Clear the frontend cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=lax';
  }, []);

  // Hydrate user from cookie on mount (page refresh)
  useEffect(() => {
    const hydrateUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data?.user) {
            setUser({
              id: data.data.user.id,
              username: data.data.user.username,
              email: data.data.user.email,
              role: data.data.user.role,
            });
          }
        } else {
          // Token invalid/expired - clear cookie
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; samesite=lax';
          setUser(null);
        }
      } catch (error) {
        console.error('Error hydrating user:', error);
      }
    };

    hydrateUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        isAuthenticated: !!user,
        isLoading,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
