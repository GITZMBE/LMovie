
export interface PersonDTO {
  adult: boolean
  id: number
  name: string
  original_name: string
  media_type: string
  popularity: number
  gender: number
  known_for_department: string
  profile_path: any
  known_for: KnownForDTO[]
}

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
