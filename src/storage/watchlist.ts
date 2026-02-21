'use client';

import { Video } from "../models";

export const saveWatchlist = (videos: Video[]) => {
  localStorage.setItem("watchlist", JSON.stringify(videos));
};

export const getWatchlist = () => {
  const watchlist = localStorage.getItem("watchlist");
  if (!watchlist) return [];
  return JSON.parse(watchlist) as Video[];
};
