'use client';

import React, { useEffect, useMemo, useState } from "react";
import { Video, VideoKey, VideoType } from "@/src/models";
import Credits from "@/src/components/Credits";
import CinematicModal from "@/src/components/ui/CinematicModal";
import { useParams, useSearchParams } from "next/navigation";
import { FaBookmark, FaPlay, FaRegBookmark } from "react-icons/fa";
import Banner from "@/src/components/connectors/Banner";
import VideosContainer from "@/src/components/ui/VideosContainer";
import YoutubePlayer from "@/src/components/ui/YoutubePlayer";
import Draggable from "@/src/components/ui/Draggable";
import PageContainer from "../../ui/PageContainer";
import { useStore } from "@nanostores/react";
import { watchlistState } from "@/src/states";
import { WatchlistDTO } from "@/src/models/watchlist";
import { removeWatchlist, saveWatchlist } from "@/src/storage/watchlist";
import { useToast } from "@/src/hooks";
import SeasonList from "../Series/SeasonList";

export const MoviePageClient = () => {
  const { showToast } = useToast();
  const [video, setVideo] = useState<Video | null>(null);
  const {id, type} = useParams<{id: string, type: VideoType}>();
  const [videoKeys, setVideoKeys] = useState<VideoKey[]>([]);
  const watchlist = useStore(watchlistState);
  const searchParams = useSearchParams();
  const selectedSeason = Number(searchParams.get("season")) || 1;
  const selectedEpisode = Number(searchParams.get("episode")) || 1;

  const isWatchlisted = useMemo(
    () => watchlist?.some((video) => video.tmdbId === +id),
    [watchlist, id],
  );

  const addToWatchlist = async () => {
    if (isWatchlisted) return showToast("Already in watchlist!", "info");

    const movieObject = {
      tmdbId: +id,
      type,
      ...video,
    } as WatchlistDTO;

    const savedVideo = await saveWatchlist(movieObject);
    watchlistState.set([...(watchlist ?? []), savedVideo]);

    showToast("Added to watchlist!", "success");
  };
  const removeFromWatchlist = async () => {
    if (!isWatchlisted) return showToast("Not in watchlist!", "info");

    const { tmdbId } = await removeWatchlist(+id, type);
    watchlistState.set(watchlist.filter((video) => video.tmdbId !== tmdbId));

    showToast("Removed from watchlist!", "success");
  };

  useEffect(() => {
    if (!id || !type) return;

    fetch(`/api/${type}/${id}`).then(res => res.json()).then(setVideo);
    fetch(`/api/${type}/${id}/video`).then(res => res.json()).then(setVideoKeys);
  }, [id, type]);

  useEffect(() => console.log('video: ', video), [video])

  const [open, setOpen] = useState(false);

  return (
    <div id='moviePoster'>
      <div>
        <Banner video={video as Video}>
          {/* <Trailer videoKey={videoInfo && videoInfo.key} className='hidden' /> */}
          {/* <iframe
            src={streamUrl + `?video_id=${video?.id}&tmdb=1`}
            title={`Stream for ${video?.title || `movie-${video?.id}`}`}
            frameBorder="0"
            className="w-full aspect-video"
            allowFullScreen
          /> */}
          {/* <div className="w-full h-[80vh] bg-[#0f1115]"></div> */}
        </Banner>
        <PageContainer className="gap-4">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between flex-wrap gap-4">
            <div className="flex items-start gap-4">
              <h1 className='text-3xl font-bold'>{video?.title}</h1>
              <>
                <button onClick={() => setOpen(true)} className="flex justify-center items-center gap-1 bg-white text-black px-3 py-1.5 rounded-lg cursor-pointer">
                  <FaPlay />
                  <span>Play</span>
                </button>

                <CinematicModal
                  open={open}
                  onClose={() => setOpen(false)}
                  video={video as Video}
                  onEpisodeChange={(season, episode) => {
                    console.log("Load video:", season, episode);
                  }}
                />

                {!isWatchlisted ? (
                  <button
                    onClick={addToWatchlist}
                    className='p-2 aspect-square rounded-lg bg-[#202020] border border-[#D7D7D7] text-[#D7D7D7] cursor-pointer'
                  >
                    <FaRegBookmark />
                  </button>
                ) : (
                  <button
                    onClick={removeFromWatchlist}
                    className='p-2 aspect-square rounded-lg bg-[#202020] border border-white text-white cursor-pointer'
                  >
                    <FaBookmark />
                  </button>
                )}
              </>
            </div>
              {(video?.type === "series" && (
                <SeasonList 
                  seasons={video.seasons || []}
                  selectedSeason={selectedSeason}
                  selectedEpisode={selectedEpisode}
                />
              ))}
          </div>
          <Draggable>
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div
                className={`flex gap-4`}
              >
                {videoKeys?.map((videoKey) => (
                  <YoutubePlayer key={videoKey.key} videoKey={videoKey.key} />
                ))}
              </div>
            </div>
          </Draggable>
          {/* <div className='flex items-center gap-4'>
            <h2 className='text-xl font-bold'>Votes: </h2>
            <div className='space-y-2'>
              <AiOutlineArrowUp
                className='fill-green-500 hover:fill-green-800 cursor-pointer'
                onClick={() => setVotes(votes + 1)}
              />
              <p className='selection:bg-transparent'>{votes}</p>
              <AiOutlineArrowDown
                className='fill-red-500 hover:fill-red-800 cursor-pointer'
                onClick={() => setVotes(votes - 1)}
              />
            </div>
          </div> */}
          {type && (
            <>
              <Credits id={id ? +id : 0} type={type} />
              <VideosContainer title='Related' fetchPath={`/api/${type}/${id}/related`} posterSize="backdrop" />
            </>
          )}
        </PageContainer>
      </div>
    </div>
  );
}

export default MoviePageClient;