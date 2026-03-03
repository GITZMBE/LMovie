import { MovieDTO, MoviesSeriesPaginatedDTO, SeriesDTO, Video, VideosPaginated, VideoType } from "../models";
import { seasonDtosToSeasons } from "./season";

export const MovieSeriesToVideo = (movieSeries: MovieDTO | SeriesDTO, type?: VideoType): Video => {
  const data = type === "movie" ? movieSeries as MovieDTO : movieSeries as SeriesDTO;
  console.log(type)
  const currentType = type ? type : data.media_type === 'movie' ? 'movie' : data.media_type === 'tv' ? 'series' : type;
  return {
    id: data.id,
    type: currentType,
    title: currentType === "movie" ? (data as MovieDTO).title : (data as SeriesDTO).name,
    description: data.overview,
    releaseDate: currentType === "movie" ? (data as MovieDTO).release_date : (data as SeriesDTO).first_air_date,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
    genreIds: data.genre_ids,
    genres: data.genres,
    rating: data.vote_average,
    ...((currentType === "series" && (data as SeriesDTO)?.seasons) && { seasons: seasonDtosToSeasons((data as SeriesDTO).seasons) }),
  } as Video;
};

export const MoviesSeriesToVideos = (moviesSeries: (MovieDTO | SeriesDTO)[], type?: VideoType): Video[] => {
  return moviesSeries.map(movieSeries => MovieSeriesToVideo(movieSeries, type || movieSeries.media_type === 'movie' ? 'movie' : movieSeries.media_type === 'tv' ? 'series' : type));
};

export const MoviesSeriesPaginatedToVideosPaginated = (moviesSeriesPaginated: MoviesSeriesPaginatedDTO, type: VideoType): VideosPaginated => {
  return {
    totalPages: moviesSeriesPaginated.total_pages,
    results: MoviesSeriesToVideos(moviesSeriesPaginated.results, type),
  } as VideosPaginated;
}
