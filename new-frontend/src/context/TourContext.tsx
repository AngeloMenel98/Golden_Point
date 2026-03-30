"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Tour } from "@/entities/Tour";

interface TourContextType {
  currentTour: Tour | null;
  setCurrentTour: (tour: Tour | null) => void;
  tours: Tour[];
  setTours: React.Dispatch<React.SetStateAction<Tour[]>>;
  isLoading: boolean;
  error: string | null;
  createTour: (
    name: string,
    clubsId: string[],
  ) => Promise<{ success: boolean; error?: string }>;
  joinTour: (code: string) => Promise<{ success: boolean; error?: string }>;
  deleteTour: (id: string) => Promise<{ success: boolean; error?: string }>;
  refreshTours: () => Promise<void>;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: ReactNode }) {
  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshTours = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tours", {
        credentials: "include",
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error || "Error al cargar los tours");
        return;
      }

      setTours(result.data || []);
    } catch (err) {
      console.error("Error fetching tours:", err);
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTour = useCallback(
    async (
      name: string,
      clubsId: string[],
    ): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/tours", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, clubsId }),
        });

        const result = await response.json();

        if (!result.success) {
          return { success: false, error: result.error };
        }

        // Refresh tours list after creation
        await refreshTours();
        return { success: true };
      } catch (err) {
        console.error("Error creating tour:", err);
        return {
          success: false,
          error: "Error de conexión. Intenta de nuevo.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [refreshTours],
  );

  const joinTour = useCallback(
    async (code: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        // Cookie is automatically sent with credentials: 'include'
        const response = await fetch("/api/tours/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code }),
        });

        const result = await response.json();

        if (!result.success) {
          return { success: false, error: result.error };
        }

        // Refresh tours list after joining
        await refreshTours();
        return { success: true };
      } catch (err) {
        console.error("Error joining tour:", err);
        return {
          success: false,
          error: "Error de conexión. Intenta de nuevo.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [refreshTours],
  );

  const deleteTour = useCallback(
    async (id: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        // Cookie is automatically sent with credentials: 'include'
        const response = await fetch(`/api/tours/${id}`, {
          method: "DELETE",
          credentials: "include",
        });

        const result = await response.json();

        if (!result.success) {
          return { success: false, error: result.error };
        }

        // Refresh tours list after deletion
        await refreshTours();

        // Clear current tour if it was deleted
        if (currentTour?.id === id) {
          setCurrentTour(null);
        }

        return { success: true };
      } catch (err) {
        console.error("Error deleting tour:", err);
        return {
          success: false,
          error: "Error de conexión. Intenta de nuevo.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [refreshTours, currentTour],
  );

  return (
    <TourContext.Provider
      value={{
        currentTour,
        setCurrentTour,
        tours,
        setTours,
        isLoading,
        error,
        createTour,
        joinTour,
        deleteTour,
        refreshTours,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

export function useTour(): TourContextType {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
}
