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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://player.videasy.net") return;
      if (typeof event.data !== "string") return;

      try {
        const data = JSON.parse(event.data);
        setEventData(data);
      } catch {
        return;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [video]);

  useEffect(() => {
    if (hasCheckedContinueWatching) return;

    const data = eventData?.data;
    if (!data) return;
    const watchedOverOneMinute = data?.currentTime > 60;

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
        src={`https://player.videasy.net/${video.type  === "movie" ? "movie" : "tv"}/${video.id}${video.type === "series" ? `/season=${season}&episode=${episode}` : ""}`}
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