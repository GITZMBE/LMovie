
export function splitReviewsDate(string: string) {
  const array = string.split("T")[0];
  return array;
}

export function getYear(date: string) {
  const year = String(date).substring(0, 4);
  return year;
}
