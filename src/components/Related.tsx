import { useState, useEffect } from "react";
import { fetchRelatedVideos } from "../api/fetch";
import Draggable from "./ui/Draggable";
import Poster from "./ui/Poster";
import type { Video, VideoType } from '../models';

interface Props {
  id: number;
  type?: VideoType;
}

function Related({ id, type = "movie" }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchRelatedVideos(id, type).then(setVideos);
  }, [id, type]);

  return (
    <div className='py-4'>
      <h2 className='font-bold text-3xl'>Related</h2>
      <Draggable>
        <div className='flex gap-4'>
          {videos.map(({ id, title, description, posterPath, backdropPath, releaseDate, rating, genreIds }) =>
            <Poster key={id} id={id} type='movie' title={title} description={description} posterPath={posterPath} backdropPath={backdropPath} releaseDate={releaseDate} rating={rating} genreIds={genreIds} />
          )}
        </div>
      </Draggable>
    </div>
  );
}

export default Related;
