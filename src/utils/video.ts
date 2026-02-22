import { MovieDTO, MoviesSeriesPaginatedDTO, SeriesDTO, Video, VideosPaginated, VideoType } from "../models";
import { seasonDtosToSeasons } from "./season";

export const MovieSeriesToVideo = (movieSeries: MovieDTO | SeriesDTO, type: VideoType): Video => {
  const data = type === "movie" ? movieSeries as MovieDTO : movieSeries as SeriesDTO;
  return {
    id: data.id,
    type,
    title: type === "movie" ? (data as MovieDTO).title : (data as SeriesDTO).name,
    description: data.overview,
    releaseDate: type === "movie" ? (data as MovieDTO).release_date : (data as SeriesDTO).first_air_date,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
    genreIds: data.genre_ids,
    rating: data.vote_average,
    ...((type === "series" && (data as SeriesDTO)?.seasons) && { seasons: seasonDtosToSeasons((data as SeriesDTO).seasons) }),
  } as Video;
};

export const MoviesSeriesToVideos = (moviesSeries: (MovieDTO | SeriesDTO)[], type: VideoType): Video[] => {
  return moviesSeries.map(movieSeries => MovieSeriesToVideo(movieSeries, type));
};

export const MoviesSeriesPaginatedToVideosPaginated = (moviesSeriesPaginated: MoviesSeriesPaginatedDTO, type: VideoType): VideosPaginated => {
  return {
    totalPages: moviesSeriesPaginated.total_pages,
    results: MoviesSeriesToVideos(moviesSeriesPaginated.results, type),
  } as VideosPaginated;
}
