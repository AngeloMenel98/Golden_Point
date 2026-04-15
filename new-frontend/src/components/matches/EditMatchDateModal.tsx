"use client";
import { useState } from "react";
import { X } from "lucide-react";
import type { Match } from "@/types/match";

interface EditMatchDateModalProps {
  match: Match;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditMatchDateModal({
  match,
  onClose,
  onSaved,
}: EditMatchDateModalProps) {
  // Parse match.matchDate to get initial date/time values
  // match.matchDate is ISO string like "2024-03-15T14:30:00.000Z"
  
  const initialDate = new Date(match.matchDate);
  const localDate = new Date(initialDate.getTime() - initialDate.getTimezoneOffset() * 60000);
  const initialDateValue = localDate.toISOString().slice(0, 16); // "2024-03-15T14:30"
  
  const [dateTimeValue, setDateTimeValue] = useState(initialDateValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/matches/${match.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          matchdate: new Date(dateTimeValue).toISOString(),
          clubId: match.clubId,
          courtNumber: match.courtNumber,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error?.message || "Error al guardar");
      }

      onSaved();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <h2 className="text-base font-semibold text-gray-800 mb-1">
          Editar fecha
        </h2>
        <p className="text-xs text-gray-500 mb-5">
          Selecciona la nueva fecha y hora del partido
        </p>

        <input
          type="datetime-local"
          value={dateTimeValue}
          onChange={(e) => setDateTimeValue(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800
                     focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold
                     hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {saving ? "Guardando…" : "Guardar fecha"}
        </button>
      </div>
    </div>
  );
}