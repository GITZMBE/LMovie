import { atom, onMount } from "nanostores";
import { Video } from "../models";

export const watchlistState = atom<Video[]>([]);

onMount(watchlistState, () => {
  const storedList = localStorage.getItem("watchlist");
  watchlistState.set(storedList ? JSON.parse(storedList) : []);
});
