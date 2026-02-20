'use client';

import { atom, onMount } from "nanostores";
import type { Video } from "../models";
import { getFavoriteVideos } from "../storage";

export const favoriteMoviesState = atom<Video[]>([]);

onMount(favoriteMoviesState, () => {
  const storedFavorites = getFavoriteVideos();
  favoriteMoviesState.set(storedFavorites);
});
