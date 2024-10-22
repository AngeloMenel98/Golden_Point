export function formatDateTime(dateTimeString: string) {
  let [datePart, timePart] = dateTimeString.split("T");

  let [year, month, day] = datePart.split("-");
  let formattedDatePart = `${day}-${month}-${year}`;

  let formattedTimePart = timePart.split(":00.")[0];

  return `${formattedDatePart} ${formattedTimePart}`;
}
