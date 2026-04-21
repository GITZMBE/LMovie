
/**
 * Determines if the current season/episode is the last one in the show_progress data.
 * show_progress keys are formatted as "s1e1", "s1e2", etc.
 */
export const checkIsFinalEpisode = (
  showProgress: Record<string, any> | undefined,
  currentSeason: number | undefined,
  currentEpisode: number | undefined
): boolean => {
  if (!showProgress || !currentSeason || !currentEpisode) return false;

  // Parse all known season/episode keys
  const allEpisodes = Object.keys(showProgress).map((key) => {
    const match = key.match(/^s(\d+)e(\d+)$/);
    if (!match) return null;
    return { season: parseInt(match[1]), episode: parseInt(match[2]) };
  }).filter(Boolean) as { season: number; episode: number }[];

  if (allEpisodes.length === 0) return false;

  // Find the highest season, then highest episode within that season
  const maxSeason = Math.max(...allEpisodes.map((e) => e.season));
  const finalEpisodesInLastSeason = allEpisodes
    .filter((e) => e.season === maxSeason)
    .map((e) => e.episode);
  const maxEpisode = Math.max(...finalEpisodesInLastSeason);

  return currentSeason === maxSeason && currentEpisode === maxEpisode;
}