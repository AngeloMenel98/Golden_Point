'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ErrorAnnouncer } from '@/components/ui/ErrorBoundary';

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
    if (normalizedCode.length !== 8) {
      setError('El código debe tener 8 caracteres');
      return;
    }

    // Validate alphanumeric
    if (!/^[A-Za-z0-9]+$/.test(normalizedCode)) {
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
    // Only allow alphanumeric characters and limit to 8
    const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 8).toUpperCase();
    setCode(value);
    
    // Clear error when user starts typing
    if (error) setError(null);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Unirse a Tour">
      <ErrorAnnouncer message={error} />
      
      <p className="text-gp-gray mb-4">
        Ingresa el código de 8 caracteres del tour al que deseas unirte.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="tour-code" className="block text-sm font-medium text-gp-gray">
            Código del Tour
          </label>
          <input
            id="tour-code"
            type="text"
            placeholder="ABC123XY"
            value={code}
            onChange={handleCodeChange}
            className={`input-field font-mono text-center text-lg tracking-widest ${
              error ? 'border-gp-red' : ''
            }`}
            disabled={isSubmitting}
            autoComplete="off"
            autoFocus
            maxLength={8}
          />
          {error && <p className="text-gp-red text-sm">{error}</p>}
          <p className="text-xs text-gp-gray text-center mt-1">
            {code.length}/8 caracteres
          </p>
        </div>

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
            disabled={isSubmitting || code.length !== 8}
          >
            Unirse
          </Button>
        </div>
      </form>
    </Modal>
  );
}
