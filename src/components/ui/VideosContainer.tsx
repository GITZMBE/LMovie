'use client';

import { useState, useEffect } from "react";
import Poster from "./Poster";
import Draggable from "./Draggable";
import { Video } from "../../models";

interface Props {
  title?: string;
  fetchPath: string;
  wrap?: boolean;
  posterSize?: "poster" | "backdrop";
}

function VideosContainer({ title, fetchPath, wrap = false, posterSize = "poster" }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    fetch(fetchPath).then(r => r.json()).then(setVideos);
  }, [fetchPath]);

  return (
    <div className='w-full'>
      {title && <h2 className='font-bold text-3xl'>{title}</h2>}

      {wrap ? (
        <div
          className={`flex gap-4 ${
            wrap ? "flex-wrap" : "flex-nowrap"
          }`}
        >
          {videos.map(video => (
            <Poster key={video.id} {...video} size={posterSize} />
          ))}
        </div>
      ) : (
        <Draggable>
          <div className="w-full overflow-x-auto hide-scrollbar">
            <div
              className={`flex gap-4 ${
                wrap ? "flex-wrap" : "flex-nowrap"
              }`}
            >
              {videos.length ? videos.map((video) => (
                <Poster 
                  key={video.id} 
                  {...video}
                  size={posterSize}
                />
              )) : null}              
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default VideosContainer;
