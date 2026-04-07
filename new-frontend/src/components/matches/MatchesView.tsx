"use client";
import { useState, useTransition, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import MatchCard from "./MatchCard";
import MatchCardSkeleton from "./MatchCardSkeleton";
import EditMatchModal from "./EditMatchModal";
import type { Match } from "@/types/match";
import { useTournament } from "@/context/TournamentContext";
import { useUser } from "@/context/UserContext";

const CATEGORIES = ["Masculino-Septima", "Masculino-Sexta", "Femenino-Quinta"];
const GROUP_STAGES = ["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4"];

interface Props {
  initialMatches: Match[];
  initialCategory: string;
  initialGroupStage: string;
  tournamentName?: string;
  isAdmin?: boolean;
  tournamentId?: string;
}

export default function MatchesView({
  initialMatches,
  initialCategory,
  initialGroupStage,
  tournamentName,
  isAdmin = false,
  tournamentId,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { setCurrentTournament, currentTournament } = useTournament();
  const { user } = useUser();

  // Set tournament name for breadcrumb
  useEffect(() => {
    if (tournamentName && currentTournament?.title !== tournamentName) {
      // Only update if title is different to avoid infinite loops
      const newTournament = {
        ...currentTournament,
        id: currentTournament?.id || "",
        title: tournamentName,
      } as any;
      setCurrentTournament(newTournament);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tournamentName]);

  const [editingMatch, setEditingMatch] = useState<Match | null>(null);

  function handleFilterChange(key: "category" | "groupStage", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* ── Filters ── */}
      <div className="mb-8 flex flex-wrap gap-4 items-end">
        <FilterSelect
          label="Categoría"
          value={initialCategory}
          options={CATEGORIES}
          onChange={(v) => handleFilterChange("category", v)}
        />
        <FilterSelect
          label="Instancia"
          value={initialGroupStage}
          options={GROUP_STAGES}
          onChange={(v) => handleFilterChange("groupStage", v)}
        />
      </div>

      {/* ── Match list ── */}
      <div className="flex flex-col gap-3 max-w-3xl mx-auto">
        {isPending ? (
          Array.from({ length: 3 }).map((_, i) => <MatchCardSkeleton key={i} />)
        ) : initialMatches.length === 0 ? (
          <EmptyState />
        ) : (
          initialMatches.map((m) => (
            <MatchCard 
              key={m.id} 
              match={m} 
              onEdit={isAdmin ? () => setEditingMatch(m) : undefined} 
            />
          ))
        )}
      </div>

      {/* ── Edit modal ── */}
      {editingMatch && (
        <EditMatchModal
          match={editingMatch}
          userId={user?.id?.toString() || ""}
          teamsId={
            editingMatch.teams
              ? [editingMatch.teams[0].teamId, editingMatch.teams[1].teamId]
              : ["", ""]
          }
          tournamentId={tournamentId || currentTournament?.id}
          onClose={() => setEditingMatch(null)}
          onSaved={() => {
            setEditingMatch(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium
                   text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                   appearance-none pr-8 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 text-gray-400 text-sm">
      No hay partidos para esta categoría y grupo.
    </div>
  );
}
