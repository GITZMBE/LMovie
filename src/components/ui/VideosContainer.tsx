import { useState, useEffect } from "react";
import Poster from "./Poster";
import Draggable from "./Draggable";
import { Video } from "../../models";

interface Props {
  title: string;
  fetchFunction: () => Promise<any>;
}

function VideosContainer({ title, fetchFunction }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    fetchFunction().then(setVideos);
  }, [fetchFunction]);

  return (
    <div className='min-w-screen py-4 px-4 sm:px-12'>
      <h2 className='font-bold text-3xl'>{title}</h2>
      <Draggable>
        <div className='flex gap-4'>
          {videos.length ? videos.map(({ id, title, description, posterPath, backdropPath, releaseDate, rating, type, genreIds }) => (
            <Poster 
              key={id} 
              id={id} 
              type={type} 
              title={title} 
              description={description}
              posterPath={posterPath} 
              backdropPath={backdropPath}
              releaseDate={releaseDate} 
              rating={rating} 
              genreIds={genreIds}
            />
          )) : null}
        </div>
      </Draggable>
    </div>
  );
}

export default VideosContainer;
