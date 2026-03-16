'use client';

import type { ContinueWatchingDTO } from "../models";
import { ContinueWatching } from "../models/prisma/client";
import { continueWatchingState } from "../states/continueWatchingState";

const API_URL = "/api/continue-watching";

/* ---------------- FETCH FROM DATABASE ---------------- */

export const getContinueWatchingVideos = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) return [];

  const data = await res.json();

  continueWatchingState.set(data);
  return data as ContinueWatching[];
};

/* ---------------- HELPERS ---------------- */

const isVideoInContinueWatching = (tmdbId: number, type: string) => {
  const videos = continueWatchingState.get();
  return videos.some((v) => v.tmdbId === tmdbId && v.type === type);
};

const isVideoSameSeasonEpisode = (video: ContinueWatchingDTO) => {
  const videos = continueWatchingState.get();

  return videos.some(
    (v) =>
      v.tmdbId === video.tmdbId &&
      v.type === video.type &&
      v.season === video.season &&
      v.episode === video.episode
  );
};

/* ---------------- ADD OR UPDATE ---------------- */

export const addOrUpdateContinueWatchingVideo = async (
  video: ContinueWatchingDTO
) => {
  const videos = continueWatchingState.get();
  const isAlreadyInList = isVideoInContinueWatching(video.tmdbId, video.type);

  if (isAlreadyInList) {
    const isSameSeasonEpisode = isVideoSameSeasonEpisode(video);

    if (video.type === "series" && !isSameSeasonEpisode) {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(video),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedVideos = await res.json();

      continueWatchingState.set(updatedVideos);
    }
  } else {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(video),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const savedVideo = await res?.json();

    continueWatchingState.set([...videos, savedVideo]);
  }
};

/* ---------------- REMOVE ---------------- */

export const removeContinueWatchingVideo = async (tmdbId: number) => {
  const videos = continueWatchingState.get();

  const updated = videos.filter((v) => v.tmdbId !== tmdbId);

  continueWatchingState.set(updated);

  await fetch(`${API_URL}/${tmdbId}`, {
    method: "DELETE",
  });
};
