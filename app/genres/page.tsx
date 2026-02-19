'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchGenres } from "@/src/api";

const genresData = [
  {
      "id": 28,
      "name": "Action"
  },
  {
      "id": 12,
      "name": "Adventure"
  },
  {
      "id": 16,
      "name": "Animation"
  },
  {
      "id": 35,
      "name": "Comedy"
  },
  {
      "id": 80,
      "name": "Crime"
  },
  {
      "id": 99,
      "name": "Documentary"
  },
  {
      "id": 18,
      "name": "Drama"
  },
  {
      "id": 10751,
      "name": "Family"
  },
  {
      "id": 14,
      "name": "Fantasy"
  },
  {
      "id": 36,
      "name": "History"
  },
  {
      "id": 27,
      "name": "Horror"
  },
  {
      "id": 10402,
      "name": "Music"
  },
  {
      "id": 9648,
      "name": "Mystery"
  },
  {
      "id": 10749,
      "name": "Romance"
  },
  {
      "id": 878,
      "name": "Science Fiction"
  },
  {
      "id": 10770,
      "name": "TV Movie"
  },
  {
      "id": 53,
      "name": "Thriller"
  },
  {
      "id": 10752,
      "name": "War"
  },
  {
      "id": 37,
      "name": "Western"
  }
]

export const Genres = ({ children }: { children: React.ReactNode }) => {
  const [genres, setGenres] = useState(genresData);
  const [selectedGenre, setSelectedGenre] = useState(28);

  useEffect(() => {
    if (genres.length > 0) return;

    fetchGenres().then((genres) => setGenres(genres));
  }, [genres]);

  return (
    <div id='genres' className='pt-23 sm:pt-headerHeight bg-primary'>
      <div className='px-12 min-h-screen'>
        <div className='flex flex-wrap gap-4 w-full pt-8 sm:pt-16 pb-4 text-white'>
          {genres.map((genre, i) => (
            <Link
              key={i}
              href={`/genres/${genre.id}`}
              className={`py-1 px-2 hover:bg-secondary rounded-md ${
                selectedGenre === genre.id ? "bg-secondary" : ""
              }`}
              onClick={() => setSelectedGenre(genre.id)}
            >
              {genre.name}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Genres;