'use client';

import type { VideoContinueWatching } from "../models";
import { continueWatchingState } from "../states/continueWatchingState";

const API_URL = "/api/continue-watching";

/* ---------------- FETCH FROM DATABASE ---------------- */

export const getContinueWatchingVideos = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) return [];

  const data = await res.json();

  continueWatchingState.set(data);
  return data as VideoContinueWatching[];
};

/* ---------------- HELPERS ---------------- */

const isVideoInContinueWatching = (id: number, type: string) => {
  const videos = continueWatchingState.get();
  return videos.some((v) => v.id === id && v.type === type);
};

const isVideoSameSeasonEpisode = (video: VideoContinueWatching) => {
  const videos = continueWatchingState.get();

  return videos.some(
    (v) =>
      v.id === video.id &&
      v.type === video.type &&
      v.season === video.season &&
      v.episode === video.episode
  );
};

/* ---------------- ADD OR UPDATE ---------------- */

export const addOrUpdateContinueWatchingVideo = async (
  video: VideoContinueWatching
) => {
  const videos = continueWatchingState.get();
  const isAlreadyInList = isVideoInContinueWatching(video.id, video.type);

  if (isAlreadyInList) {
    const isSameSeasonEpisode = isVideoSameSeasonEpisode(video);

    if (video.type === "series" && !isSameSeasonEpisode) {
      const updatedVideos = videos.map((v) => {
        if (
          v.id === video.id &&
          v.type === video.type &&
          (v.season !== video.season || v.episode !== video.episode)
        ) {
          return video;
        }

        return v;
      });

      fetch(API_URL, {
        method: "PUT",
        body: JSON.stringify({
          tmdbId: video.id,
          type: video.type,
          season: video.season,
          episode: video.episode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      continueWatchingState.set(updatedVideos);
    }
  } else {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        tmdbId: video.id,
        type: video.type,
        season: video.season,
        episode: video.episode,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    continueWatchingState.set([...videos, video]);
  }

  /* ---------- DATABASE UPDATE ---------- */

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      tmdbId: video.id,
      type: video.type,
      season: video.season,
      episode: video.episode,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/* ---------------- REMOVE ---------------- */

export const removeContinueWatchingVideo = async (id: number) => {
  const videos = continueWatchingState.get();

  const updated = videos.filter((v) => v.id !== id);

  continueWatchingState.set(updated);

  await fetch(`${API_URL}?tmdbId=${id}`, {
    method: "DELETE",
  });
};
