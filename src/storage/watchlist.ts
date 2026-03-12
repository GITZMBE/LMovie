'use client';

import { WatchlistDTO } from "../models/watchlist";

const API_URL = "/api/watchlist";

export const saveWatchlist = async (video: WatchlistDTO) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(video),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const savedVideo = await res.json();
  return savedVideo;
};

export const getWatchlist = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
};

export const removeWatchlist = async (tmdbId: number, type: string) => {
  const res = await fetch(`${API_URL}/${tmdbId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
    }),
  });
  const savedVideo = await res.json();
  return savedVideo;
};
