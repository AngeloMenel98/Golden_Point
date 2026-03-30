"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";

export interface ClubEntry {
  id: string;
  clubName: string;
  address: string;
  courtCount: number;
  availabilityStart: string;
  availabilityEnd: string;
}

interface ClubFormCardProps {
  onAdd: (club: ClubEntry) => void;
  onCreateClub?: (
    club: Omit<ClubEntry, "id">,
  ) => Promise<{ success: boolean; error?: string }>;
  availableClubs?: ClubEntry[];
  onDuplicateFound?: (clubId: string) => void;
}

export const ClubFormCard = ({ onAdd, onCreateClub, availableClubs, onDuplicateFound }: ClubFormCardProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [courtCount, setCourtCount] = useState<number>(1);
  const [availabilityStart, setAvailabilityStart] = useState("");
  const [availabilityEnd, setAvailabilityEnd] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Individual field validation on blur
  const validateField = (field: string, value: string | number) => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!String(value).trim()) {
          newErrors.name = "El nombre es requerido";
        } else {
          delete newErrors.name;
        }
        break;
      case "address":
        if (!String(value).trim()) {
          newErrors.address = "La dirección es requerida";
        } else {
          delete newErrors.address;
        }
        break;
      case "courtCount":
        if (Number(value) < 1) {
          newErrors.courtCount = "Debe tener al menos 1 cancha";
        } else {
          delete newErrors.courtCount;
        }
        break;
      case "availabilityStart":
        if (!String(value)) {
          newErrors.availabilityStart = "La fecha de inicio es requerida";
        } else {
          delete newErrors.availabilityStart;
        }
        break;
      case "availabilityEnd":
        if (!String(value)) {
          newErrors.availabilityEnd = "La fecha final es requerida";
        } else if (
          availabilityStart &&
          new Date(String(value)) <= new Date(availabilityStart)
        ) {
          newErrors.availabilityEnd =
            "La fecha final debe ser posterior a la de inicio";
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
      newErrors.name = "El nombre es requerido";
    }
    if (!address.trim()) {
      newErrors.address = "La dirección es requerida";
    }
    if (courtCount < 1) {
      newErrors.courtCount = "Debe tener al menos 1 cancha";
    }
    if (!availabilityStart) {
      newErrors.availabilityStart = "La fecha de inicio es requerida";
    }
    if (!availabilityEnd) {
      newErrors.availabilityEnd = "La fecha final es requerida";
    }
    if (
      availabilityStart &&
      availabilityEnd &&
      new Date(availabilityEnd) <= new Date(availabilityStart)
    ) {
      newErrors.availabilityEnd =
        "La fecha final debe ser posterior a la de inicio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle name change with duplicate check
  const handleNameChange = (value: string) => {
    setName(value);
    // Check for duplicates in available clubs
    const duplicateClub = availableClubs?.find(
      (c) => c.clubName.toLowerCase() === value.toLowerCase()
    );
    if (duplicateClub) {
      setErrors((prev) => ({ ...prev, name: "Este club ya existe" }));
      // Auto-select the existing club in the list
      onDuplicateFound?.(duplicateClub.id);
    } else {
      setErrors((prev) => {
        const { name: _name, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const clubData = {
      clubName: name.trim(),
      address: address.trim(),
      courtCount,
      availabilityStart,
      availabilityEnd,
    };

    // If callback provided, save to API first
    let newClubId: string | undefined;
    if (onCreateClub) {
      const result = await onCreateClub(clubData);
      if (!result.success) {
        setErrors({ general: result.error || "Error al crear el club" });
        return;
      }
      // Use the real ID from API if available
      newClubId = result.newClubId;
    }

    // Add to local state (with ID from API or generated)
    onAdd({
      id: newClubId || crypto.randomUUID(),
      ...clubData,
    });

    // Reset form
    setName("");
    setAddress("");
    setCourtCount(1);
    setAvailabilityStart("");
    setAvailabilityEnd("");
    setErrors({});
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Row 1: Nombre and Dirección */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Nombre del Club */}
        <div>
          <label className="block text-sm font-medium text-gp-gray mb-1">
            Nombre del club
          </label>
          <Input
            label=""
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={(e) => validateField("name", e.target.value)}
            error={errors.name}
            placeholder="Nombre del club"
            className="h-9"
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gp-gray mb-1">
            Dirección del club
          </label>
          <Input
            label=""
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={(e) => validateField("address", e.target.value)}
            error={errors.address}
            placeholder="Dirección del club"
            className="h-9"
          />
        </div>
      </div>

      {/* Row 2: Canchas, dates inline with + button */}
      <div className="flex flex-wrap gap-2 items-end">
        {/* Nº Canchas */}
        <div className="min-w-[80px]">
          <label className="block text-sm font-medium text-gp-gray mb-1">
            Canchas
          </label>
          <Input
            label=""
            type="number"
            min={1}
            value={courtCount}
            onChange={(e) => setCourtCount(parseInt(e.target.value) || 1)}
            onBlur={(e) =>
              validateField("courtCount", parseInt(e.target.value) || 1)
            }
            error={errors.courtCount}
            className="h-9"
          />
        </div>

        {/* Inicio */}
        <div className="min-w-[140px]">
          <label className="block text-sm font-medium text-gp-gray mb-1">
            Desde
          </label>
          <Input
            label=""
            type="datetime-local"
            value={availabilityStart}
            onChange={(e) => setAvailabilityStart(e.target.value)}
            onBlur={(e) => validateField("availabilityStart", e.target.value)}
            error={errors.availabilityStart}
            className="h-9"
          />
        </div>

        {/* Hasta */}
        <div className="min-w-[140px]">
          <label className="block text-sm font-medium text-gp-gray mb-1">
            Hasta
          </label>
          <Input
            label=""
            type="datetime-local"
            value={availabilityEnd}
            onChange={(e) => setAvailabilityEnd(e.target.value)}
            onBlur={(e) => validateField("availabilityEnd", e.target.value)}
            error={errors.availabilityEnd}
            className="h-9"
          />
        </div>

        {/* Circular green (+) icon button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-9 h-9 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 hover:scale-105 transition-all shadow-lg"
          aria-label="Añadir club"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
