'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';

export interface ClubEntry {
  id: string;
  name: string;
  address: string;
  courtCount: number;
  availabilityStart: string;
  availabilityEnd: string;
}

interface ClubFormCardProps {
  onAdd: (club: ClubEntry) => void;
  onCreateClub?: (club: Omit<ClubEntry, 'id'>) => Promise<{ success: boolean; error?: string }>;
}

export const ClubFormCard = ({ onAdd, onCreateClub }: ClubFormCardProps) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [courtCount, setCourtCount] = useState<number>(1);
  const [availabilityStart, setAvailabilityStart] = useState('');
  const [availabilityEnd, setAvailabilityEnd] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Individual field validation on blur
  const validateField = (field: string, value: string | number) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'name':
        if (!String(value).trim()) {
          newErrors.name = 'El nombre es requerido';
        } else {
          delete newErrors.name;
        }
        break;
      case 'address':
        if (!String(value).trim()) {
          newErrors.address = 'La dirección es requerida';
        } else {
          delete newErrors.address;
        }
        break;
      case 'courtCount':
        if (Number(value) < 1) {
          newErrors.courtCount = 'Debe tener al menos 1 cancha';
        } else {
          delete newErrors.courtCount;
        }
        break;
      case 'availabilityStart':
        if (!String(value)) {
          newErrors.availabilityStart = 'La fecha de inicio es requerida';
        } else {
          delete newErrors.availabilityStart;
        }
        break;
      case 'availabilityEnd':
        if (!String(value)) {
          newErrors.availabilityEnd = 'La fecha final es requerida';
        } else if (availabilityStart && new Date(String(value)) <= new Date(availabilityStart)) {
          newErrors.availabilityEnd = 'La fecha final debe ser posterior a la de inicio';
        } else {
          delete newErrors.availabilityEnd;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    if (courtCount < 1) {
      newErrors.courtCount = 'Debe tener al menos 1 cancha';
    }
    if (!availabilityStart) {
      newErrors.availabilityStart = 'La fecha de inicio es requerida';
    }
    if (!availabilityEnd) {
      newErrors.availabilityEnd = 'La fecha final es requerida';
    }
    if (availabilityStart && availabilityEnd && new Date(availabilityEnd) <= new Date(availabilityStart)) {
      newErrors.availabilityEnd = 'La fecha final debe ser posterior a la de inicio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const clubData = {
      name: name.trim(),
      address: address.trim(),
      courtCount,
      availabilityStart,
      availabilityEnd,
    };

    // If callback provided, save to API first
    if (onCreateClub) {
      const result = await onCreateClub(clubData);
      if (!result.success) {
        setErrors({ general: result.error || 'Error al crear el club' });
        return;
      }
    }

    // Add to local state (with ID from API or generated)
    onAdd({
      id: crypto.randomUUID(),
      ...clubData,
    });

    // Reset form
    setName('');
    setAddress('');
    setCourtCount(1);
    setAvailabilityStart('');
    setAvailabilityEnd('');
    setErrors({});
  };

  return (
    <div className="border-2 border-gp-dark rounded-xl p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Basics */}
        <div className="space-y-4">
          <Input
            label="Nombre del Club"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => validateField('name', e.target.value)}
            error={errors.name}
            placeholder="Club Name"
          />
          <Input
            label="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={(e) => validateField('address', e.target.value)}
            error={errors.address}
            placeholder="Club Address"
          />
          <Input
            label="Nº Canchas"
            type="number"
            min={1}
            value={courtCount}
            onChange={(e) => setCourtCount(parseInt(e.target.value) || 1)}
            onBlur={(e) => validateField('courtCount', parseInt(e.target.value) || 1)}
            error={errors.courtCount}
          />
        </div>

        {/* Right Column: Availability */}
        <div className="space-y-2">
          <label className="text-gp-dark font-bold flex items-center gap-1">
            Disponibilidad del Club para Torneo
          </label>
          <fieldset className="space-y-3">
            <legend className="sr-only">Fechas de disponibilidad</legend>
            <Input
              label="Inicio"
              type="datetime-local"
              value={availabilityStart}
              onChange={(e) => setAvailabilityStart(e.target.value)}
              onBlur={(e) => validateField('availabilityStart', e.target.value)}
              error={errors.availabilityStart}
            />
            <Input
              label="Final"
              type="datetime-local"
              value={availabilityEnd}
              onChange={(e) => setAvailabilityEnd(e.target.value)}
              onBlur={(e) => validateField('availabilityEnd', e.target.value)}
              error={errors.availabilityEnd}
            />
          </fieldset>
        </div>
      </div>

      {/* Inline Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-gp-pastel text-white px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
          aria-label="Añadir club"
        >
          Añadir Club
        </button>
      </div>
    </div>
  );
};
