import { atom } from "recoil";
import type { Video } from "../models";

export const FavoriteMoviesState = atom<Video[]>({
  key: "favoriteMovies",
  default: [],
});
