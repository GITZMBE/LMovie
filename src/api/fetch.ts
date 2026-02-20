import { map } from "nanostores";
import {
  Genre,
  Logo,
  LogoDTO,
  MovieDTO,
  Review,
  ReviewDTO,
  SeasonDto,
  SeriesDTO,
  VideoKey,
  VideoKeyDTO,
  VideoType,
} from "../models";
import { CreditDto } from "../models/credit";
import { Provider, ProviderDto } from "../models/providers";
import {
  MovieSeriesToVideo,
  MoviesSeriesPaginatedToVideosPaginated,
  MoviesSeriesToVideos,
} from "../utils";
import { creditDtoToCredit } from "../utils/credit";
import { seasonDtoToSeason } from "../utils/season";
import { mapProviderDtoToProvider, mapProvidersDtoToProviders } from "../utils/provider";

const AUTHENTICATION_KEY = process.env.NEXT_PUBLIC_AUTHENTICATION_KEY;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL_API = process.env.NEXT_PUBLIC_BASE_URL_API;

export const fetchInfo = async (id: number, type: VideoType = "movie") => {
  const url = `${BASE_URL_API}/3/${type === "movie" ? "movie" : "tv"}/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const data = results as MovieDTO | SeriesDTO;
  const video = MovieSeriesToVideo(data, type);
  return video;
};

export const fetchTopVideo = async (type: VideoType = "movie") => {
  const url = `${BASE_URL_API}/3/${type === "movie" ? "movie" : "tv"}/top_rated`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const movies = (await results.results) as MovieDTO[] | SeriesDTO[];
  const topMovie = movies[0];
  const video = MovieSeriesToVideo(topMovie, type);
  return video;
};

export const fetchTopVideos = async (type: VideoType = "movie") => {
  const url = `${BASE_URL_API}/3/tv/top_rated`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const videos = results.results as MovieDTO[] | SeriesDTO[];
  const formatedVideos = MoviesSeriesToVideos(videos, type);
  return formatedVideos;
};

export const fetchVideoKey = async (id: number, type: VideoType = "movie") => {
  const url = `${BASE_URL_API}/3/${type === "movie" ? "movie" : "tv"}/${id}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const data = results.results as VideoKeyDTO[];
  const videoKeyDTO = data[0];
  const { key } = videoKeyDTO;
  const videoKey = { key } as VideoKey;
  return videoKey;
};

export const fetchPopular = async (type: VideoType = "movie") => {
  const url = `${BASE_URL_API}/3/${type === "movie" ? "movie" : "tv"}/popular?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const data = results.results as MovieDTO[] | SeriesDTO[];
  const video = MoviesSeriesToVideos(data, type);
  return video;
};

export const fetchQuery = async (query: string, type: VideoType = "movie") => {
  const url = `${BASE_URL_API}/3/search/${type === "movie" ? "movie" : "tv"}?api_key=${API_KEY}&query=${query}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const movies = results.results as MovieDTO[] | SeriesDTO[];
  const video = MoviesSeriesToVideos(movies, type);
  return video;
};

export const fetchUpcoming = async (type: VideoType = "movie") => {
  const url = `${BASE_URL_API}/3/${type === "movie" ? "movie" : "tv"}/upcoming?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const movies = results.results as MovieDTO[] | SeriesDTO[];
  const video = MoviesSeriesToVideos(movies, type);
  return video;
};

export const fetchRelatedVideos = async (
  id: number,
  type: VideoType = "movie",
) => {
  const url = `${BASE_URL_API}/3/${type === "movie" ? "movie" : "tv"}/${id}/similar?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const data = results.results as MovieDTO[] | SeriesDTO[];
  return MoviesSeriesToVideos(data, type);
};

export const fetchGenres = async () => {
  // const url = `${BASE_URL_API}/3/genre/movie/list?language=en-US`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: `Bearer ${AUTHENTICATION_KEY}`,
  //   },
  // };
  // const response = await fetch(url, options);
  // const results = await response.json();
  // const genres = await results.genres;

  const genres = await fetch("/api/genres.json").then((res) => res.json());
  return genres as Genre[];
};

export const fetchProviders = async (type: VideoType) => {
  const url =
    `${BASE_URL_API}/3/watch/providers/${type === "movie" ? "movie" : "tv"}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const data = results.results as ProviderDto[];
  const providers = mapProvidersDtoToProviders(data);
  return providers as Provider[];
};

export const fetchCredits = async (id: number, type: VideoType) => {
  const url = `${BASE_URL_API}/3/${type === "movie" ? "movie" : "tv"}/${id}/credits?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = (await response.json()) as CreditDto;
  const credits = creditDtoToCredit(results);
  return credits;
};

export const fetchReviews = async (id: number, type: VideoType) => {
  const url = `${BASE_URL_API}/3/${type === "movie" ? "movie" : "tv"}/${id}/reviews?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const reviews = results.results as ReviewDTO[];
  const formatedReviews = reviews.map((review) => ({
    author: review.author,
    content: review.content,
    createdAt: review.created_at,
  })) as Review[];
  return formatedReviews;
};

export const fetchFilter = async (
  genreId: string,
  page: number,
  translation: string,
  year: number,
  type: VideoType = "movie",
) => {
  const url = `${BASE_URL_API}/3/discover/${type === "movie" ? "movie" : "tv"}?with_genres=${genreId}&page=${page}&language=${translation}&primary_release_year=${year}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const data = results.results as MovieDTO[] | SeriesDTO[];
  const videos = MoviesSeriesToVideos(data, type);
  return videos;
};

export const fetchTranslations = async (callback: (_: any) => void) => {
  const url = `${BASE_URL_API}/3/configuration/primary_translations`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  callback(results);
};

export const fetchLanguages = async (callback: (_: any) => void) => {
  const url = `${BASE_URL_API}/3/configuration/languages`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  callback(results);
};

export const fetchCountries = async (callback: (_: any) => void) => {
  const url = `${BASE_URL_API}/3/configuration/countries`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  callback(results);
};

export const fetchVideosByGenre = async (
  id: number,
  page: number = 1,
  type: VideoType = "movie",
) => {
  const url = `${BASE_URL_API}/3/discover/${type === "movie" ? "movie" : "tv"}?with_genres=${id}&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const paginatedList = MoviesSeriesPaginatedToVideosPaginated(results, type);
  return paginatedList;
};

export const fetchVideosByProvider = async (
  id: number,
  type: VideoType = "movie",
  page: number = 1,
) => {
  const url = `${BASE_URL_API}/3/discover/${type === "movie" ? "movie" : "tv"}?with_watch_providers=${id}&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const paginatedList = MoviesSeriesPaginatedToVideosPaginated(results, type);
  return paginatedList;
};

export const fetchSeriesSeasonInfo = async (
  seriesId: number,
  seasonNumber: number,
) => {
  const url = `${BASE_URL_API}/3/tv/${seriesId}/season/${seasonNumber}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const result = (await response.json()) as SeasonDto;
  const season = seasonDtoToSeason(result);
  return season;
};

export const fetchLogo = async (id: number, type: VideoType = "movie") => {
  const url = `${BASE_URL_API}/3/${type === "movie" ? "movie" : "tv"}/${id}/images?include_image_language=en-US&language=en`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${AUTHENTICATION_KEY}`,
    },
  };
  const response = await fetch(url, options);
  const results = await response.json();
  const logos = results.logos as LogoDTO[];
  const logo = logos?.[0];
  const { file_path, aspect_ratio } = logo ?? {};
  const formatedLogo = {
    filePath: file_path,
    aspectRatio: aspect_ratio,
  } as Logo;
  return formatedLogo;
};
