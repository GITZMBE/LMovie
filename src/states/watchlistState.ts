import { atom, onMount } from "nanostores";
import { getWatchlist } from "../storage/watchlist";
import { WatchlistVideo } from "../models/watchlist";

export const watchlistState = atom<WatchlistVideo[]>([]);

onMount(watchlistState, () => {
  const mountWatchlist = async () => {
    if (typeof window === "undefined") return;
    
    const storedList = await getWatchlist();
    watchlistState.set(storedList);
  };
  
  mountWatchlist();
});
