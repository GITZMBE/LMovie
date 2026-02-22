'use client';

import { atom, onMount } from "nanostores";
import type { Genre, Video } from "../models";
import { getFavoriteVideos } from "../storage";
import genresJSON from "@/public/api/genres.json";

export const favoriteMoviesState = atom<Video[]>([]);

onMount(favoriteMoviesState, () => {
  const storedFavorites = getFavoriteVideos();
  const genres = JSON.parse(JSON.stringify(genresJSON)) as Genre[];

  const videosWithGenres = storedFavorites.map(video => {
    const selectedGenres = genres.filter((genre) => video.genreIds?.includes(genre.id));
    return { ...video, genres: selectedGenres };
  });
  favoriteMoviesState.set(videosWithGenres);
});
