'use client';

import { useState, useEffect } from "react";
import Poster from "./Poster";
import Draggable from "./Draggable";
import { Video } from "../../models";

interface Props {
  title?: string;
  fetchPath?: string;
  wrap?: boolean;
  posterSize?: "poster" | "backdrop";
  children?: React.ReactNode;
}

function VideosContainer({ title, fetchPath, wrap = false, posterSize = "poster", children }: Props) {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (!fetchPath) return;
    fetch(fetchPath).then(r => r.json()).then(setVideos);
  }, [fetchPath]);

  const items = fetchPath && videos.length
    ? videos.map(video => <Poster key={video.id} {...video} size={posterSize} />)
    : children;

  const inner = (
    <div className={`flex gap-4 ${wrap ? "flex-wrap" : "flex-nowrap"}`}>
      {items}
    </div>
  );

  return (
    <section className="w-full space-y-3">
      {title && <h2 className="text-xl font-bold">{title}</h2>}

      {wrap ? inner : (
        <Draggable>
          <div className="w-full overflow-x-auto hide-scrollbar">
            {inner}
          </div>
        </Draggable>
      )}
    </section>
  );
}

export default VideosContainer;