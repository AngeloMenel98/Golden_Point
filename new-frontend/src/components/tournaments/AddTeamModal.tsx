'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { useTournament } from '@/context/TournamentContext';

interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

interface CategoryOption {
  value: string;
  label: string;
}

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentId: string;
  categories: Array<{ category: string; gender: string }>;
}

export function AddTeamModal({ isOpen, onClose, tournamentId, categories }: AddTeamModalProps) {
  const { addTeam, fetchTeams, isLoading } = useTournament();
  
  const [teamName, setTeamName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract unique categories from tournament
  const categoryOptions: CategoryOption[] = categories.map(cat => ({
    value: `${cat.gender}-${cat.category}`,
    label: `${cat.gender} - ${cat.category}`
  }));

  // Fetch users when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoadingUsers(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      fetch(`${apiUrl}/api/users/users/${tournamentId}`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          const usersList = data.data?.users || data.users || [];
          setUsers(usersList);
        })
        .catch(() => {
          setUsers([]);
        })
        .finally(() => {
          setIsLoadingUsers(false);
        });
    }
  }, [isOpen, tournamentId]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTeamName('');
      setSelectedCategory('');
      setSelectedPlayers([]);
      setUserSearch('');
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Auto-generate team name from selected players
  useEffect(() => {
    if (selectedPlayers.length > 0) {
      const selectedUsers = users.filter(u => selectedPlayers.includes(u.id));
      if (selectedUsers.length > 0) {
        const names = selectedUsers.map(u => u.lastName || u.username).join(' - ');
        setTeamName(names);
      }
    }
  }, [selectedPlayers, users]);

  const filteredUsers = users.filter(user => {
    const searchLower = userSearch.toLowerCase();
    const fullName = `${user.firstName || ''} ${user.lastName || ''} ${user.username}`.toLowerCase();
    return fullName.includes(searchLower);
  });

  const togglePlayer = (userId: string) => {
    setSelectedPlayers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
    if (error?.includes('jugador')) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate team name
    if (!teamName.trim()) {
      setError('El nombre del equipo es requerido');
      return;
    }

    // Validate category
    if (!selectedCategory) {
      setError('Selecciona una categoría');
      return;
    }

    // Validate players (minimum 2)
    if (selectedPlayers.length < 2) {
      setError('Selecciona al menos 2 jugadores');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addTeam({
        tournamentId,
        teamName: teamName.trim(),
        category: selectedCategory,
        playerIds: selectedPlayers,
      });

      if (result.success) {
        await fetchTeams(tournamentId);
        onClose();
      } else {
        setError(result.error || 'Error al crear el equipo');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gp-dark">Agregar Equipo</h2>
          <button
            onClick={onClose}
            className="text-gp-gray hover:text-gp-dark transition-colors"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Name */}
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-gp-gray mb-1">
              Nombre del Equipo
            </label>
            <input
              id="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Nombre del equipo"
              className="w-full p-3 border border-gp-gray-light rounded-md focus:outline-none focus:border-gp-pastel"
              disabled={isSubmitting}
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gp-gray mb-1">
              Categoría
            </label>
            {categoryOptions.length === 0 ? (
              <p className="text-sm text-gp-gray">No hay categorías disponibles</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      if (error?.includes('categoría')) setError(null);
                    }}
                    className={`p-3 rounded-md border text-sm font-medium transition-colors ${
                      selectedCategory === cat.value
                        ? 'border-gp-pastel bg-gp-pastel/20 text-gp-dark'
                        : 'border-gp-gray-light text-gp-gray hover:border-gp-pastel'
                    }`}
                    disabled={isSubmitting}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
            {error?.includes('categoría') && (
              <p className="text-gp-red text-xs mt-1">{error}</p>
            )}
          </div>

          {/* Player Selection */}
          <div>
            <label className="block text-sm font-medium text-gp-gray mb-1">
              Jugadores (mínimo 2)
            </label>
            {isLoadingUsers ? (
              <p className="text-sm text-gp-gray">Cargando jugadores...</p>
            ) : users.length === 0 ? (
              <p className="text-sm text-gp-gray">No hay jugadores disponibles</p>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Buscar jugadores..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full p-2 border border-gp-gray-light rounded-md text-sm focus:outline-none focus:border-gp-pastel mb-2"
                  disabled={isSubmitting}
                />
                <div className="space-y-1 max-h-40 overflow-y-auto border border-gp-gray-light rounded-md p-2">
                  {filteredUsers.length === 0 ? (
                    <p className="text-sm text-gp-gray text-center py-2">
                      No se encontraron jugadores
                    </p>
                  ) : (
                    filteredUsers.map((user) => (
                      <label
                        key={user.id}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gp-light/30 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPlayers.includes(user.id)}
                          onChange={() => togglePlayer(user.id)}
                          className="w-4 h-4 text-gp-pastel border-gp-gray-light rounded focus:ring-gp-pastel"
                          disabled={isSubmitting}
                        />
                        <span className="text-gp-dark text-sm">
                          {user.firstName} {user.lastName} (@{user.username})
                        </span>
                      </label>
                    ))
                  )}
                </div>
                <p className="text-xs text-gp-gray mt-1">
                  {selectedPlayers.length} jugador(es) seleccionado(s)
                </p>
              </>
            )}
            {error?.includes('jugador') && (
              <p className="text-gp-red text-xs mt-1">{error}</p>
            )}
          </div>

          {/* Error Message */}
          {error && !error.includes('categoría') && !error.includes('jugador') && (
            <p className="text-gp-red text-sm">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting || isLoading}
              className="flex-1"
            >
              Agregar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
