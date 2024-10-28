import { StatusEnum } from "../entities/enums/StatusEnum";

export function getTournamentStatus(status: string): StatusEnum | string {
  switch (status) {
    case "pending":
      return StatusEnum.Pendiente;
    case "inProgress":
      return StatusEnum.Activo;
    case "finish":
      return StatusEnum.Finalizado;
    default:
      return "Estado desconocido";
  }
}
