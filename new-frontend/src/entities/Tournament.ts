import { Tour } from "./Tour";

export enum TournamentStatus {
  PENDING = "pending",
  IN_PROGRESS = "inProgress",
  FINISHED = "finish",
}

export interface Category {
  category: string;
  gender: string;
}

export interface Tournament {
  id: string;
  tour: Tour;
  title: string;
  master: number;
  status: TournamentStatus;
  teamsCount?: number;
  categories: Category[];
  teams?: { id: string; name: string }[];
  createdAt?: string;
  startedAt?: string;
  finishedAt?: string;
}

// Status label mapping
export const STATUS_LABELS: Record<TournamentStatus, string> = {
  [TournamentStatus.PENDING]: "Pendiente",
  [TournamentStatus.IN_PROGRESS]: "Activo",
  [TournamentStatus.FINISHED]: "Finalizado",
};

// Helper function to get status label
export function getStatusLabel(status: string): string {
  return STATUS_LABELS[status as TournamentStatus] || status;
}
