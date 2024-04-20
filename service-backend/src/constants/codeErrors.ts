const codeErrors = {
  GEN_1: (value: any) => `${value} ID no existe.`,
  GEN_2: (value: any) => `No se encontro ningún ${value}.`,
  GEN_3: (value: any) => `${value} ya existe.`,
  USER_1: `El usuario no es ADMIN.`,

  TOUR_1: `El código del Tour no existe.`,
  TOUR_2: (value: any) => `${value} ya esta unido al Tour.`,

  TEAM_1: `La cantidad de jugadores por equipo son 2.`,

  MATCH_1: `Cantidad de equipos incorrectos.`,

  SET_1: (value: any) => `El partido ya tiene ${value} sets.`,
};

export default codeErrors;
