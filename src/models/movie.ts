import { Genre } from "./genre";

export interface MovieDTO {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  genres?: Genre[]
  media_type?: string;
};

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genreIds: number[];
};

export interface MoviePoster {
  id: number;
  type: string;
  title: string;
  imagePath: string;
  releaseDate: string;
  rating: number;
}
