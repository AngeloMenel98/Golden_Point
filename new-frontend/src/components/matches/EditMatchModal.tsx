"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { parseTeams, parseSets } from "@/types/match";
import type { Match } from "@/types/match";

const MAX_SETS = 3;

interface EditMatchModalProps {
  match: Match;
  userId: string;
  teamsId: [string, string];
  onClose: () => void;
  onSaved: () => void;
  tournamentId?: string;
}

export default function EditMatchModal({
  match,
  userId,
  teamsId,
  onClose,
  onSaved,
  tournamentId,
}: EditMatchModalProps) {
  // Use new teams format if available, otherwise fall back to legacy
  const useNewTeamsFormat = match.teams && match.teams.length > 0;

  // Derive team labels by joining players with " / "
  const team1Label = useNewTeamsFormat
    ? match
        .teams![0].players.map((p) => `${p.firstName} ${p.lastName}`)
        .join(" / ")
    : parseTeams(match.teamsName)[0].join(" / ");

  const team2Label = useNewTeamsFormat
    ? match
        .teams![1].players.map((p) => `${p.firstName} ${p.lastName}`)
        .join(" / ")
    : parseTeams(match.teamsName)[1].join(" / ");

  // Use new sets format if available, otherwise fall back to legacy
  const useNewSetsFormat = match.sets && match.sets.length > 0;
  const existing = useNewSetsFormat
    ? match.sets!.map((s) => ({ t1: s.gamesTeam1, t2: s.gamesTeam2 }))
    : parseSets(match.games);

  const initSets = Array.from({ length: MAX_SETS }, (_, i) => ({
    t1: existing[i]?.t1?.toString() ?? "",
    t2: existing[i]?.t2?.toString() ?? "",
  }));

  const [sets, setSets] = useState(initSets);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateSet(si: number, team: "t1" | "t2", val: string) {
    setSets((prev) =>
      prev.map((s, i) => (i === si ? { ...s, [team]: val } : s)),
    );
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      // Build new sets format - only filled sets
      const filledSets = sets.filter((s) => s.t1 !== "" && s.t2 !== "");

      if (filledSets.length === 0) {
        throw new Error("Ingresa al menos un resultado");
      }

      const setsTeam1 = filledSets.map((s) => parseInt(s.t1, 10));
      const setsTeam2 = filledSets.map((s) => parseInt(s.t2, 10));

      const payload = {
        userId,
        setsTeam1,
        setsTeam2,
        teamsId,
        matchId: match.id,
        tournamentId: tournamentId || "",
      };

      const res = await fetch("/api/set/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData?.error?.message ||
            errorData?.error?.type ||
            "Error al guardar",
        );
      }
      onSaved();
    } catch (e: any) {
      console.error("Save error:", e);
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
          Editar resultado
        </h2>
        <p className="text-xs text-gray-500 mb-5">
          {team1Label} <span className="text-gray-300">vs</span> {team2Label}
        </p>

        {/* Set inputs */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Header */}
          <div className="grid grid-cols-[3rem_1fr_1fr] gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
            <span />
            <span className="text-center truncate">{team1Label}</span>
            <span className="text-center truncate">{team2Label}</span>
          </div>
          {sets.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-[3rem_1fr_1fr] gap-2 items-center"
            >
              <span className="text-xs text-gray-400 font-medium pl-1">
                Set {i + 1}
              </span>
              <ScoreInput
                value={s.t1}
                onChange={(v) => updateSet(i, "t1", v)}
              />
              <ScoreInput
                value={s.t2}
                onChange={(v) => updateSet(i, "t2", v)}
              />
            </div>
          ))}
        </div>

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold
                     hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {saving ? "Guardando…" : "Guardar resultado"}
        </button>
      </div>
    </div>
  );
}

function ScoreInput({
  value,
  onChange,
}: {
  value: string | number;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="number"
      min={0}
      max={7}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-center rounded-lg border border-gray-200 py-2 text-sm
                 font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
