'use client';

import React, { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
// import Reviews from "../components/Reviews";
import { Genre, Video, VideoType } from "@/src/models";
import { fetchGenres, fetchInfo } from "@/src/api";
import Link from "next/link";
import { BsDot } from "react-icons/bs";
import Credits from "@/src/components/Credits";
import Related from "@/src/components/Related";

interface Props {
  params: {
    type: VideoType;
    id: string;
  };
};

export const MoviePage = ({ params }: Props) => {
  const { type, id } = params;
  const [video, setVideo] = useState<Video | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  const streamUrl = "https://multiembed.mov/";
  // const externalStreamUrl = "https://getsuperembed.link";

  const getPopularity = ( voteAverage = 1 ) => {return (voteAverage * 10).toString().substring(0, 2)};

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
    if (!id) return;

    fetchInfo(+id, type).then(setVideo);
  }, [id, type]);

  return (
    <div id='moviePoster'>
      <div className='w-full min-h-screen pb-4 bg-primary text-white space-y-4'>
        {/* <Banner topMovie={movie}> */}
          {/* <Trailer videoKey={videoInfo && videoInfo.key} className='hidden' /> */}
          <iframe
            src={streamUrl + `?video_id=${video?.id}&tmdb=1`}
            title={`Stream for ${video?.title || `movie-${video?.id}`}`}
            frameBorder="0"
            className="w-full aspect-video"
            allowFullScreen
          />
        {/* </Banner> */}
        <div className='px-12 space-y-4'>
          <div className="flex items-end gap-2">
            <h1 className='text-3xl font-bold'>{video?.title}</h1>
            <Link
              // to={externalStreamUrl + `?video_id=${id}&tmdb=1`}
              href={`/movie/${id}/redirect`}
              target='_blank'
              rel='noreferrer'
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 w-fit text-lg font-semibold px-3 py-1 rounded-full bg-secondary text-white"
            >
              <span>Play</span>
              <AiFillPlayCircle
                size={32}
              />
            </Link>            
          </div>
          <div>
            <h2 className='text-xl font-bold'>Genres</h2>
            <p className='flex gap-2'>
              {genres?.map(({ id: genreId }, index) => (
                <React.Fragment key={index}>
                  <span>{genres.find((genreItem) => genreItem.id === genreId)?.name}</span>&nbsp;
                  {index !== genres.length - 1 && <BsDot size={22} />}
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
          <Credits id={id ? +id : 0} type={type} />
          {/* <Reviews id={id} /> */}
          <Related id={id ? +id : 0} type={type} />
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
