"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Tournament } from "@/entities/Tournament";
import { useTournament } from "@/context/TournamentContext";
import { useUser } from "@/context/UserContext";
import { TournamentCard } from "./TournamentCard";
import { TournamentForm } from "./TournamentForm";
import { ConfirmationModal } from "@/components/tours/ConfirmationModal";
import { UserStatsDrawer } from "@/components/users/UserStatsDrawer";

interface TournamentsClientProps {
  isAdmin: boolean;
  tourId?: string;
  initialTournaments?: Tournament[];
}

export function TournamentsClient({
  isAdmin,
  tourId,
  initialTournaments = [],
}: TournamentsClientProps) {
  const router = useRouter();
  const { user } = useUser();
  const {
    tournaments,
    setTournaments,
    isLoading,
    error,
    fetchTournaments,
    createTournament,
    deleteTournament,
    startTournament,
  } = useTournament();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    tournamentId: string | null;
  }>({ show: false, tournamentId: null });
  const [showMyStats, setShowMyStats] = useState(false);

  // Initialize tournaments from props
  useEffect(() => {
    if (initialTournaments.length > 0) {
      setTournaments(initialTournaments);
    }
  }, [initialTournaments, setTournaments]);

  // Fetch tournaments on mount or when tourId changes (only if no initial data)
  useEffect(() => {
    if (initialTournaments.length === 0) {
      fetchTournaments(tourId);
    }
  }, [fetchTournaments, tourId, initialTournaments.length]);

  const handleCreate = useCallback(
    async (data: {
      name: string;
      tourId: string;
      masterScore: number;
      categories: string[];
    }) => {
      return await createTournament(data);
    },
    [createTournament],
  );

  const handleDeleteClick = useCallback((tournamentId: string) => {
    setDeleteConfirm({ show: true, tournamentId });
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (deleteConfirm.tournamentId === null) return;

    const result = await deleteTournament(deleteConfirm.tournamentId);
    setDeleteConfirm({ show: false, tournamentId: null });

    if (!result.success) {
      alert(result.error || "Error al eliminar el torneo");
    }
  }, [deleteConfirm.tournamentId, deleteTournament]);

  const handleStartClick = useCallback(
    async (tournamentId: string) => {
      const result = await startTournament(tournamentId);

      if (!result.success) {
        alert(result.error || "Error al iniciar el torneo");
      }
    },
    [startTournament],
  );

  const handleTournamentClick = useCallback(
    (tournament: Tournament) => {
      router.push(`/tournaments/${tournament.id}`);
    },
    [router],
  );

  const existingNames = tournaments.map((t) => t.title.toLowerCase());

  // Filter tournaments by tourId if provided
  const filteredTournaments = tourId
    ? tournaments.filter((t) => t.tour.id === tourId)
    : tournaments;

  if (isLoading && tournaments.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gp-dark"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gp-dark">Torneos</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* My Stats Button - visible for non-admin users */}
          {user && !isAdmin && (
            <button
              onClick={() => setShowMyStats(true)}
              className="px-4 py-2 bg-gp-light text-gp-dark rounded-lg hover:bg-gp-light/80 transition-colors flex items-center gap-2 border border-gp-gray-light/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Mis Estadísticas
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-gp-pastel text-white rounded-lg hover:bg-gp-pastel/90 transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Crear Torneo
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-gp-red text-sm">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {filteredTournaments.length === 0 && !isLoading && (
        <div className="text-center p-12 bg-gp-light/30 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gp-gray mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <p className="text-gp-gray text-lg mb-2">
            {isAdmin ? "No hay tournaments" : "No participas en ningún torneo"}
          </p>
          {isAdmin && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-gp-pastel hover:underline"
            >
              Crea el primer torneo
            </button>
          )}
        </div>
      )}

      {/* Tournament List */}
      {filteredTournaments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              isAdmin={isAdmin}
              onDelete={isAdmin ? handleDeleteClick : undefined}
              onStart={isAdmin ? handleStartClick : undefined}
              onClick={handleTournamentClick}
            />
          ))}
        </div>
      )}

      {/* Create Tournament Modal */}
      {isAdmin && (
        <TournamentForm
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreate}
          tourId={tourId || ""}
          existingTournamentNames={existingNames}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirm.show}
        title="Eliminar Torneo"
        message="¿Estás seguro de que deseas eliminar este torneo? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm({ show: false, tournamentId: null })}
        variant="danger"
      />

      {user && !isAdmin && (
        <UserStatsDrawer
          isOpen={showMyStats}
          onClose={() => setShowMyStats(false)}
          userId={String(user.id)}
          username={user.username}
          fullName={
            `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
            user.username
          }
          tourId={tourId}
        />
      )}
    </div>
  );
}
