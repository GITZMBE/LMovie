'use client';

import React, { useEffect, useState } from "react";
import { Video, VideoType } from "@/src/models";
import { BsDot } from "react-icons/bs";
import Credits from "@/src/components/Credits";
import CinematicModal from "@/src/components/ui/CinematicModal";
import { useParams } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import Banner from "@/src/components/connectors/Banner";
import VideosContainer from "@/src/components/ui/VideosContainer";

export const MoviePage = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const {id, type} = useParams<{id: string, type: VideoType}>();

  // const streamUrl = "https://multiembed.mov/";
  // const externalStreamUrl = "https://getsuperembed.link";

  const getPopularity = ( voteAverage = 1 ) => {return (voteAverage * 10).toString().substring(0, 2)};

  useEffect(() => {
    if (!id || !type) return;

    fetch(`/api/${type}/${id}`).then(res => res.json()).then(setVideo);
  }, [id, type]);

  const [open, setOpen] = useState(false);

  return (
    <div id='moviePoster'>
      <div className='w-full min-h-screen pb-4 bg-primary text-white space-y-4'>
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
        <div className='px-12 space-y-4'>
          <div className="flex items-end gap-2">
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
            </>
          </div>
          <div>
            <h2 className='text-xl font-bold'>Genres</h2>
            <p className='flex gap-2'>
              {video?.genres && video?.genres?.length && video?.genres?.map(({ name: genreName }, index) => (
                <React.Fragment key={index}>
                  <span>{genreName}</span>&nbsp;
                  {index !== (video?.genres?.length || 1) - 1 && <BsDot size={22} />}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className='pb-4'>
            <h2 className='text-xl font-bold'>Description</h2>
            <p>{video?.description}</p>
          </div>
          <div className='pb-4'>
            <h2 className='text-xl font-bold'>Release Date</h2>
            <p>{video?.releaseDate}</p>
          </div>
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
          <div className='relative flex w-full h-12 border-white border-2'>
            <div style={{ width: `${getPopularity(video?.rating)}%` }} className='bg-green-500 h-full'></div>
            <p className='absolute w-full text-center leading-12 tracking-[16px]'>
              Popularity {getPopularity(video?.rating)}%
            </p>
          </div>
          {type && (
            <>
              <Credits id={id ? +id : 0} type={type} />
              <VideosContainer title='Related' fetchPath={`/api/${type}/${id}/related`} posterSize="backdrop" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
