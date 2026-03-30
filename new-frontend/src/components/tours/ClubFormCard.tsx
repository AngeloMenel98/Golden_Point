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
}

export const ClubFormCard = ({ onAdd, onCreateClub }: ClubFormCardProps) => {
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
    if (onCreateClub) {
      const result = await onCreateClub(clubData);
      if (!result.success) {
        setErrors({ general: result.error || "Error al crear el club" });
        return;
      }
    }

    // Add to local state (with ID from API or generated)
    onAdd({
      id: crypto.randomUUID(),
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
    <div className="flex flex-wrap gap-x-4 gap-y-2 items-start">
      {/* Nombre del Club */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gp-gray mb-1">
          Nombre
        </label>
        <Input
          label=""
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => validateField("name", e.target.value)}
          error={errors.name}
          placeholder="Club Name"
          style={{ height: "35px" }}
        />
      </div>

      {/* Dirección */}
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm font-medium text-gp-gray mb-1">
          Dirección
        </label>
        <Input
          label=""
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={(e) => validateField("address", e.target.value)}
          error={errors.address}
          placeholder="Club Address"
          style={{ height: "35px" }}
        />
      </div>

      {/* Nº Canchas */}
      <div className="flex-1 min-w-[80px]">
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
          style={{ height: "35px" }}
        />
      </div>

      {/* Disponibilidad */}
      <div className="flex-1 min-w-[280px]">
        <label className="block text-sm font-medium text-gp-gray mb-1">
          Disponibilidad
        </label>
        <div className="flex gap-2 items-start">
          <div className="flex-1 min-w-[130px]">
            <Input
              label=""
              type="datetime-local"
              value={availabilityStart}
              onChange={(e) => setAvailabilityStart(e.target.value)}
              onBlur={(e) => validateField("availabilityStart", e.target.value)}
              error={errors.availabilityStart}
              placeholder="Inicio"
              style={{ height: "35px" }}
            />
          </div>
          <div className="flex-1 min-w-[130px]">
            <Input
              label=""
              type="datetime-local"
              value={availabilityEnd}
              onChange={(e) => setAvailabilityEnd(e.target.value)}
              onBlur={(e) => validateField("availabilityEnd", e.target.value)}
              error={errors.availabilityEnd}
              placeholder="Final"
              style={{ height: "35px" }}
            />
          </div>
          {/* Circular green (+) icon button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[35px] h-[35px] mt-0 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 hover:scale-105 transition-all shadow-lg"
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
    </div>
  );
};
