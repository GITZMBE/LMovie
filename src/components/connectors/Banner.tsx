'use client';

import React, { useEffect, useMemo, useState } from "react";
// import { AiFillPlayCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import Image from "next/image";
import { getYear, twoDigitRating } from "../../utils";
import { Logo, Video } from "../../models";
import Link from "next/link";

interface Props {
  topVideo: Video;
  children?: React.ReactNode;
}

function Banner({ topVideo, children }: Props) {
  const [logo, setLogo] = useState<Logo | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/t/p/original";
  // const streamUrl = "https://multiembed.mov/";
  const rating = useMemo(() => twoDigitRating(
    topVideo && topVideo.rating ? topVideo.rating * 10 : 0,
  ), [topVideo]);

  useEffect(() => {
    fetch(`/api/${topVideo.type}/${topVideo.id}/logo`).then((res) => res.json()).then(setLogo);
  }, [topVideo]);

  return baseUrl &&
    rating ? (
    <div
      id='banner'
      style={{
        backgroundImage: baseUrl && topVideo.backdropPath ? `url('${baseUrl + topVideo.backdropPath}')` : "",
      }}
      className='relative w-full aspect-video min-h-[50vh] max-h-[80vh] bg-center bg-cover'
    >
      {children}
      <Link href={topVideo && topVideo.id ? `/movie/${topVideo.id}` : "/"}>
        <div
          id='filter'
          className='absolute top-0 left-0 bottom-0 right-0 text-white pt-headerHeight pb-8 px-4 sm:px-12 w-full bg-linear-to-r from-black/70 from-30% to-black/50 to-100%'
        >
          <div className='flex flex-col justify-end items-center md:items-start gap-2 w-full md:w-3/5 lg:w-2/5 h-full'>
            <div id='title-container' className='flex items-center gap-4 py-2'>
              {/* <h1 className='text-3xl sm:text-5xl font-bold'>{title}</h1> */}
              {logo?.filePath && (
                <Image
                  src={baseUrl + logo.filePath}
                  alt={topVideo.title}
                  className='w-64 rounded'
                  width={256}
                  height={Math.round(256 / (logo.aspectRatio || 1))}
                />
              )}
              {/* {topVideo && topVideo?.id && (
                <Link
                  to={streamUrl + `?video_id=${topVideo.id}&tmdb=1`}
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
                {getYear(topVideo.releaseDate)}
              </span>
            </p>
            <p className='max-h-16 sm:max-h-none overflow-y-hidden text-sm sm:text-base'>
              {topVideo?.description}
            </p>
            <p className='flex flex-wrap gap-2'>
              {topVideo?.genres?.length && topVideo.genres?.map((genreItem, index) => {
                return (
                  <React.Fragment key={index}>
                    <span>{genreItem.name}</span>{" "}
                    {index !== topVideo.genres!.length - 1 && <BsDot size={22} />}
                  </React.Fragment>
                );
              })}
            </p>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div className='relative flex justify-center items-center w-full aspect-video min-h-[50vh] max-h-[80vh] bg-black'>
      <p className='text-white text-xl'>Loading...</p>
    </div>
  );
}

export default Banner;
