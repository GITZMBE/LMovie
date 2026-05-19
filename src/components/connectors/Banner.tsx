'use client';

import React, { useEffect, useMemo, useState } from "react";
// import { AiFillPlayCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import Image from "next/image";
import { getYear, twoDigitRating } from "../../utils";
import { Logo, Video } from "../../models";
import { useRouter, useSearchParams } from "next/navigation";
import PlayerButton from "./Player/PlayerButton";
import ToggleWatchlistButton from "./WatchList/ToggleWatchlistButton";

interface Props {
  video?: Video;
  selectedSeason?: number;
  selectedEpisode?: number;
  children?: React.ReactNode;
}

function Banner({ video, selectedSeason = 1, selectedEpisode = 1, children }: Props) {
  const router = useRouter();
  const [logo, setLogo] = useState<Logo | null>(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL + "/t/p/original";
  // const streamUrl = "https://multiembed.mov/";
  const rating = useMemo(() => twoDigitRating(
    video && video.rating ? video.rating * 10 : 0,
  ), [video]);

  useEffect(() => {
    if (!video || !video.id || !video.type || video.logo) return setLoading(false);

    fetch(`/api/${video.type}/${video.id}/logo`).then((res) => res.json()).then(setLogo).finally(() => setLoading(false));
  }, [video]);

  useEffect(() => {console.log(video)}, [video]);

  return video && baseUrl ? (
    <div
      id='banner'
      style={{
        backgroundImage: baseUrl && video.backdropPath ? `url('${baseUrl + video.backdropPath}')` : "",
      }}
      className='relative w-full aspect-video min-h-[50vh] max-h-[80vh] bg-center bg-cover'
    >
      {children}
      <button onClick={() => router.push(`/${video.type}/${video.id}`)}>
        <div
          id='filter'
          className='absolute top-0 left-0 bottom-0 right-0 text-white pt-headerHeight pb-8 px-4 sm:px-12 w-full bg-linear-to-r from-black/70 from-30% to-black/50 to-100%'
        >
          <div className='flex flex-col justify-end items-center md:items-start gap-2 w-full md:w-3/5 lg:w-2/5 h-full' onClick={e => e.stopPropagation()}>
            <div id='title-container' className='flex items-center gap-4 py-2'>
              {(video?.logo || logo?.filePath) ? (
                <>
                  <Image
                    src={baseUrl + (video?.logo?.filePath || logo?.filePath)}
                    alt={video.title}
                    width={192}
                    height={Math.round(192 / (video?.logo?.aspectRatio || logo?.aspectRatio || 1))}
                    className="hidden md:block"
                  />
                  <Image
                    src={baseUrl + (video?.logo?.filePath || logo?.filePath)}
                    alt={video.title}
                    width={128}
                    height={Math.round(128 / (video?.logo?.aspectRatio || logo?.aspectRatio || 1))}
                    className="md:hidden"
                  />
                </>
              ) : (
                <h1 className='text-3xl font-bold'>{video?.title}</h1>
              )}
            </div>
            <p className='flex justify-center items-center flex-wrap gap-4 font-bold text-white text-sm uppercase'>
              <span className='px-1 sm:px-2 py-0.5 sm:py-1 text-sm sm:text-base rounded bg-green-600'>
                {rating} %
              </span>
              <span className="opacity-75">
                {video?.type === 'movie' ? (
                  getYear(video.releaseDate)
                ) : (
                  `${getYear(video.releaseDate)}-${getYear(video?.seasons?.findLast(_ => true)?.episodes?.findLast(_ => true)?.releaseDate as string)}`
                )}                
              </span>
              {video?.type === 'series' && (
                <span className="opacity-35">{video?.seasons?.length} {video?.seasons?.length === 1 ? 'Season' : 'Seasons'}</span>
              )}
              <p className="flex gap-2 items-center opacity-35">
                {video?.genres?.length && video.genres?.map((genreItem, index) => {
                  return (
                    <React.Fragment key={index}>
                      <span>{genreItem.name}</span>{" "}
                      {index !== video.genres!.length - 1 && <BsDot size={22} />}
                    </React.Fragment>
                  );
                })}
              </p>
              {new Date(video.releaseDate) > new Date() && (
                <span className='px-1 sm:px-2 py-0.5 sm:py-1 text-sm sm:text-base rounded bg-blue-600'>
                  Coming Soon
                </span>
              )}
            </p>
            <p className='max-h-16 md:max-h-none overflow-y-hidden text-sm md:text-base text-center md:text-start opacity-75'>
              {video?.description}
            </p>
            <div className="flex gap-4 items-center">
              <PlayerButton video={video} selectedSeason={selectedSeason} selectedEpisode={selectedEpisode} />
              <ToggleWatchlistButton variant="large" video={video} />
            </div>
          </div>
        </div>
      </button>
    </div>
  ) : (
    <div className='relative flex justify-center items-center w-full aspect-video min-h-[50vh] max-h-[80vh] bg-[#0f1115]'>
      {loading && (
        <p className='text-white text-xl'>Loading...</p>
      )}
    </div>
  );
}

export default Banner;
