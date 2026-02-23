'use client';

import type { VideoContinueWatching } from "../models";
import { continueWatchingState } from "../states/continueWatchingState";

export const saveContinueWatchingVideos = (videos: VideoContinueWatching[]) => {
  localStorage?.setItem("continueWatching", JSON.stringify(videos));
};

export const getContinueWatchingVideos = () => {
  const continueWatchingVideos = localStorage?.getItem("continueWatching");
  if (!continueWatchingVideos) return [];
  return JSON.parse(continueWatchingVideos) as VideoContinueWatching[];
};

const isVideoInContinueWatching = (id: number, type: string) => {
  const continueWatchingVideos = continueWatchingState.get();
  return continueWatchingVideos.some(
    (video) => video.id === id && video.type === type
  );
};

const isVideoSameSeasonEpisode = (video: VideoContinueWatching) => {
  const continueWatchingVideos = continueWatchingState.get();
  return continueWatchingVideos.some(
    (v) => v.id === video.id && v.type === video.type && v.season === video.season && v.episode === video.episode
  );
};

export const addOrUpdateContinueWatchingVideo = (video: VideoContinueWatching) => {
  const continueWatchingVideos = getContinueWatchingVideos();
  const isAlreadyInList = isVideoInContinueWatching(video.id, video.type);

  if (isAlreadyInList) {
    const isSameSeasonEpisode = isVideoSameSeasonEpisode(video);

    if (video.type === "series" && !isSameSeasonEpisode) {
      const updatedVideos = continueWatchingVideos.map(v => {
        if (v.id === video.id && v.type === video.type && (v.season !== video.season || v.episode !== video.episode)) {
          return video;
        }
        return v;
      });
      saveContinueWatchingVideos(updatedVideos);
    }
  } else {
    saveContinueWatchingVideos([...continueWatchingVideos, video]);
  }
};

export const removeContinueWatchingVideo = (id: number) => {
  const continueWatchingVideos = getContinueWatchingVideos();
  const updatedVideos = continueWatchingVideos.filter((video) => video.id !== id);
  saveContinueWatchingVideos(updatedVideos);
};
