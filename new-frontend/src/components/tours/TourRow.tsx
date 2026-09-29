'use client';

import { useRouter } from 'next/navigation';
import { Tour } from '@/entities/Tour';
import { CopyableCode } from './CopyableCode';
import { useTour } from '@/context/TourContext';

interface TourRowProps {
  tour: Tour;
  onNavigate?: (tour: Tour) => void;
  onDelete?: (id: string) => void;
  isAdmin: boolean;
}

export function TourRow({ tour, onNavigate, onDelete, isAdmin }: TourRowProps) {
  const router = useRouter();
  const { setCurrentTour } = useTour();

  const handleNameClick = () => {
    // Set current tour in context
    setCurrentTour(tour);
    
    // Call optional onNavigate callback
    if (onNavigate) {
      onNavigate(tour);
    }
    
    // Navigate to tournaments page (clean URL, tourId stored in cookie)
    document.cookie = `currentTourId=${tour.id}; path=/; max-age=86400`;
    router.push('/tournaments');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(tour.id);
    }
  };

  return (
    <div 
      className="flex items-center justify-between p-4 border-b border-gp-gray-light hover:bg-gp-light/30 transition-colors cursor-pointer group"
      onClick={handleNameClick}
    >
      <div className="flex-1 flex items-center gap-4">
        {/* Tour Name */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gp-dark truncate group-hover:text-gp-pastel transition-colors">
            {tour.name}
          </h3>
          <p className="text-sm text-gp-gray truncate">
            Propietario: {tour.userOwner || 'Desconocido'}
          </p>
        </div>

        {/* Tour Code */}
        <div className="flex-shrink-0">
          <CopyableCode code={tour.tourCode} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-8 text-sm ml-4">
        <div className="text-center">
          <p className="font-semibold text-gp-dark">{tour.userCount || 0}</p>
          <p className="text-gp-gray text-xs">Usuarios</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-gp-dark">{tour.tournamentCount || 0}</p>
          <p className="text-gp-gray text-xs">Torneos</p>
        </div>

        {/* Delete Button (Admin Only) */}
        {isAdmin && onDelete && (
          <button
            onClick={handleDelete}
            className="p-2 text-gp-red hover:bg-gp-red/10 rounded transition-colors"
            title="Eliminar tour"
            type="button"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
