import Link from "next/link";
import { Pencil, MapPin, Calendar, Trophy } from "lucide-react";
import { parseTeams, parseSets, formatMatchDate } from "@/types/match";
import type { Match } from "@/types/match";

const MAX_SETS = 3;

interface InfoRowProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  href?: string;
}

function InfoRow({ icon, text, onClick, href }: InfoRowProps) {
  const content = (
    <>
      <span className="text-gray-400">{icon}</span>
      <span className="truncate hover:text-blue-600 hover:underline transition-colors">
        {text}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center gap-1.5 cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-1.5 cursor-pointer"
      >
        {content}
      </button>
    );
  }

  return <div className="flex items-center gap-1.5">{content}</div>;
}

export default function MatchCard({
  match,
  onEdit,
  onEditDate,
}: {
  match: Match;
  onEdit?: () => void;
  onEditDate?: () => void;
}) {
  const sortedTeams = match.teams.sort((a, b) => a.position - b.position);

  const team1Players = sortedTeams
    ? sortedTeams[0].players.map((p) => `${p.firstName} ${p.lastName}`)
    : parseTeams(match.teamsName)[0];

  const team2Players = sortedTeams
    ? sortedTeams[1].players.map((p) => `${p.firstName} ${p.lastName}`)
    : parseTeams(match.teamsName)[1];

  // ── Sets: gamesTeam1 always maps to the position-1 team (top row)
  const useNewSetsFormat = match.sets && match.sets.length > 0;
  const sets = useNewSetsFormat
    ? [...match.sets!]
        .sort((a, b) => a.setNumber - b.setNumber)
        .map((s) => ({ t1: s.gamesTeam1, t2: s.gamesTeam2 }))
    : parseSets(match.games);

  const hasResult = sets.length > 0;

  // ── Winner: derive from isWinner on the position-sorted teams
  const team1IsWinner = sortedTeams
    ? sortedTeams[0].isWinner
    : hasResult && getMatchWinner(sets) === 0;
  const team2IsWinner = sortedTeams
    ? sortedTeams[1].isWinner
    : hasResult && getMatchWinner(sets) === 1;

  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div
        className={`h-1 w-full ${hasResult ? "bg-emerald-400" : "bg-gray-200"}`}
      />

      <div className="flex items-stretch gap-0 px-5 py-4">
        <div className="flex-1 flex flex-col justify-center gap-3 min-w-0">
          <TeamRow
            players={team1Players}
            sets={sets}
            teamIndex={0}
            isWinner={team1IsWinner}
          />
          <div className="h-px bg-gray-100 w-full" />
          <TeamRow
            players={team2Players}
            sets={sets}
            teamIndex={1}
            isWinner={team2IsWinner}
          />
        </div>

        <div className="w-px bg-gray-100 mx-5 self-stretch" />

        <div className="flex flex-col justify-center gap-1.5 text-xs text-gray-500 shrink-0 w-44">
          <InfoRow
            icon={<Calendar size={12} />}
            text={formatMatchDate(match.matchDate)}
            onClick={onEditDate}
          />
          <InfoRow
            icon={<MapPin size={12} />}
            text={match.clubName}
            href={`/clubs/${match.clubId}`}
          />
          <InfoRow
            icon={<Trophy size={12} />}
            text={`Cancha ${match.courtNumber}`}
          />
          {!hasResult && (
            <span className="mt-1 inline-flex items-center gap-1 text-amber-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Pendiente
            </span>
          )}
        </div>
      </div>

      {onEdit && (
        <button
          onClick={onEdit}
          aria-label="Editar partido"
          className="absolute top-3 right-3 p-1.5 rounded-lg border border-gray-200
                     text-gray-400 hover:text-blue-600 hover:border-blue-300
                     hover:bg-blue-50 transition-colors duration-150"
        >
          <Pencil size={14} />
        </button>
      )}
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

function getMatchWinner(sets: { t1: number; t2: number }[]): 0 | 1 | null {
  if (!sets.length) return null;
  const t1wins = sets.filter((s) => s.t1 > s.t2).length;
  const t2wins = sets.filter((s) => s.t2 > s.t1).length;
  if (t1wins > t2wins) return 0;
  if (t2wins > t1wins) return 1;
  return null;
}

function TeamRow({
  players,
  sets,
  teamIndex,
  isWinner,
}: {
  players: string[];
  sets: { t1: number; t2: number }[];
  teamIndex: 0 | 1;
  isWinner: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 min-w-0">
        {players.map((p, i) => (
          <p
            key={i}
            className={`text-sm font-medium truncate leading-snug ${
              isWinner ? "text-emerald-600 font-semibold" : "text-gray-800"
            }`}
          >
            {p.trim()}
          </p>
        ))}
      </div>
      <div className="flex gap-2 shrink-0">
        {Array.from({ length: MAX_SETS }).map((_, si) => {
          const score = sets[si];
          const val = score ? (teamIndex === 0 ? score.t1 : score.t2) : null;
          const won = score
            ? teamIndex === 0
              ? score.t1 > score.t2
              : score.t2 > score.t1
            : false;
          return (
            <span
              key={si}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm font-semibold ${
                val === null
                  ? "text-gray-300 bg-gray-50"
                  : won
                    ? "text-emerald-700 bg-emerald-50"
                    : "text-gray-500 bg-gray-50"
              }`}
            >
              {val === null ? "—" : val}
            </span>
          );
        })}
      </div>
    </div>
  );
}


