import { KnownForDTO, PersonDTO } from "../models/Person";

const knownForDtoToKnownFor = (knownForDto: KnownForDTO) => {
  return {
    adult: knownForDto.adult,
    backdropPath: knownForDto.backdrop_path,
    id: knownForDto.id,
    title: knownForDto.title,
    originalTitle: knownForDto.original_title,
    overview: knownForDto.overview,
    posterPath: knownForDto.poster_path,
    type: knownForDto.media_type,
    originalLanguage: knownForDto.original_language,
    genreIds: knownForDto.genre_ids,
    popularity: knownForDto.popularity,
    releaseDate: knownForDto.release_date,
    video: knownForDto.video,
    voteAverage: knownForDto.vote_average,
    voteCount: knownForDto.vote_count
  };
};

const knownForDtosToKnownFor = (knownForDtos: KnownForDTO[]) => {
  return knownForDtos?.map((knownForDto) => knownForDtoToKnownFor(knownForDto));
};

const getGender = (gender: number) => {
  switch (gender) {
    case 0:
      return "Not specified";
    case 1:
      return "female";
    case 2:
      return "Male";
    case 3:
      return "Non-binary";
  }
};

export const personDtoToPerson = (personDto: PersonDTO) => {
  return {
    adult: personDto.adult,
    alsoKnownAs: personDto.also_known_as,
    biography: personDto.biography,
    birthday: personDto.birthday,
    deathday: personDto.deathday,
    gender: getGender(personDto.gender),
    homepage: personDto.homepage,
    id: personDto.id,
    imdbId: personDto.imdb_id,
    knownForDepartment: personDto.known_for_department,
    name: personDto.name,
    placeOfBirth: personDto.place_of_birth,
    popularity: personDto.popularity,
    profilePath: personDto.profile_path,
  };
};

export const personDtosToPersons = (personDtos: PersonDTO[]) => {
  return personDtos?.map((personDto) => personDtoToPerson(personDto));
};