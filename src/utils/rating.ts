
export function twoDigitRating(num: number) {
  const rating = Math.min(100, Math.round(num));
  return rating;
};
