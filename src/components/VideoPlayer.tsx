'use client';

import { useEffect, useState } from "react";
import { addOrUpdateContinueWatchingVideo } from "../storage/continueWatching";
import { Video } from "../models";

interface Props {
  video: Video;
  season?: number;
  episode?: number;
};

export const VideoPlayer = ({ video, season, episode }: Props) => {
  const [eventData, setEventData] = useState<any | null>(null);
  const [hasCheckedContinueWatching, setHasCheckedContinueWatching] = useState(false);

  // const baseUrl = 'https://player.videasy.net';
  const baseUrl = 'https://vidnest.fun';

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://vidnest.fun') return;
      
      if (event.data?.type === 'MEDIA_DATA') {
        const mediaData = event.data.data;
        setEventData(mediaData);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [video]);

  useEffect(() => {
    if (hasCheckedContinueWatching) return;

    if (!eventData) return;
    const watchedOverOneMinute = eventData?.currentTime > 60;

    if (!watchedOverOneMinute) return;

    addOrUpdateContinueWatchingVideo({
      ...video,
      season,
      episode,
    });
    setHasCheckedContinueWatching(true);
  }, [eventData]);

  return (
    <div className="w-full aspect-video">
      <iframe
        src={`${baseUrl}/${video.type  === "movie" ? "movie" : "tv"}/${video.id}${video.type === "series" ? `/${season}/${episode}` : ""}`}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        allow="encrypted-media"
      />
    </div>
  )
};

export default VideoPlayer;