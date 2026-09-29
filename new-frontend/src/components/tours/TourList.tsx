'use client';

import { useState, useMemo } from 'react';
import { Tour } from '@/entities/Tour';
import { TourRow } from './TourRow';

interface TourListProps {
  tours: Tour[];
  onNavigate?: (tour: Tour) => void;
  onDelete?: (id: string) => void;
  isAdmin: boolean;
}

export function TourList({ tours, onNavigate, onDelete, isAdmin }: TourListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Client-side filter by name
  const filteredTours = useMemo(() => {
    if (!searchQuery.trim()) {
      return tours;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return tours.filter(tour => 
      tour.name.toLowerCase().includes(query)
    );
  }, [tours, searchQuery]);

  if (tours.length === 0) {
    return (
      <div className="text-center text-gp-gray py-12">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 mx-auto mb-4 opacity-50" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
          />
        </svg>
        <p className="text-lg mb-2">No tienes tours.</p>
        <p className="text-sm">Crea uno o únete a uno existente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar tours..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 border-2 border-gp-gray-light rounded-md focus:outline-none focus:border-gp-pastel"
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gp-gray" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <p className="text-sm text-gp-gray">
          {filteredTours.length} {filteredTours.length === 1 ? 'resultado' : 'resultados'}
        </p>
      )}

      {/* Tour List */}
      {filteredTours.length > 0 ? (
        <div className="bg-white rounded-lg border border-gp-gray-light overflow-hidden">
          {filteredTours.map((tour) => (
            <TourRow
              key={tour.id}
              tour={tour}
              onNavigate={onNavigate}
              onDelete={onDelete}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gp-gray py-8">
          <p>No se encontraron tours con &quot;{searchQuery}&quot;</p>
        </div>
      )}
    </div>
  );
}
