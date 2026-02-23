import { Genre } from "./genre";
import { MovieDTO } from "./movie";
import { Season, SeriesDTO } from "./series";

export type VideoType = 'movie' | 'series';

export interface Video {
  id: number;
  type: string;
  title: string;
  description: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  rating: number;
  genreIds: number[];
  genres?: Genre[];
  seasons?: Season[]; // only for series
};

export interface VideoContinueWatching extends Video {
  season?: number;
  episode?: number;
};

export interface MoviesSeriesPaginatedDTO {
  total_pages: number;
  results: (MovieDTO | SeriesDTO)[];
};

export interface VideosPaginated {
  totalPages: number;
  results: Video[];
};

export interface VideoKeyDTO {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export interface VideoKey {
  key: string;
};
