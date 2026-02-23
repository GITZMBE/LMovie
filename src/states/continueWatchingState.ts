'use client';

import { atom, onMount } from "nanostores";
import { Genre, VideoContinueWatching } from "../models";
import genresJSON from "@/public/api/genres.json";
import { getContinueWatchingVideos } from "../storage/continueWatching";

export const continueWatchingState = atom<VideoContinueWatching[]>([]);

onMount(continueWatchingState, () => {
  const storedContinueWatching = getContinueWatchingVideos();
  const genres = JSON.parse(JSON.stringify(genresJSON)) as Genre[];

  const videosWithGenres = storedContinueWatching.map(video => {
    const selectedGenres = genres.filter((genre) => video.genreIds?.includes(genre.id));
    return { ...video, genres: selectedGenres };
  });
  continueWatchingState.set(videosWithGenres);
});
