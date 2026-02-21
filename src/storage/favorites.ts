'use client';

import { Video } from "../models";

export const saveFavoriteVideos = (videos: Video[]) => {
  localStorage.setItem("favoritVideos", JSON.stringify(videos));
};

export const getFavoriteVideos = () => {
  const favoriteVideos = localStorage.getItem("favoritVideos");
  if (!favoriteVideos) return [];
  return JSON.parse(favoriteVideos);
};
