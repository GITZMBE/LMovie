
export interface CreditDto {
  cast: CastDto[]
  crew: CrewDto[]
  id: number
};

export interface Credit {
  cast: Cast[]
  crew: Crew[]
  id: number
};

export interface CastDto {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  character: string
  credit_id: string
  order: number
};

export interface Cast {
  adult: boolean
  gender: number
  id: number
  knownForDepartment: string
  name: string
  originalName: string
  popularity: number
  profilePath?: string
  character: string
  creditId: string
  order: number
}

export interface CrewDto {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
};

export interface Crew {
  adult: boolean
  gender: number
  id: number
  knownForDepartment: string
  name: string
  originalName: string
  popularity: number
  profilePath?: string
  creditId: string
  department: string
  job: string
};
