import { useTour } from '@/context/TourContext';

/**
 * Hook for creating a new tour.
 * Returns the createTour function and loading state.
 */
export function useCreateTour() {
  const { createTour, isLoading, error } = useTour();
  
  return {
    createTour,
    isLoading,
    error,
  };
}

/**
 * Hook for joining a tour by code.
 * Returns the joinTour function and loading state.
 */
export function useJoinTour() {
  const { joinTour, isLoading, error } = useTour();
  
  return {
    joinTour,
    isLoading,
    error,
  };
}

/**
 * Hook for deleting a tour.
 * Returns the deleteTour function and loading state.
 */
export function useDeleteTour() {
  const { deleteTour, isLoading, error } = useTour();
  
  return {
    deleteTour,
    isLoading,
    error,
  };
}

/**
 * Hook for refreshing tours list.
 * Returns the refreshTours function and loading state.
 */
export function useRefreshTours() {
  const { refreshTours, isLoading, error } = useTour();
  
  return {
    refreshTours,
    isLoading,
    error,
  };
}

/**
 * Main useTours hook - provides all tour-related functionality.
 */
export function useTours() {
  const { 
    tours, 
    currentTour, 
    setCurrentTour, 
    isLoading, 
    error, 
    createTour, 
    joinTour, 
    deleteTour, 
    refreshTours 
  } = useTour();
  
  return {
    tours,
    currentTour,
    setCurrentTour,
    isLoading,
    error,
    createTour,
    joinTour,
    deleteTour,
    refreshTours,
  };
}
