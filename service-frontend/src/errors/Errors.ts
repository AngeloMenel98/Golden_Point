export interface Errors {
  //Register
  username?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  location?: string;

  //Tournaments
  tournamentName?: string;
  master?: string;
  categories?: string;

  //Tour
  tourName?: string;
  clubName?: string;
  address?: string;
  avFrom?: string;
  avTo?: string;
  courts?: string;
  tourCode?: string;
  userJoined?: string;

  //Team

  //Match

  general?: string;
  notFound?: string;
}

export const ErrorsRes = {
  //Tournaments
  tournamentNameReq: "Nombre del Torneo es obligatorio",
  masterReq: "Master es obligatorio",
  categoriesReq: "Al menos se necesita una categoría",
  notFoundTournReq: "No se encontro ningún Torneo.",

  //Tour
  tourNameReq: "Titulo es obligatorio",
  clubNameReq: "Nombre del Club es obligatorio",
  addressReq: "Dirección es obligatorio",
  avFromReq: "Fecha Inicial es obligatorio",
  avToReq: "Fecha Final es obligatorio",
  courtsReq: "Numero de Canchas es obligatorio",
  notFoundTourReq: "No se encontro ningún Tour.",
  tourCodeReq: "Código del Tour es obligatorio",
  tourCodeExistReq: "El código del Tour no existe.",
  userAlreadyJoined: "El Usuario ya esta unido al Tour.",

  //Team

  //Match
  notFoundMatchReq: "No se encontro ningún Partido.",

  //Ranking
  notFoundRankReq: "No se encontro ningún Usuario.",

  //Register
  usernameRequired: "Nombre de Usuario es obligatorio",
  passwordRequired: "Contraseña es obligatorio",
  passwordMinLength: "La contraseña debe ser de al menos 8 caracteres",
  emailRequired: "Email es obligatorio",
  firstNameRequired: "Nombre es obligatorio",
  lastNameRequired: "Apellido es obligatorio",
  phoneNumberRequired: "Número de Teléfono es obligatorio",
  locationRequired: "Ciudad es obligatorio",

  //Login
  usernameLogRequired: "Nombre de Usuario no existe.",
  passwordLogRequired: "Contraseña es incorrecta.",
};

export const errorMappings: { [key: string]: keyof Errors } = {
  //Tournaments
  [ErrorsRes.tournamentNameReq]: "tournamentName",
  [ErrorsRes.masterReq]: "master",
  [ErrorsRes.categoriesReq]: "categories",
  [ErrorsRes.notFoundTournReq]: "notFound",

  //Tours
  [ErrorsRes.tourNameReq]: "tourName",
  [ErrorsRes.clubNameReq]: "clubName",
  [ErrorsRes.addressReq]: "address",
  [ErrorsRes.avFromReq]: "avFrom",
  [ErrorsRes.avToReq]: "avTo",
  [ErrorsRes.courtsReq]: "courts",
  [ErrorsRes.notFoundTourReq]: "notFound",
  [ErrorsRes.tourCodeReq]: "tourCode",
  [ErrorsRes.tourCodeExistReq]: "tourCode",
  [ErrorsRes.userAlreadyJoined]: "userJoined",

  //Ranking
  [ErrorsRes.notFoundRankReq]: "notFound",

  //Match
  [ErrorsRes.notFoundMatchReq]: "notFound",

  //Register
  [ErrorsRes.usernameRequired]: "username",
  [ErrorsRes.passwordRequired]: "password",
  [ErrorsRes.passwordMinLength]: "password",
  [ErrorsRes.emailRequired]: "email",
  [ErrorsRes.firstNameRequired]: "firstName",
  [ErrorsRes.lastNameRequired]: "lastName",
  [ErrorsRes.phoneNumberRequired]: "phoneNumber",
  [ErrorsRes.locationRequired]: "location",

  //Login
  [ErrorsRes.usernameLogRequired]: "username",
  [ErrorsRes.passwordLogRequired]: "password",
};
