'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface TournamentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; tourId: string; masterScore: number; categories: string[] }) => Promise<{ success: boolean; error?: string }>;
  tourId: string;
  existingTournamentNames: string[];
}

const AVAILABLE_CATEGORIES = [
  'Primera Division',
  'Segunda Division',
  'Tercera Division',
  'Cuarta Division',
  'Quinta Division',
  'Sub-18',
  'Sub-16',
  'Sub-14',
  'Femenino',
  'Masculino',
  'Mixto',
];

export function TournamentForm({ isOpen, onClose, onSubmit, tourId, existingTournamentNames }: TournamentFormProps) {
  const [name, setName] = useState('');
  const [masterScore, setMasterScore] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setMasterScore(0);
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

    setIsSubmitting(true);

    try {
      const result = await onSubmit({
        name: name.trim(),
        tourId,
        masterScore,
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

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
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
              Master Score (Opcional)
            </label>
            <input
              type="number"
              min="0"
              value={masterScore}
              onChange={(e) => setMasterScore(parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gp-gray-light rounded-md text-sm focus:outline-none focus:border-gp-pastel"
              disabled={isSubmitting}
            />
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
                <div className="space-y-2 max-h-48 overflow-y-auto border border-gp-gray-light rounded-md p-2">
                  {filteredCategories.length === 0 ? (
                    <p className="text-sm text-gp-gray text-center py-2">
                      No se encontraron categorías
                    </p>
                  ) : (
                    filteredCategories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 cursor-pointer hover:bg-gp-light/30 p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="w-4 h-4 text-gp-pastel border-gp-gray-light rounded focus:ring-gp-pastel"
                          disabled={isSubmitting}
                        />
                        <span className="text-gp-dark">{category}</span>
                      </label>
                    ))
                  )}
                </div>
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
