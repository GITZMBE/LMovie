import { CrewDto } from "../models";
import { Cast, CastDto, Credit, CreditDto, Crew } from "../models/credit";

export function castDtoToCast(dto: CastDto): Cast {
  return {
    adult: dto.adult,
    gender: dto.gender,
    id: dto.id,
    knownForDepartment: dto.known_for_department,
    name: dto.name,
    originalName: dto.original_name,
    popularity: dto.popularity,
    profilePath: dto.profile_path ?? undefined,
    character: dto.character,
    creditId: dto.credit_id,
    order: dto.order,
  };
};

export function crewDtoToCrew(dto: CrewDto): Crew {
  return {
    adult: dto.adult,
    gender: dto.gender,
    id: dto.id,
    knownForDepartment: dto.known_for_department,
    name: dto.name,
    originalName: dto.original_name,
    popularity: dto.popularity,
    profilePath: dto.profile_path ?? undefined,
    creditId: dto.credit_id,
    department: dto.department,
    job: dto.job,
  };
};

export function creditDtoToCredit(dto: CreditDto): Credit {
  return {
    id: dto.id,
    cast: dto.cast.map(castDtoToCast),
    crew: dto.crew.map(crewDtoToCrew),
  };
};
