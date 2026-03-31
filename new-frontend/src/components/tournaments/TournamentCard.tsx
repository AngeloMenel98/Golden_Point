"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Tournament,
  getStatusLabel,
  TournamentStatus,
} from "@/entities/Tournament";
import { useTournament } from "@/context/TournamentContext";
import { AddTeamModal } from "./AddTeamModal";
import { TeamsListModal } from "./TeamsListModal";
import Link from "next/link";

interface TournamentCardProps {
  tournament: Tournament;
  isAdmin: boolean;
  onDelete?: (id: string) => void;
  onStart?: (id: string) => void;
  onClick?: (tournament: Tournament) => void;
}

// Calculate teams needed for tournament
// In padel tournaments: 12 teams per category (typical)
function getTeamsNeeded(
  categoriesCount: number,
  currentTeams: number = 0,
): number {
  // 12 teams per category
  const targetTeams = categoriesCount * 12;
  return Math.max(0, targetTeams - currentTeams);
}

export function TournamentCard({
  tournament,
  isAdmin,
  onDelete,
  onStart,
  onClick,
}: TournamentCardProps) {
  const router = useRouter();
  const { setCurrentTournament } = useTournament();

  // Modal states
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isTeamsListModalOpen, setIsTeamsListModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    setCurrentTournament(tournament);
    if (onClick) {
      onClick(tournament);
    }
    router.push(`/tournaments/${tournament.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(tournament.id);
    }
    setIsMenuOpen(false);
  };

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStart) {
      onStart(tournament.id);
    }
    setIsMenuOpen(false);
  };

  const handleAddTeam = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddTeamModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleTeamsList = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsTeamsListModalOpen(true);
    setIsMenuOpen(false);
  };

  const getStatusBadgeClass = (status: TournamentStatus) => {
    switch (status) {
      case TournamentStatus.PENDING:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case TournamentStatus.IN_PROGRESS:
        return "bg-green-100 text-green-800 border-green-300";
      case TournamentStatus.FINISHED:
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const currentTeamsCount = tournament.teams?.length || 0;
  const categoriesCount = tournament.categories?.length || 0;
  const teamsNeeded = getTeamsNeeded(categoriesCount, currentTeamsCount);
  const isPending = tournament.status === TournamentStatus.PENDING;
  const canStart = isAdmin && isPending && teamsNeeded === 0;

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gp-gray-light hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gp-dark truncate flex-1">
            {tournament.name}
          </h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(tournament.status as TournamentStatus)}`}
          >
            {getStatusLabel(tournament.status)}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gp-gray mb-3">
          <div>
            <span className="font-medium">Master Score:</span>{" "}
            {tournament.masterScore}
          </div>
          <div>
            <span className="font-medium">Categorías:</span>{" "}
            {tournament.categories?.length || 0}
          </div>
          {teamsNeeded > 0 && isPending && (
            <div className="text-orange-600 font-medium">
              Faltan {teamsNeeded} equipos
            </div>
          )}
          {teamsNeeded === 0 && isPending && (
            <div className="text-green-600 font-medium">Listo para iniciar</div>
          )}
          <Link
            href={`/tournaments/${tournament.id}/users`}
            className="p-2 text-gp-gray hover:text-gp-pastel hover:bg-gp-pastel/10 rounded-lg transition-colors"
            title="Ver participantes"
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </Link>
        </div>

        {tournament.categories && tournament.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tournament.categories.slice(0, 3).map((cat, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-gp-pastel/20 text-gp-dark rounded"
              >
                {cat.category}-{cat.gender.charAt(0)}
              </span>
            ))}
            {tournament.categories.length > 3 && (
              <span className="px-2 py-0.5 text-xs bg-gp-gray-light text-gp-gray rounded">
                +{tournament.categories.length - 3}
              </span>
            )}
          </div>
        )}

        {isAdmin && (
          <div
            className="pt-3 border-t border-gp-gray-light"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative" ref={menuRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="w-full px-3 py-2 text-sm bg-gp-pastel text-white rounded hover:bg-gp-pastel/80 transition-colors flex items-center justify-between"
              >
                <span>Menu</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Sliding Menu */}
              <div
                className={`absolute left-0 right-0 mt-1 bg-white border border-gp-gray-light rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible"
                }`}
                style={{ zIndex: 50 }}
              >
                <button
                  onClick={handleAddTeam}
                  className="w-full px-4 py-2.5 text-left text-sm text-gp-dark hover:bg-gp-light/50 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Agregar Equipo
                </button>

                <button
                  onClick={handleTeamsList}
                  className="w-full px-4 py-2.5 text-left text-sm text-gp-dark hover:bg-gp-light/50 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Ver Equipos
                </button>

                {canStart && (
                  <button
                    onClick={handleStart}
                    className="w-full px-4 py-2.5 text-left text-sm text-green-700 hover:bg-green-50 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Iniciar Torneo
                  </button>
                )}

                {canStart && (
                  <div className="border-t border-gp-gray-light"></div>
                )}

                {isAdmin && onDelete && (
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2.5 text-left text-sm text-gp-red hover:bg-red-50 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Eliminar Torneo
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Team Modal */}
      <AddTeamModal
        isOpen={isAddTeamModalOpen}
        onClose={() => setIsAddTeamModalOpen(false)}
        tournamentId={tournament.id}
        categories={tournament.categories || []}
      />

      {/* Teams List Modal */}
      <TeamsListModal
        isOpen={isTeamsListModalOpen}
        onClose={() => setIsTeamsListModalOpen(false)}
        tournamentId={tournament.id}
      />
    </div>
  );
}
