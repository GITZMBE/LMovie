"use client";

import { useEffect, useState } from "react";
import { addOrUpdateContinueWatchingVideo, removeContinueWatchingVideo } from "../storage/continueWatching";
import { Video } from "../models";
import { checkIsFinalEpisode } from "../utils/player";

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
    const progress = eventData?.[key]?.progress;

    if (!progress) return;

    const { watched, duration } = progress;

    if (watched <= 60) return;

    const NEAR_END_THRESHOLD = 60; // seconds from end = "finished"

    const isNearEnd = duration > 0 && watched >= duration - NEAR_END_THRESHOLD;

    if (isNearEnd) {
      if (video.type === "movie") {
        // Movie finished — remove it
        removeContinueWatchingVideo(video.id);
        setHasCheckedContinueWatching(false);
      } else {
        // TV series — check if this is the final episode
        const showProgress = eventData?.[key]?.show_progress;
        const isFinalEpisode = checkIsFinalEpisode(showProgress, season, episode);

        if (isFinalEpisode) {
          // Final episode of the series — remove it
          removeContinueWatchingVideo(video.id);
          setHasCheckedContinueWatching(false);
        } else {
          const showProgress = eventData?.[key]?.show_progress;
          const nextEpisodeKey = `s${season}e${(episode ?? 0) + 1}`;

          const { nextSeason, nextEpisode } = showProgress?.[nextEpisodeKey]
            ? { nextSeason: season, nextEpisode: (episode ?? 0) + 1 }
            : { nextSeason: (season ?? 0) + 1, nextEpisode: 1 };

          addOrUpdateContinueWatchingVideo({
            ...video,
            genreIds: video?.genreIds?.length
              ? video.genreIds
              : video?.genres?.length
              ? video.genres.map((genre) => genre.id)
              : [],
            id: undefined,
            tmdbId: video.id,
            season: nextSeason ?? null,
            episode: nextEpisode ?? null,
          });
          setHasCheckedContinueWatching(true);
        }
      }
    } else if (!hasCheckedContinueWatching) {
      const watchedOverOneMinute = progress.watched > 60;

      if (!watchedOverOneMinute) return;

      const watchedUntilEnd = progress.watched >= progress.duration - 300;

      if (watchedUntilEnd) {
        removeContinueWatchingVideo(video.id);
        setHasCheckedContinueWatching(false);
      } else {
        addOrUpdateContinueWatchingVideo({
          ...video,
          genreIds: video?.genreIds?.length ? video.genreIds : video?.genres?.length ? video.genres.map((genre) => genre.id) : [],
          id: undefined,
          tmdbId: video.id,
          ...(season ? { season } : { season: null }),
          ...(episode ? { episode } : { episode: null }),
        });
        setHasCheckedContinueWatching(true);        
      }
    }

    // const progress = progress;
    // const seasonEpisodeKey = `s${season}e${episode}`;
    // const currentSeasonEpisodeProgress = eventData?.[key]?.show_progress?.[seasonEpisodeKey]?.progress;

    // if (progress?.watched === currentSeasonEpisodeProgress?.watched && !hasStartedPlaying) {
    //   setHasStartedPlaying(true);
    // }
    
    // if (video?.type === 'series' && !hasTriggeredNextEpisode) {
    //   const watched = progress?.watched;
    //   const duration = progress?.duration;

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
