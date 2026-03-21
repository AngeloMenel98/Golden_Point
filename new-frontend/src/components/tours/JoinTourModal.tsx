'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

interface JoinTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => Promise<{ success: boolean; error?: string }>;
}

export function JoinTourModal({ isOpen, onClose, onSubmit }: JoinTourModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCode('');
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Normalize code to uppercase
    const normalizedCode = code.trim().toUpperCase();

    // Validate code length
    if (normalizedCode.length !== 6) {
      setError('El código debe tener 6 caracteres');
      return;
    }

    // Validate alphanumeric
    if (!/^[A-Z0-9]+$/.test(normalizedCode)) {
      setError('Código de tour inválido');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(normalizedCode);
      
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Error al unirse al tour');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphanumeric characters and limit to 6
    const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase();
    setCode(value);
    
    // Clear error when user starts typing
    if (error) setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gp-dark">Unirse a Tour</h2>
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

        <p className="text-gp-gray mb-4">
          Ingresa el código de 6 caracteres del tour al que deseas unirte.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="tour-code" className="block text-sm font-medium text-gp-gray">
              Código del Tour
            </label>
            <input
              id="tour-code"
              type="text"
              placeholder="ABC123"
              value={code}
              onChange={handleCodeChange}
              className={`w-full p-3 border-2 rounded-md font-mono text-center text-lg tracking-widest focus:outline-none ${
                error 
                  ? 'border-gp-red focus:border-gp-red' 
                  : 'border-gp-gray-light focus:border-gp-pastel'
              }`}
              disabled={isSubmitting}
              autoComplete="off"
              autoFocus
              maxLength={6}
            />
            {error && (
              <p className="text-gp-red text-sm">{error}</p>
            )}
            <p className="text-xs text-gp-gray text-center mt-1">
              {code.length}/6 caracteres
            </p>
          </div>

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
              disabled={isSubmitting || code.length !== 6}
              className="flex-1"
            >
              Unirse
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
