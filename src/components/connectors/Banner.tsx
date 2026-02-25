'use client';

import React, { useEffect, useMemo, useState } from "react";
// import { AiFillPlayCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import Image from "next/image";
import { getYear, twoDigitRating } from "../../utils";
import { Logo, Video } from "../../models";
import Link from "next/link";

interface Props {
  video?: Video;
  children?: React.ReactNode;
}

function Banner({ video, children }: Props) {
  const [logo, setLogo] = useState<Logo | null>(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/t/p/original";
  // const streamUrl = "https://multiembed.mov/";
  const rating = useMemo(() => twoDigitRating(
    video && video.rating ? video.rating * 10 : 0,
  ), [video]);

  useEffect(() => {
    if (!video) return setLoading(false);

    fetch(`/api/${video.type}/${video.id}/logo`).then((res) => res.json()).then(setLogo).finally(() => setLoading(false));
  }, [video]);

  return video && baseUrl &&
    rating ? (
    <div
      id='banner'
      style={{
        backgroundImage: baseUrl && video.backdropPath ? `url('${baseUrl + video.backdropPath}')` : "",
      }}
      className='relative w-full aspect-video min-h-[50vh] max-h-[80vh] bg-center bg-cover'
    >
      {children}
      <Link href={video && video.id ? `/movie/${video.id}` : "/"}>
        <div
          id='filter'
          className='absolute top-0 left-0 bottom-0 right-0 text-white pt-headerHeight pb-8 px-4 sm:px-12 w-full bg-linear-to-r from-black/70 from-30% to-black/50 to-100%'
        >
          <div className='flex flex-col justify-end items-center md:items-start gap-2 w-full md:w-3/5 lg:w-2/5 h-full'>
            <div id='title-container' className='flex items-center gap-4 py-2'>
              {/* <h1 className='text-3xl sm:text-5xl font-bold'>{title}</h1> */}
              {logo?.filePath && (
                <>
                  <Image
                    src={baseUrl + logo.filePath}
                    alt={video.title}
                    width={192}
                    height={Math.round(192 / (logo.aspectRatio || 1))}
                    className="hidden md:block"
                  />
                  <Image
                    src={baseUrl + logo.filePath}
                    alt={video.title}
                    width={128}
                    height={Math.round(128 / (logo.aspectRatio || 1))}
                    className="md:hidden"
                  />
                </>
              )}
              {/* {video && video?.id && (
                <Link
                  to={streamUrl + `?video_id=${video.id}&tmdb=1`}
                  target='_blank'
                  rel='noreferrer'
                  onClick={(e) => e.stopPropagation()}
                >
                  <AiFillPlayCircle
                    size={36}
                    className='text-secondary min-w-[36px]'
                  />
                </Link>
              )} */}
            </div>
            <p className='space-x-2 font-bold text-white text-sm uppercase'>
              <span className='px-1 sm:px-2 py-0.5 sm:py-1 text-sm sm:text-base rounded bg-green-600'>
                {rating} %
              </span>
              <span className='px-1 sm:px-2 py-0.5 sm:py-1 text-sm sm:text-base rounded bg-gray-800'>
                {getYear(video.releaseDate)}
              </span>
            </p>
            <p className='flex flex-wrap gap-2 text-gray-400'>
              {video?.genres?.length && video.genres?.map((genreItem, index) => {
                return (
                  <React.Fragment key={index}>
                    <span>{genreItem.name}</span>{" "}
                    {index !== video.genres!.length - 1 && <BsDot size={22} />}
                  </React.Fragment>
                );
              })}
            </p>
            <p className='max-h-16 sm:max-h-none overflow-y-hidden text-sm sm:text-base'>
              {video?.description}
            </p>
          </div>
        </div>
      </Link>
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
