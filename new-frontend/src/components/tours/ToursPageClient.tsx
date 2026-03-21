"use client";

import { useState, useEffect } from "react";
import { Tour } from "@/entities/Tour";
import { TourList } from "./TourList";
import { CreateTourModal } from "./CreateTourModal";
import { JoinTourModal } from "./JoinTourModal";
import { ToursSkeleton } from "./ToursSkeleton";
import { useTour } from "@/context/TourContext";

interface ToursPageClientProps {
  initialTours: Tour[];
  isAdmin: boolean;
}

export function ToursPageClient({
  initialTours,
  isAdmin,
}: ToursPageClientProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const {
    tours,
    setTours,
    isLoading,
    error,
    createTour,
    joinTour,
    deleteTour,
    setCurrentTour,
  } = useTour();

  // Initialize tours from SSR data
  useEffect(() => {
    if (initialTours && initialTours.length > 0) {
      setTours(initialTours);
    }
    setIsInitialLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTours]);

  const handleCreateTour = async (name: string, clubsId: string[]) => {
    return await createTour(name, clubsId);
  };

  const handleJoinTour = async (code: string) => {
    return await joinTour(code);
  };

  const handleDeleteTour = async (id: string) => {
    return await deleteTour(id);
  };

  const handleNavigate = (tour: Tour) => {
    setCurrentTour(tour);
  };

  // Show skeleton during initial load
  if (isInitialLoading) {
    return <ToursSkeleton />;
  }

  // Display tours from context (may have been updated)
  const displayTours = tours.length > 0 ? tours : initialTours;

  // Get existing tour names for duplicate validation
  const existingTourNames = displayTours.map((t) => t.name.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gp-dark">Tours</h1>
        <div className="flex gap-3">
          {/* Join Tour Button (All Users) */}
          <button
            onClick={() => setIsJoinModalOpen(true)}
            className="px-4 py-2 border-2 border-gp-dark text-gp-dark rounded-md hover:bg-gp-dark hover:text-white transition-colors font-medium"
            type="button"
          >
            Unirse a Tour
          </button>

          {/* Create Tour Button (Admin Only) */}
          {isAdmin && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-gp-pastel text-white rounded-md hover:bg-gp-dark transition-colors font-medium"
              type="button"
            >
              Crear Tour
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-gp-red/10 border border-gp-red text-gp-red px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gp-pastel"></div>
          <span className="ml-3 text-gp-gray">Actualizando...</span>
        </div>
      )}

      {/* Tour List */}
      <TourList
        tours={displayTours}
        onNavigate={handleNavigate}
        onDelete={handleDeleteTour}
        isAdmin={isAdmin}
      />

      {/* Create Tour Modal */}
      <CreateTourModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTour}
        existingTourNames={existingTourNames}
      />

      {/* Join Tour Modal */}
      <JoinTourModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSubmit={handleJoinTour}
      />
    </div>
  );
}
