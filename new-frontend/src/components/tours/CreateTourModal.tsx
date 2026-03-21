'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Club {
  id: string;
  name: string;
}

interface CreateTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, clubsId: string[]) => Promise<{ success: boolean; error?: string }>;
  existingTourNames: string[];
}

export function CreateTourModal({ isOpen, onClose, onSubmit, existingTourNames }: CreateTourModalProps) {
  const [name, setName] = useState('');
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clubs, setClubs] = useState<Club[]>([]);

  // Mock clubs for now - in production, fetch from API
  useEffect(() => {
    if (isOpen) {
      // Simulated club list - replace with actual API call
      setClubs([
        { id: '1', name: 'Club A' },
        { id: '2', name: 'Club B' },
        { id: '3', name: 'Club C' },
      ]);
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setSelectedClubs([]);
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate name
    if (!name.trim()) {
      setError('El nombre del tour es requerido');
      return;
    }

    // Check for duplicates
    if (existingTourNames.includes(name.trim().toLowerCase())) {
      setError('Este nombre ya existe');
      return;
    }

    // Validate clubs
    if (selectedClubs.length === 0) {
      setError('Selecciona al menos un club');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(name.trim(), selectedClubs);
      
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Error al crear el tour');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleClub = (clubId: string) => {
    setSelectedClubs(prev => 
      prev.includes(clubId)
        ? prev.filter(id => id !== clubId)
        : [...prev, clubId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gp-dark">Crear Tour</h2>
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
          <Input
            label="Nombre del Tour"
            placeholder="Mi Tour"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error?.includes('nombre') || error?.includes('existe') ? error : undefined}
            disabled={isSubmitting}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gp-gray">
              Clubes
            </label>
            {clubs.length === 0 ? (
              <p className="text-sm text-gp-gray">No hay clubes disponibles</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto border border-gp-gray-light rounded-md p-2">
                {clubs.map((club) => (
                  <label
                    key={club.id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gp-light/30 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedClubs.includes(club.id)}
                      onChange={() => toggleClub(club.id)}
                      className="w-4 h-4 text-gp-pastel border-gp-gray-light rounded focus:ring-gp-pastel"
                      disabled={isSubmitting}
                    />
                    <span className="text-gp-dark">{club.name}</span>
                  </label>
                ))}
              </div>
            )}
            {error?.includes('club') && (
              <p className="text-gp-red text-xs">{error}</p>
            )}
          </div>

          {error && !error.includes('nombre') && !error.includes('club') && (
            <p className="text-gp-red text-sm">{error}</p>
          )}

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
              disabled={isSubmitting}
              className="flex-1"
            >
              Crear
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
