export interface TourFieldErrors {
  tourName?: string;
  clubName?: string;
  address?: string;
  avFrom?: string;
  avTo?: string;
  courts?: string;

  general?: string;
  notFound?: string;
}

export const TourErrors = {
  tourNameReq: "Titulo es obligatorio",
  clubNameReq: "Nombre del Club es obligatorio",
  addressReq: "Dirección es obligatorio",
  avFromReq: "Fecha Inicial es obligatorio",
  avToReq: "Fecha Final es obligatorio",
  courtsReq: "Numero de Canchas es obligatorio",
  notFoundReq: "No se encontro ningún Tour.",
};

export const errorMappings: { [key: string]: keyof TourFieldErrors } = {
  [TourErrors.tourNameReq]: "tourName",
  [TourErrors.clubNameReq]: "clubName",
  [TourErrors.addressReq]: "address",
  [TourErrors.avFromReq]: "avFrom",
  [TourErrors.avToReq]: "avTo",
  [TourErrors.courtsReq]: "courts",
  [TourErrors.notFoundReq]: "notFound",
};
