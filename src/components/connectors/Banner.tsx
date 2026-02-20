import React, { useEffect, useState } from "react";
// import { AiFillPlayCircle } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { fetchGenres, fetchLogo } from "../../api/fetch";
import { getYear, twoDigitRating } from "../../utils";
import { Genre, Logo, Video } from "../../models";
import Link from "next/link";

interface Props {
  topVideo: Video ;
  children?: React.ReactNode;
}

function Banner({ topVideo, children }: Props) {
  const [genresList, setGenresList] = useState<Genre[]>([]);
  const [logo, setLogo] = useState<Logo | null>(null);
  useEffect(() => {
    fetchGenres().then(setGenresList);
  }, []);
  useEffect(() => {
    fetchLogo(topVideo.id, 'movie').then(setLogo);
  }, [topVideo]);

  // const { vote_average, release_date, ...rest } = topVideo || { backdrop_path: '', title: '', vote_average: '', release_date: '', overview: '', genre_ids: [] };
  // const movie = { vote_average: twoDigitRating(topVideo.vote_average * 10), release_date: getYear(topVideo.release_date), ...rest };
  // const { backdrop_path, title, vote_average, release_date, overview, genre_ids } = movie;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL + "/t/p/w1280";
  // const streamUrl = "https://multiembed.mov/";
  const url = topVideo.backdropPath ?? "";
  const title = topVideo && topVideo.title ? topVideo.title : "";
  const rating = twoDigitRating(
    topVideo && topVideo.rating ? topVideo.rating * 10 : 0,
  );
  const releaseDate = getYear(
    topVideo && topVideo.releaseDate ? topVideo.releaseDate : "",
  );
  const { description: synopsis = '', genreIds = [] } = topVideo;

  return (
    <div
      id='banner'
      style={{
        backgroundImage: baseUrl && url ? `url('${baseUrl + url}')` : "",
      }}
      className='relative w-full aspect-video min-h-[50vh] max-h-[80vh] bg-center bg-cover'
    >
      {children}
      <Link href={topVideo && topVideo.id ? `/movie/${topVideo.id}` : "/"}>
        <div
          id='filter'
          className='absolute top-0 left-0 bottom-0 right-0 text-white pt-headerHeight pb-8 px-4 sm:px-12 w-full bg-linear-to-r from-black from-30% opacity-90'
        >
          <div className='hidden xs:flex flex-col justify-center gap-2  md:w-3/5 lg:w-2/5 h-full'>
            <div id='title-container' className='flex items-center gap-4 py-2'>
              {/* <h1 className='text-3xl sm:text-5xl font-bold'>{title}</h1> */}
              {logo?.filePath && (
                <img
                  src={baseUrl + logo.filePath}
                  alt={title}
                  className='w-64 rounded'
                  style={{ aspectRatio: logo.aspectRatio }}
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
                HD
              </span>
              <span className='px-1 sm:px-2 py-0.5 sm:py-1 text-sm sm:text-base rounded bg-gray-800'>
                {releaseDate}
              </span>
            </p>
            <p className='max-h-16 sm:max-h-none overflow-y-hidden text-sm sm:text-base'>
              {synopsis}
            </p>
            <p className='flex flex-wrap gap-2'>
              {Object.keys(genreIds).length > 0
                ? genreIds.map((genreId, index) =>
                    genresList.map((genreItem) =>
                      genreId === genreItem.id ? (
                        <React.Fragment key={index}>
                          <span>{genreItem.name}</span>{" "}
                          {index !== genreIds.length - 1 && <BsDot size={22} />}
                        </React.Fragment>
                      ) : null,
                    ),
                  )
                : null}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Banner;
