'use client';

import { useDeferredValue, useState, useMemo } from 'react';

interface Club {
  id: string;
  name: string;
}

interface ClubSelectionProps {
  clubs: Club[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  isLoading?: boolean;
}

export const ClubSelection = ({ clubs, selectedIds, onToggle, isLoading }: ClubSelectionProps) => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search); // Non-blocking UI update

  const filteredClubs = useMemo(() => {
    return clubs.filter(club => 
      club.name.toLowerCase().includes(deferredSearch.toLowerCase())
    );
  }, [deferredSearch, clubs]);

  const handleSelectAll = () => {
    filteredClubs.forEach(club => {
      if (!selectedIds.includes(club.id)) {
        onToggle(club.id);
      }
    });
  };

  const handleClear = () => {
    selectedIds.forEach(id => onToggle(id));
  };

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Buscar clubes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gp-gray-light rounded-md text-sm focus:outline-none focus:border-gp-pastel focus-visible:ring-2 focus-visible:ring-gp-pastel"
        aria-controls="clubs-list"
      />

      {/* Bulk Actions */}
      <div className="flex gap-2">
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
          onClick={handleClear}
          className="text-sm text-gp-pastel hover:text-gp-dark transition-colors"
        >
          Limpiar
        </button>
      </div>

      {/* Selection Summary */}
      {selectedIds.length > 0 && (
        <p className="text-sm text-gp-dark font-medium">
          {selectedIds.length} clubes seleccionados
        </p>
      )}

      {/* Clubs List */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gp-pastel/10 h-10 rounded" />
          ))}
        </div>
      ) : filteredClubs.length === 0 ? (
        <p className="text-sm text-gp-gray text-center py-4">No se encontraron clubes</p>
      ) : (
        <div id="clubs-list" className="space-y-2 max-h-48 overflow-y-auto border border-gp-gray-light rounded-md p-2">
          {filteredClubs.map((club) => (
            <label
              key={club.id}
              className="flex items-center gap-2 cursor-pointer hover:bg-gp-light/30 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(club.id)}
                onChange={() => onToggle(club.id)}
                className="w-4 h-4 text-gp-dark border-gp-gray-light rounded focus:ring-gp-pastel accent-gp-dark"
              />
              <span className="text-gp-dark">{club.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
