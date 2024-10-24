export function formatDateTime(dateTimeString: string) {
  let [datePart, timePart] = dateTimeString.split("T");

  let [year, month, day] = datePart.split("-");
  let formattedDatePart = `${day}-${month}-${year}`;

  let formattedTimePart = timePart.split(":00.")[0];

  return `${formattedDatePart} ${formattedTimePart}`;
}

export function parseDateTime(formattedDateTime: string) {
  let [datePart, timePart] = formattedDateTime.split(" ");

  let [day, month, year] = datePart.split("-");
  let formattedDatePart = `${year}-${month}-${day}`;
  let formattedTimePart = `${timePart}:00.000Z`;

  return `${formattedDatePart}T${formattedTimePart}`;
}
