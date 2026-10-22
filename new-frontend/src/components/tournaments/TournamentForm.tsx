'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface TournamentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    tourId: string;
    master: number;
    categories: { gender: string; category: string }[];
  }) => Promise<{ success: boolean; error?: string }>;
  tourId: string;
  existingTournamentNames: string[];
}

const GENDERS = ['Masculino', 'Femenino'];

// Mirrors old-frontend pool (TournamentModal maleCat/femaleCat)
const AVAILABLE_CATEGORIES = [
  'Cuarta',
  'Quinta',
  'Sexta',
  'Septima',
  'Octava',
  'Suma 7',
];

interface SelectedCategory {
  gender: string;
  category: string;
}

export function TournamentForm({ isOpen, onClose, onSubmit, tourId, existingTournamentNames }: TournamentFormProps) {
  const [name, setName] = useState('');
  const [master, setMaster] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setMaster(0);
      setSelectedCategories([]);
      setError(null);
      setIsSubmitting(false);
      setCategorySearch('');
    }
  }, [isOpen]);

  // Filter categories by search query
  const filteredCategories = AVAILABLE_CATEGORIES.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const isSelected = (gender: string, category: string) =>
    selectedCategories.some((c) => c.gender === gender && c.category === category);

  const toggleCategory = (gender: string, category: string) => {
    setSelectedCategories((prev) => {
      const exists = prev.some(
        (c) => c.gender === gender && c.category === category,
      );
      return exists
        ? prev.filter((c) => !(c.gender === gender && c.category === category))
        : [...prev, { gender, category }];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate name
    if (!name.trim()) {
      setError('El nombre del torneo es requerido');
      return;
    }

    // Check for duplicates
    if (existingTournamentNames.includes(name.trim().toLowerCase())) {
      setError('Este nombre ya existe');
      return;
    }

    // Master is required (min 1)
    if (!master || master < 1) {
      setError('El master debe ser al menos 1');
      return;
    }

    // At least one category must be selected
    if (selectedCategories.length === 0) {
      setError('Selecciona al menos una categoría');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit({
        name: name.trim(),
        tourId,
        master,
        categories: selectedCategories,
      });

      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Error al crear el torneo');
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
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gp-dark">Crear Torneo</h2>
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
            label="Nombre del Torneo"
            placeholder="Copa Verano 2024"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error?.includes('nombre') || error?.includes('existe') ? error : undefined}
            disabled={isSubmitting}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gp-gray">
              Master
            </label>
            <input
              type="number"
              min="1"
              value={master}
              onChange={(e) => setMaster(parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gp-gray-light rounded-md text-sm focus:outline-none focus:border-gp-pastel"
              disabled={isSubmitting}
              required
            />
            {master < 1 && (
              <p className="text-gp-red text-xs">El master debe ser al menos 1</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gp-gray">
              Categorías
            </label>
            {AVAILABLE_CATEGORIES.length === 0 ? (
              <p className="text-sm text-gp-gray">No hay categorías disponibles</p>
            ) : (
              <>
                {/* Category Search */}
                <input
                  type="text"
                  placeholder="Buscar categorías..."
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full p-2 border border-gp-gray-light rounded-md text-sm focus:outline-none focus:border-gp-pastel"
                />
                <div className="space-y-3 max-h-64 overflow-y-auto border border-gp-gray-light rounded-md p-3">
                  {filteredCategories.length === 0 ? (
                    <p className="text-sm text-gp-gray text-center py-2">
                      No se encontraron categorías
                    </p>
                  ) : (
                    GENDERS.map((gender) => (
                      <div key={gender} className="space-y-1">
                        <p className="text-xs font-semibold text-gp-gray uppercase">
                          {gender}
                        </p>
                        {filteredCategories.map((category) => (
                          <label
                            key={`${gender}-${category}`}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gp-light/30 p-2 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={isSelected(gender, category)}
                              onChange={() => toggleCategory(gender, category)}
                              className="w-4 h-4 text-gp-pastel border-gp-gray-light rounded focus:ring-gp-pastel"
                              disabled={isSubmitting}
                            />
                            <span className="text-gp-dark">{category}</span>
                          </label>
                        ))}
                      </div>
                    ))
                  )}
                </div>
                {selectedCategories.length === 0 && (
                  <p className="text-gp-red text-xs">
                    Selecciona al menos una categoría
                  </p>
                )}
              </>
            )}
          </div>

          {error && (
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
