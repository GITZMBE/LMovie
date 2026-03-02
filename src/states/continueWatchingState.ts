'use client';

import { atom, onMount } from "nanostores";
import { VideoContinueWatching } from "../models";
import { getContinueWatchingVideos } from "../storage/continueWatching";

export const continueWatchingState = atom<VideoContinueWatching[]>([]);

onMount(continueWatchingState, () => {
  const mountContinueWatchingVideos = async () => {
    const storedContinueWatching = await getContinueWatchingVideos();
    continueWatchingState.set(storedContinueWatching);
  };

  mountContinueWatchingVideos();
});
