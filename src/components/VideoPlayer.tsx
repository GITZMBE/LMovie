"use client";

import { useEffect, useState } from "react";
import { addOrUpdateContinueWatchingVideo } from "../storage/continueWatching";
import { Video } from "../models";

interface Props {
  video: Video;
  season?: number;
  episode?: number;
  // onAlmostFinished?: () => void;
}

export const VideoPlayer = ({ 
  video, 
  season, 
  episode, 
  // onAlmostFinished 
}: Props) => {
  const [eventData, setEventData] = useState<any | null>(null);
  const [hasCheckedContinueWatching, setHasCheckedContinueWatching] = useState(false);
  // const [hasTriggeredNextEpisode, setHasTriggeredNextEpisode] = useState(false);
  // const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  // const [eventCount, setEventCount] = useState(0);

  const baseUrl = "https://player.videasy.net";
  // const baseUrl = 'https://vidnest.fun';

  useEffect(() => {
    setHasCheckedContinueWatching(false);
    // setHasTriggeredNextEpisode(false);
  }, [video.id, season, episode]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        !["https://player.videasy.net", "https://vidnest.fun"].includes(
          event.origin,
        )
      )
        return;

      const data = JSON.parse(event.data);

      if (data?.type === "MEDIA_DATA") {
        const mediaData = JSON.parse(data.data);
        setEventData(mediaData);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [video]);

  useEffect(() => {
    if (!eventData) return;
    // setEventCount(eventCount + 1);
    // console.log(eventData)

    const key = `${video.type === "movie" ? "movie" : "tv"}-${video.id}`;

    if (!hasCheckedContinueWatching) {
      const watchedOverOneMinute = eventData?.[key]?.progress.watched > 60;
      // const watchedOverOneMinute = eventData?.currentTime > 60;

      if (!watchedOverOneMinute) return;

      addOrUpdateContinueWatchingVideo({
        ...video,
        id: undefined,
        tmdbId: video.id,
        ...(season ? { season } : { season: null }),
        ...(episode ? { episode } : { episode: null }),
      });
      setHasCheckedContinueWatching(true);
    }

    // const progress = eventData?.[key]?.progress;
    // const seasonEpisodeKey = `s${season}e${episode}`;
    // const currentSeasonEpisodeProgress = eventData?.[key]?.show_progress?.[seasonEpisodeKey]?.progress;

    // if (progress?.watched === currentSeasonEpisodeProgress?.watched && !hasStartedPlaying) {
    //   setHasStartedPlaying(true);
    // }
    
    // if (video?.type === 'series' && !hasTriggeredNextEpisode) {
    //   const watched = eventData?.[key]?.progress?.watched;
    //   const duration = eventData?.[key]?.progress?.duration;

    //   if (watched && duration) {
    //     const remaining = duration - watched;

    //     if (remaining < 30 && hasStartedPlaying) {
    //       setHasTriggeredNextEpisode(true);
    //       onAlmostFinished?.();
    //       setHasStartedPlaying(false);
    //     }
    //   }
    // }
  }, [eventData]);

  return (
    <div className='w-full aspect-video'>
    {/* Event count: {eventCount}
    Has started playing: {hasStartedPlaying.toString()}
    <br/>
    {eventData?.[`${video.type === "movie" ? "movie" : "tv"}-${video.id}`]?.progress?.watched} 
    / 
    {eventData?.[`${video.type === "movie" ? "movie" : "tv"}-${video.id}`]?.progress?.duration}
    -
    {eventData?.[`${video.type === "movie" ? "movie" : "tv"}-${video.id}`]?.show_progress?.[`s${season}e${episode}`]?.progress?.watched}{'\n'}
    Is same watched time: {eventData?.[`${video.type === "movie" ? "movie" : "tv"}-${video.id}`]?.progress?.watched === eventData?.[`${video.type === "movie" ? "movie" : "tv"}-${video.id}`]?.show_progress?.[`s${season}e${episode}`]?.progress?.watched ? 'true' : 'false'}{'\n'}
    Remaining: {eventData?.[`${video.type === "movie" ? "movie" : "tv"}-${video.id}`]?.progress?.duration - eventData?.[`${video.type === "movie" ? "movie" : "tv"}-${video.id}`]?.progress?.watched} */}
      <iframe
        src={`${baseUrl}/${video.type === "movie" ? "movie" : "tv"}/${video.id}${video.type === "series" ? `/${season}/${episode}` : ""}?overlay=true`}
        width='100%'
        height='100%'
        frameBorder='0'
        allowFullScreen
        allow='encrypted-media'
      />
    </div>
  );
};

export default VideoPlayer;
