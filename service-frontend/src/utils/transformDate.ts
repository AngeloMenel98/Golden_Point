export function formatDateTime(dateTimeString: string) {
  // Separar la fecha y la hora
  let [datePart, timePart] = dateTimeString.split("T");

  // Reordenar la fecha de YYYY-MM-DD a DD-MM-YYYY
  let [year, month, day] = datePart.split("-");
  let formattedDatePart = `${day}-${month}-${year}`;

  // Tomar solo la parte de la hora hasta ':00'
  let formattedTimePart = timePart.split(":00.")[0];

  // Construir el nuevo string de fecha y hora
  return `${formattedDatePart} ${formattedTimePart}`;
}
