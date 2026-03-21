'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Tour {
  id: number;
  name: string;
  tourCode: string;
  // Add other tour fields as needed from backend
}

interface TourContextType {
  currentTour: Tour | null;
  setCurrentTour: (tour: Tour | null) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: ReactNode }) {
  const [currentTour, setCurrentTour] = useState<Tour | null>(null);

  return (
    <TourContext.Provider value={{ currentTour, setCurrentTour }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour(): TourContextType {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
