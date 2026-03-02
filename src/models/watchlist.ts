import { Genre } from "./genre";
import { Watchlist } from "./prisma/client";

export interface WatchlistDTO extends Omit<Watchlist, 'id' | 'userId'> {
  
};

export interface WatchlistVideo extends Watchlist {
  genres?: Genre[];
};
