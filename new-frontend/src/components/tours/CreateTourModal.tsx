"use client";

import { Suspense, useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ErrorBoundary, ErrorAnnouncer } from "@/components/ui/ErrorBoundary";
import { ClubFormCardSkeleton } from "@/components/ui/Skeleton";
import { ClubFormCard, ClubEntry } from "./ClubFormCard";
import { Club } from "@/entities/Club";

export type { ClubEntry };

interface CreateTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    clubs: ClubEntry[],
  ) => Promise<{ success: boolean; error?: string }>;
  existingTourNames: string[];
  userId?: string;
}

export function CreateTourModal({
  isOpen,
  onClose,
  onSubmit,
  existingTourNames,
  userId,
}: CreateTourModalProps) {
  const [name, setName] = useState("");
  const [selectedClubs, setSelectedClubs] = useState<ClubEntry[]>([]);
  const [availableClubs, setAvailableClubs] = useState<ClubEntry[]>([]);
  const [selectedClubIds, setSelectedClubIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingClubs, setIsLoadingClubs] = useState(false);

  // Fetch clubs from API when modal opens
  useEffect(() => {
    if (isOpen && userId) {
      fetchClubs();
    }
  }, [isOpen, userId]);

  const fetchClubs = async () => {
    if (!userId) return;

    setIsLoadingClubs(true);
    try {
      const response = await fetch(`/api/clubs/available/${userId}`, {
        credentials: "include",
      });
      const result = await response.json();

      if (result.success && result.data) {
        const fetchedClubs: ClubEntry[] = result.data.map((club: Club) => ({
          id: club.id,
          clubName: club.clubName,
          address: club.address,
          courtCount: club.courtCount || 1,
          availabilityStart: club.availableFrom || "",
          availabilityEnd: club.availableTo || "",
        }));
        setAvailableClubs(fetchedClubs);
        // Initialize with no clubs selected by default
        setSelectedClubIds([]);
      }
    } catch (err) {
      console.error("Error fetching clubs:", err);
    } finally {
      setIsLoadingClubs(false);
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setSelectedClubs([]);
      setAvailableClubs([]);
      setSelectedClubIds([]);
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle checkbox toggle
  const handleToggleClub = (clubId: string) => {
    setSelectedClubIds((prev) =>
      prev.includes(clubId)
        ? prev.filter((id) => id !== clubId)
        : [...prev, clubId],
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    setSelectedClubIds(availableClubs.map((c) => c.id));
  };

  // Handle clear all
  const handleClearAll = () => {
    setSelectedClubIds([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate name
    if (!name.trim()) {
      setError("El nombre del tour es requerido");
      return;
    }

    // Check for duplicates
    if (existingTourNames.includes(name.trim().toLowerCase())) {
      setError("Este nombre ya existe");
      return;
    }

    // Build final clubs list: selected API clubs + any custom clubs added via form
    const finalClubs = [
      ...selectedClubs,
      ...availableClubs.filter((c) => selectedClubIds.includes(c.id)),
    ];

    // Validate clubs
    if (finalClubs.length === 0) {
      setError("Selecciona al menos un club");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(name.trim(), finalClubs);

      if (result.success) {
        onClose();
      } else {
        setError(result.error || "Error al crear el tour");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddClub = (club: ClubEntry) => {
    setSelectedClubs((prev) => [...prev, club]);
    // Also auto-select the new club in the list
    if (!selectedClubIds.includes(club.id)) {
      setSelectedClubIds((prev) => [...prev, club.id]);
    }
  };

  // Auto-select club when duplicate is found in form
  const handleDuplicateFound = (clubId: string) => {
    setSelectedClubIds((prev) => 
      prev.includes(clubId) ? prev : [...prev, clubId]
    );
  };

  const handleRemoveCustomClub = (id: string) => {
    setSelectedClubs((prev) => prev.filter((club) => club.id !== id));
  };

  // Handle creating a new club via API
  const handleCreateClub = async (
    clubData: Omit<ClubEntry, "id">,
  ): Promise<{ success: boolean; error?: string; newClubId?: string }> => {
    try {
      const response = await fetch("/api/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: clubData.clubName,
          address: clubData.address,
          courtCount: clubData.courtCount,
          availableFrom: clubData.availabilityStart,
          availableTo: clubData.availabilityEnd,
        }),
      });
      const result = await response.json();

      if (result.success) {
        // Refresh clubs list to include the new club
        await fetchClubs();
        // Return the new club ID so it can be selected
        return { success: true, newClubId: result.data?.id };
      }

      return {
        success: false,
        error: result.error || "Error al crear el club",
      };
    } catch {
      return { success: false, error: "Error de conexión" };
    }
  };

  // Handle retry for error boundary
  const handleRetry = () => {
    setError(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Tour">
      {/* Error announcer for accessibility */}
      <ErrorAnnouncer message={error} />

      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          label="Nombre del Tour"
          placeholder="Nombre del tour"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={
            error?.includes("nombre") || error?.includes("existe")
              ? error
              : undefined
          }
          disabled={isSubmitting}
          required
        />

        <div className="space-y-2 pt-2 border-t border-gray-400">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Clubes
            </label>
          </div>

          {isLoadingClubs ? (
            <div className="text-center py-4 text-gp-gray">
              Cargando clubes...
            </div>
          ) : availableClubs.length === 0 ? (
            // Empty State
            <div className="border-2 border-dashed border-gp-gray-light rounded-xl p-8 text-center shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <p className="text-gp-dark font-medium">No hay ningún Club</p>
              <p className="text-gp-gray text-sm">
                Añade clubes para continuar
              </p>
            </div>
          ) : (
            <>
              {/* Create Club Form - at TOP, NOT scrollable */}
              <div className="mb-2">
                <ErrorBoundary onRetry={handleRetry}>
                  <Suspense fallback={<ClubFormCardSkeleton />}>
                    <ClubFormCard
                      onAdd={handleAddClub}
                      onCreateClub={handleCreateClub}
                      availableClubs={availableClubs}
                      onDuplicateFound={handleDuplicateFound}
                    />
                  </Suspense>
                </ErrorBoundary>
              </div>

              {/* Select All / Clear All */}
              <div className="flex gap-3 mb-2">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-gp-pastel hover:text-gp-dark transition-colors"
                >
                  Seleccionar todos
                </button>
                <span className="text-gp-gray">|</span>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-sm text-gp-pastel hover:text-gp-dark transition-colors"
                >
                  Limpiar selección
                </button>
                <span className="text-gp-gray ml-auto text-sm">
                  {selectedClubIds.length} seleccionados
                </span>
              </div>

              {/* Scrollable Club List ONLY - form is above */}
              <div className="gap-2 max-h-32 overflow-y-auto flex flex-col">
                {/* Sort: selected clubs first, then A-Z */}
                {availableClubs
                  .slice() // Create copy to not mutate
                  .sort((a, b) => {
                    const aSelected = selectedClubIds.includes(a.id);
                    const bSelected = selectedClubIds.includes(b.id);
                    // Selected first
                    if (aSelected && !bSelected) return -1;
                    if (!aSelected && bSelected) return 1;
                    // Then A-Z
                    return a.clubName.localeCompare(b.clubName);
                  })
                  .map((club) => (
                  <div
                    key={club.id}
                    className={`flex items-center p-2 border rounded-lg transition-colors cursor-pointer ${
                      selectedClubIds.includes(club.id)
                        ? "bg-white border-gp-pastel"
                        : "bg-gray-50 border-gp-gray-light opacity-60"
                    }`}
                    onClick={() => handleToggleClub(club.id)}
                  >
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedClubIds.includes(club.id)}
                      onChange={() => handleToggleClub(club.id)}
                      className="w-4 h-4 text-gp-dark border-gp-gray-light rounded focus:ring-gp-pastel accent-gp-dark mr-2"
                    />

                    {/* Club Name on far left */}
                    <div className="flex-1 flex items-center gap-2">
                      <p className="font-bold text-gp-dark text-sm">
                        {club.clubName}
                      </p>
                      <p className="text-xs text-gp-gray">• {club.address}</p>
                      <p className="text-xs text-gp-gray">• {club.courtCount} canchas</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Error message for clubs */}
          {error?.includes("club") && (
            <p className="text-gp-red text-xs">{error}</p>
          )}
        </div>

        {error &&
          !error.includes("nombre") &&
          !error.includes("existe") &&
          !error.includes("club") && (
            <p className="text-gp-red text-sm">{error}</p>
          )}

        {/* Centered Footer Buttons */}
        <div className="flex justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Crear
          </Button>
        </div>
      </form>
    </Modal>
  );
}
