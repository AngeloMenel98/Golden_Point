'use client';
import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import MatchCard from './MatchCard';
import MatchCardSkeleton from './MatchCardSkeleton';
import EditMatchModal from './EditMatchModal';
import type { Match } from '@/types/match';

const CATEGORIES  = ['Masculino-Septima', 'Masculino-Sexta', 'Femenino-Quinta'];
const GROUP_STAGES = ['Grupo 1', 'Grupo 2', 'Grupo 3'];

interface Props {
  initialMatches: Match[];
  initialCategory: string;
  initialGroupStage: string;
}

export default function MatchesView({
  initialMatches, initialCategory, initialGroupStage,
}: Props) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [editingMatch, setEditingMatch] = useState<Match | null>(null);

  function handleFilterChange(key: 'category' | 'groupStage', value: string) {
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
          onChange={(v) => handleFilterChange('category', v)}
        />
        <FilterSelect
          label="Instancia"
          value={initialGroupStage}
          options={GROUP_STAGES}
          onChange={(v) => handleFilterChange('groupStage', v)}
        />
      </div>

      {/* ── Match list ── */}
      <div className="flex flex-col gap-3 max-w-3xl mx-auto">
        {isPending
          ? Array.from({ length: 3 }).map((_, i) => <MatchCardSkeleton key={i} />)
          : initialMatches.length === 0
            ? <EmptyState />
            : initialMatches.map((m) => (
                <MatchCard key={m.id} match={m} onEdit={() => setEditingMatch(m)} />
              ))
        }
      </div>

      {/* ── Edit modal ── */}
      {editingMatch && (
        <EditMatchModal
          match={editingMatch}
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

function FilterSelect({ label, value, options, onChange }: {
  label: string; value: string; options: string[];
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
        {options.map((o) => <option key={o}>{o}</option>)}
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
