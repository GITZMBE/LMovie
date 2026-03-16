
export interface PersonDTO {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: 0 | 1 | 2 | 3;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
};

export interface Person {
  adult: boolean;
  alsoKnownAs: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: string;
  homepage: string | null;
  id: number;
  imdbId: string | null;
  knownForDepartment: string;
  name: string;
  placeOfBirth: string | null;
  popularity: number;
  profilePath: string | null;
};

export interface KnownForDTO {
  adult: boolean
  backdrop_path: any
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  original_language: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
};

export interface KnownFor {
  adult: boolean
  backdropPath: any
  id: number
  title: string
  originalTitle: string
  overview: string
  posterPath: string
  type: string
  originalLanguage: string
  genreIds: number[]
  popularity: number
  releaseDate: string
  video: boolean
  voteAverage: number
  voteCount: number
};
