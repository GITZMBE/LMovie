import { Genre } from "./genre";

export interface SeriesDTO {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  genres?: Genre[];
  seasons: SeasonDto[];
};

export interface Series {
  id: number;
  name: string;
  releasedate: string;
  rating: number;
  posterPath: string;
  genreIds: number[];
  seasons: Season[];
};

export interface SeasonDto {
  _id: string;
  id: number;
  air_date: string;
  episode_count: number;
  episodes: EpisodeDto[];
  name: string;
  networks: NetworkDto[];
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export interface Season {
  _id: string;
  id: number;
  releaseDate: string;
  episodeCount: number;
  episodes: Episode[];
  name: string;
  networks: Network[];
  description: string;
  posterPath: string;
  seasonNumber: number;
  rating: number;
};

export interface EpisodeDto {
  id: number
  air_date: string
  episode_number: number
  episode_type: string
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
  crew: CrewDto[]
  guest_stars: GuestStarDto[]
}

export interface Episode {
  id: number
  releaseDate: string
  episodeNumber: number
  episodeType: string
  name: string
  description: string
  productionCode: string
  runtime: number
  seasonNumber: number
  showId: number
  stillPath: string
  rating: number
  voteCount: number
  crew: Crew[]
  guestStars: GuestStar[]
}

export interface CrewDto {
  department: string
  job: string
  credit_id: string
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
}

export interface Crew {
  department: string
  job: string
  creditId: string
  adult: boolean
  gender: number
  id: number
  knownForDepartment: string
  name: string
  originalName: string
  popularity: number
  profilePath?: string
}

export interface GuestStarDto {
  character: string
  credit_id: string
  order: number
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
}

export interface GuestStar {
  character: string
  creditId: string
  order: number
  adult: boolean
  gender: number
  id: number
  knownForDepartment: string
  name: string
  originalName: string
  popularity: number
  profilePath?: string
}

export interface NetworkDto {
  id: number
  logo_path: string
  name: string
  origin_country: string
};

export interface Network {
  id: number
  logoPath: string
  name: string
  originCountry: string
};
