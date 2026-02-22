import { Crew, CrewDto, Episode, EpisodeDto, GuestStar, GuestStarDto, Network, NetworkDto, Season, SeasonDto } from "../models";

export function crewDtoToCrew(dto: CrewDto): Crew {
  return {
    department: dto.department,
    job: dto.job,
    creditId: dto.credit_id,
    adult: dto.adult,
    gender: dto.gender,
    id: dto.id,
    knownForDepartment: dto.known_for_department,
    name: dto.name,
    originalName: dto.original_name,
    popularity: dto.popularity,
    profilePath: dto.profile_path,
  }
};

export function guestStarDtoToGuestStar(dto: GuestStarDto): GuestStar {
  return {
    character: dto.character,
    creditId: dto.credit_id,
    order: dto.order,
    adult: dto.adult,
    gender: dto.gender,
    id: dto.id,
    knownForDepartment: dto.known_for_department,
    name: dto.name,
    originalName: dto.original_name,
    popularity: dto.popularity,
    profilePath: dto.profile_path,
  }
};

export function networkDtoToNetwork(dto: NetworkDto): Network {
  return {
    id: dto.id,
    logoPath: dto.logo_path,
    name: dto.name,
    originCountry: dto.origin_country,
  }
};

export function episodeDtoToEpisode(dto: EpisodeDto): Episode {
  return {
    id: dto.id,
    releaseDate: dto.air_date,
    episodeNumber: dto.episode_number,
    episodeType: dto.episode_type,
    name: dto.name,
    description: dto.overview,
    productionCode: dto.production_code,
    runtime: dto.runtime,
    seasonNumber: dto.season_number,
    showId: dto.show_id,
    stillPath: dto.still_path,
    rating: dto.vote_average,
    voteCount: dto.vote_count,
    crew: dto.crew.map(crewDtoToCrew),
    guestStars: dto.guest_stars.map(guestStarDtoToGuestStar),
  }
};

export function episodeDtosToEpisodes(dtos: EpisodeDto[]): Episode[] {
  return dtos.map(episodeDtoToEpisode);
};

export function seasonDtoToSeason(dto: SeasonDto): Season {
  return {
    _id: dto._id,
    id: dto.id,
    releaseDate: dto.air_date,
    name: dto.name,
    description: dto.overview,
    posterPath: dto.poster_path,
    episodeCount: dto.episode_count,
    seasonNumber: dto.season_number,
    rating: dto.vote_average,
    networks: dto.networks?.map(networkDtoToNetwork),
    episodes: dto.episodes?.map(episodeDtoToEpisode),
  }
};

export function seasonDtosToSeasons(dtos: SeasonDto[]): Season[] {
  return dtos.map(seasonDtoToSeason);
};
