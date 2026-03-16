import { Genre } from "./genre";
import { Logo } from "./logo";
import { MovieDTO } from "./movie";
import { ContinueWatching } from "./prisma/client";
import { Season, SeriesDTO } from "./series";

export type VideoType = 'movie' | 'series' | 'multi';

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
  logo?: Logo;
};

export interface ContinueWatchingDTO extends Omit<ContinueWatching, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {
  id?: undefined;
  userId?: undefined;
};

export interface VideoContinueWatching extends ContinueWatching {
  genres?: Genre[];
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
