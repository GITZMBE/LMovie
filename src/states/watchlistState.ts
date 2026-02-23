import { atom, onMount } from "nanostores";
import { Genre, Video } from "../models";
import genresJSON from "@/public/api/genres.json";
import { getWatchlist } from "../storage/watchlist";

export const watchlistState = atom<Video[]>([]);

onMount(watchlistState, () => {
  const storedList = getWatchlist();
  const genres = JSON.parse(JSON.stringify(genresJSON)) as Genre[];

  const videosWithGenres = storedList.map(video => {
    const selectedGenres = genres.filter((genre) => video.genreIds?.includes(genre.id));
    return { ...video, genres: selectedGenres };
  });
  watchlistState.set(videosWithGenres);
});
