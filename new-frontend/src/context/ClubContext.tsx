'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Club } from '@/entities/Club';

interface ClubContextType {
  clubs: Club[];
  isLoading: boolean;
  error: string | null;
  refreshClubs: () => Promise<void>;
  createClub: (data: Omit<Club, 'id'>) => Promise<{ success: boolean; error?: string }>;
}

const ClubContext = createContext<ClubContextType | undefined>(undefined);

export function ClubProvider({ children }: { children: ReactNode }) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshClubs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clubs', { credentials: 'include' });
      const result = await response.json();
      if (!result.success) {
        setError(result.error || 'Error al cargar los clubes');
        return;
      }
      setClubs(result.data || []);
    } catch (err) {
      console.error('Error fetching clubs:', err);
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createClub = useCallback(async (data: Omit<Club, 'id'>): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) return { success: false, error: result.error };
      await refreshClubs();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Error de conexión' };
    } finally {
      setIsLoading(false);
    }
  }, [refreshClubs]);

  useEffect(() => {
    refreshClubs();
  }, [refreshClubs]);

  return (
    <ClubContext.Provider value={{ clubs, isLoading, error, refreshClubs, createClub }}>
      {children}
    </ClubContext.Provider>
  );
}

export function useClubs() {
  const context = useContext(ClubContext);
  if (!context) throw new Error('useClubs must be used within a ClubProvider');
  return context;
}
