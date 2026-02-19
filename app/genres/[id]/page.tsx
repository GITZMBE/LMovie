'use client';

import { fetchVideosByGenre } from "@/src/api";
import Poster from "@/src/components/ui/Poster";
import { VideosPaginated } from "@/src/models";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
};

export const Genre = ({ params }: Props) => {
  const { id } = params;
  const [page, setPage] = useState(1);
  const [videosPaginated, setVideosPaginated] = useState<VideosPaginated>({ totalPages: 0, results: [] });

  useEffect(() => {
    fetchVideosByGenre(id ? +id : 1, page).then(setVideosPaginated);
  }, [id, page]);
  
  return videosPaginated?.results && videosPaginated.results.length > 0 ? (
    <div id='genre' className='py-4 text-white'>
      <div className='min-w-screen py-4'>
        <div className='flex flex-wrap gap-4'>
          {videosPaginated.results.map(({ id, title, description, posterPath, backdropPath, releaseDate, rating, type, genreIds }) => (
            <Poster key={id} id={id} title={title} description={description} posterPath={posterPath} backdropPath={backdropPath} releaseDate={releaseDate} rating={rating} type={type} genreIds={genreIds} />
          ))}
        </div>
      </div>
      <div className="flex gap-8 justify-center items-center">
        <button onClick={page > 1 ? () => {setPage(page - 1)} : _ => {}} className="text-gray-500 hover:text-white">{'<<'}</button>
        <p className="text-white">{page}</p>
        <button onClick={page < videosPaginated.totalPages ? () => {setPage(page + 1)} : _ => {}} className="text-gray-500 hover:text-white">{'>>'}</button>
      </div>
    </div>
  ) : null;
}

export default Genre;
