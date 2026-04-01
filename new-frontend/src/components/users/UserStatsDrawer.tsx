"use client";

import { useEffect, useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { useUserStats } from "@/hooks/useUserStats";
import { useUserTournaments } from "@/hooks/useUserTournaments";

interface UserStatsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  username: string;
  fullName?: string;
  tournamentId?: string;
  tournamentName?: string;
}

type TabType = "overview" | "stats" | "ranking";

export function UserStatsDrawer({
  isOpen,
  onClose,
  userId,
  username,
  fullName,
  tournamentId: initialTournamentId,
  tournamentName: initialTournamentName,
}: UserStatsDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [selectedTournamentId, setSelectedTournamentId] = useState<
    string | undefined
  >(initialTournamentId);
  const [selectedTournamentName, setSelectedTournamentName] = useState<
    string | undefined
  >(initialTournamentName);
  const {
    userStats,
    rankings,
    isLoading,
    error,
    fetchUserStats,
    fetchRankings,
  } = useUserStats();
  const {
    tournaments,
    isLoading: tournamentsLoading,
    fetchUserTournaments,
  } = useUserTournaments();

  // Fetch tournaments when drawer opens
  useEffect(() => {
    if (isOpen && userId) {
      fetchUserTournaments(userId);
    }
  }, [isOpen, userId, fetchUserTournaments]);

  // Update selected tournament when props change
  useEffect(() => {
    if (initialTournamentId) {
      setSelectedTournamentId(initialTournamentId);
      setSelectedTournamentName(initialTournamentName);
    }
  }, [initialTournamentId, initialTournamentName]);

  // Fetch stats when selected tournament changes
  useEffect(() => {
    if (isOpen && userId) {
      fetchUserStats(userId, selectedTournamentId);
      console.log("userStat, setWOn", userStats?.global.gamesWon);
      if (selectedTournamentId) {
        fetchRankings(selectedTournamentId);
      }
    }
  }, [isOpen, userId, selectedTournamentId, fetchUserStats, fetchRankings]);

  const tabs: { id: TabType; label: string }[] = [
    { id: "overview", label: "Resumen" },
    { id: "stats", label: "Estadísticas" },
    { id: "ranking", label: "Ranking" },
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gp-pastel"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 text-center text-gp-red">
          <p>{error}</p>
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return (
          <div className="p-4 space-y-6">
            {/* User header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gp-pastel/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-gp-dark">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gp-dark">
                  {fullName || username}
                </h3>
                <p className="text-gp-gray">@{username}</p>
              </div>
            </div>

            {/* Quick stats */}
            {userStats && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gp-light/50 rounded-lg p-4">
                  <p className="text-sm text-gp-gray">Partidos Ganados</p>
                  <p className="text-2xl font-bold text-gp-dark">
                    {userStats.global.wins}
                  </p>
                </div>
                <div className="bg-gp-light/50 rounded-lg p-4">
                  <p className="text-sm text-gp-gray">Partidos Perdidos</p>
                  <p className="text-2xl font-bold text-gp-dark">
                    {userStats.global.losses}
                  </p>
                </div>
                <div className="bg-gp-light/50 rounded-lg p-4">
                  <p className="text-sm text-gp-gray">Puntos Totales</p>
                  <p className="text-2xl font-bold text-gp-dark">
                    {userStats.global.totalPoints}
                  </p>
                </div>
                <div className="bg-gp-light/50 rounded-lg p-4">
                  <p className="text-sm text-gp-gray">Ranking Actual</p>
                  <p className="text-2xl font-bold text-gp-pastel">
                    #{userStats.global.currentRanking}
                  </p>
                </div>
              </div>
            )}

            {/* Tournament info if applicable */}
            {selectedTournamentName && (
              <div className="bg-gp-pastel/10 rounded-lg p-4 border border-gp-pastel/20">
                <p className="text-sm text-gp-gray">Torneo Actual</p>
                <p className="font-medium text-gp-dark">
                  {selectedTournamentName}
                </p>
              </div>
            )}
          </div>
        );

      case "stats":
        return (
          <div className="p-4 space-y-6">
            {/* Global Stats */}
            {userStats && (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-gp-dark mb-3">
                    Estadísticas Globales
                  </h3>
                  <div className="bg-gp-light/30 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gp-gray">Partidos Jugados</span>
                      <span className="font-medium text-gp-dark">
                        {userStats.global.wins + userStats.global.losses}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gp-gray">Partidos Ganados</span>
                      <span className="font-medium text-green-600">
                        {userStats.global.wins}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gp-gray">Partidos Perdidos</span>
                      <span className="font-medium text-gp-red">
                        {userStats.global.losses}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gp-gray-light pt-2">
                      <span className="text-gp-gray">Ratio de Victoria</span>
                      <span className="font-bold text-gp-pastel">
                        {userStats.global.winRate} %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gp-gray">Games Ganados</span>
                      <span className="font-medium text-green-600">
                        {userStats.global.gamesWon}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gp-gray">Games Perdidos</span>
                      <span className="font-medium text-gp-red">
                        {userStats.global.gamesLost}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gp-gray-light pt-2">
                      <span className="text-gp-gray">Puntos Totales</span>
                      <span className="font-bold text-gp-dark">
                        {userStats.global.totalPoints}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gp-gray">Torneos Jugados</span>
                      <span className="font-medium text-gp-dark">
                        {userStats.global.tournamentsPlayed}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tournament Stats */}
                {userStats.tournament && (
                  <div>
                    <h3 className="text-lg font-semibold text-gp-dark mb-3">
                      Estadísticas del Torneo
                    </h3>
                    <div className="bg-gp-pastel/10 rounded-lg p-4 border border-gp-pastel/20 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gp-gray">Partidos Jugados</span>
                        <span className="font-medium text-gp-dark">
                          {userStats.tournament.matchesWon +
                            userStats.tournament.matchesLost}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gp-gray">Partidos Ganados</span>
                        <span className="font-medium text-green-600">
                          {userStats.tournament.matchesWon}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gp-gray">Partidos Perdidos</span>
                        <span className="font-medium text-gp-red">
                          {userStats.tournament.matchesLost}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gp-gray-light pt-2">
                        <span className="text-gp-gray">Ratio de Victoria</span>
                        <span className="font-bold text-gp-pastel">
                          {userStats.tournament.matchesWon +
                            userStats.tournament.matchesLost >
                          0
                            ? Math.round(
                                (userStats.tournament.matchesWon /
                                  (userStats.tournament.matchesWon +
                                    userStats.tournament.matchesLost)) *
                                  100,
                              )
                            : 0}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gp-gray">Sets Ganados</span>
                        <span className="font-medium text-green-600">
                          {userStats.tournament.setsWon}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gp-gray">Sets Perdidos</span>
                        <span className="font-medium text-gp-red">
                          {userStats.tournament.setsLost}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gp-gray-light pt-2">
                        <span className="text-gp-gray">
                          Puntos en el Torneo
                        </span>
                        <span className="font-bold text-gp-dark">
                          {userStats.tournament.points}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {!userStats && !isLoading && !error && (
              <p className="text-center text-gp-gray p-4">
                No hay estadísticas disponibles
              </p>
            )}
          </div>
        );

      case "ranking":
        return (
          <div className="p-4 space-y-6">
            {userStats && (
              <div className="space-y-4">
                <div className="bg-gp-light/30 rounded-lg p-4">
                  <p className="text-sm text-gp-gray mb-1">Posición Actual</p>
                  <p className="text-3xl font-bold text-gp-pastel">
                    #{userStats.global.currentRanking}
                  </p>
                  {selectedTournamentId && userStats.tournament && (
                    <p className="text-sm text-gp-gray mt-2">
                      en {selectedTournamentName || "este torneo"}
                    </p>
                  )}
                </div>

                <div className="bg-gp-pastel/10 rounded-lg p-4 border border-gp-pastel/20">
                  <p className="text-sm text-gp-gray mb-1">
                    Mejor Posición Histórica
                  </p>
                  <p className="text-3xl font-bold text-gp-dark">
                    #{userStats.global.highestRanking}
                  </p>
                </div>
              </div>
            )}

            {/* Tournament rankings table */}
            {selectedTournamentId && rankings.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gp-dark mb-3">
                  Clasificación del Torneo
                </h3>
                <div className="space-y-2">
                  {rankings.slice(0, 10).map((r, index) => (
                    <div
                      key={r.userId}
                      className={`
                        flex items-center justify-between p-3 rounded-lg
                        ${r.userId === userId ? "bg-gp-pastel/20 border border-gp-pastel" : "bg-gp-light/30"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                            ${index < 3 ? "bg-gp-pastel text-white" : "bg-gp-gray-light text-gp-gray"}
                          `}
                        >
                          {index + 1}
                        </span>
                        <span className="font-medium text-gp-dark">
                          {r.fullName || r.username}
                        </span>
                      </div>
                      <span className="font-bold text-gp-dark">
                        {r.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!userStats && !isLoading && !error && (
              <p className="text-center text-gp-gray p-4">
                No hay información de ranking disponible
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={fullName || username}>
      {/* Tabs */}
      <div className="flex border-b border-gp-gray-light/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 py-3 text-sm font-medium transition-colors
              ${
                activeTab === tab.id
                  ? "text-gp-pastel border-b-2 border-gp-pastel"
                  : "text-gp-gray hover:text-gp-dark"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tournament Switcher */}
      {tournaments.length > 0 && (
        <div className="p-4 border-b border-gp-gray-light/30">
          <label className="text-sm text-gp-gray mb-2 block">
            Ver estadísticas de:
          </label>
          <select
            value={selectedTournamentId || "global"}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "global") {
                setSelectedTournamentId(undefined);
                setSelectedTournamentName(undefined);
              } else {
                const tournament = tournaments.find((t) => t.id === value);
                setSelectedTournamentId(value);
                setSelectedTournamentName(tournament?.name);
              }
            }}
            className="w-full p-2 bg-gp-light/50 border border-gp-gray-light/30 rounded-lg text-gp-dark focus:outline-none focus:ring-2 focus:ring-gp-pastel/50"
          >
            <option value="global">Estadísticas Globales</option>
            {tournaments.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Loading state for tournaments */}
      {tournamentsLoading && (
        <div className="p-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gp-pastel"></div>
        </div>
      )}

      {/* Content */}
      {renderContent()}
    </Drawer>
  );
}
