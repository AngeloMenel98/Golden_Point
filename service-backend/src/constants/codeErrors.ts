const codeErrors = {
  GEN_1: (value: any) => `${value} ID no existe.`,
  GEN_2: (value: any) => `No se encontro ningún ${value}.`,
  GEN_3: (value: any) => `${value} ya existe.`,

  USER_1: `El usuario no es ADMIN.`,

  TOUR_1: `El código del Tour no existe.`,
  TOUR_2: (value: any) => `${value} ya esta unido al Tour.`,

  TOURN_1: `Master obligatorio`,
  TOURN_2: `Al menos se necesita una categoría`,
  TOURN_3: `Numero de equipo no suficientes`,

  TEAM_1: `La cantidad de jugadores por equipo son 2.`,

  MATCH_1: `Cantidad de equipos incorrectos.`,
  MATCH_2: `El partido no se pudo actualizar.`,

  COURT_1: `Número de cancha no existe.`,

  CLUB_1: `Debe haber al menos una cancha disponible.`,
  CLUB_2: (value: any, text: any, date: any) =>
    `La ${value} debe ser ${text} a la ${date}.`,

  SET_0: `Cantidad de Sets insuficientes.`,
  SET_1: (value: any) => `El partido ya tiene ${value} sets.`,
  SET_2: `Uno de los equipos debe ganar ambos sets.`,
  SET_3: `Uno de los equipos debe ganar al menos 2 de los 3 sets.`,
};

export default codeErrors;
