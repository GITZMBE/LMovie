import { useMemo } from "react";
import { useState, useEffect } from "react";
import { getYear, twoDigitRating } from "../../utils";
import { saveFavoriteVideos } from "../../storage";
import { useToast } from "../../hooks";
import type { Genre, Video } from "../../models";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { favoriteMoviesState, watchlistState } from "@/src/states";
import { useStore } from "@nanostores/react";
import RatingCircle from "./RatingCircle";
import NetflixPreviewCard from "./NetflixPreviewCard";
import { HoverPreview } from "./HoverPreview";
import { FaBookmark, FaCheck, FaPlay, FaPlus, FaRegBookmark } from "react-icons/fa";
import { saveWatchlist } from "@/src/storage/watchlist";

type SizeType = 'backdrop' | 'poster';

interface Props extends Video {
  size?: SizeType;
}

export const Poster = ({
  id,
  type,
  title,
  description,
  posterPath,
  backdropPath,
  releaseDate,
  rating,
  genreIds,
  genres,
  size = 'backdrop',
}: Props) => {
  const { showToast } = useToast();
  const favorites = useStore(favoriteMoviesState);
  const watchlist = useStore(watchlistState);

  const isFavorite = useMemo(
    () => favorites?.some((favorite) => favorite.id === id),
    [favorites, id],
  );

  const isWatchlisted = useMemo(
    () => watchlist?.some((video) => video.id === id),
    [watchlist, id],
  );

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const addToFavorites = () => {
    if (isFavorite) return showToast("Already in favorites!", "info");

    const movieObject = {
      id,
      type,
      title,
      posterPath,
      backdropPath,
      releaseDate,
      rating,
      genreIds,
    } as Video;
    favoriteMoviesState.set([...(favorites ?? []), movieObject]);
    saveFavoriteVideos([...(favorites ?? []), movieObject]);

    showToast("Added to favorites!", "success");
  };
  const removeFromFavorites = () => {
    if (!isFavorite) return showToast("Not in favorites!", "info");

    favoriteMoviesState.set(
      favorites.filter((favorite) => favorite.id !== id),
    );
    saveFavoriteVideos(favorites.filter((favorite) => favorite.id !== id));
    showToast("Removed from favorites!", "success");
  };

  const addToWatchlist = () => {
    if (isWatchlisted) return showToast("Already in watchlist!", "info");

    const movieObject = {
      id,
      type,
      title,
      posterPath,
      backdropPath,
      releaseDate,
      rating,
      genreIds,
    } as Video;
    watchlistState.set([...(watchlist ?? []), movieObject]);
    saveWatchlist([...(watchlist ?? []), movieObject]);

    showToast("Added to watchlist!", "success");
  };
  const removeFromWatchlist = () => {
    if (!isWatchlisted) return showToast("Not in watchlist!", "info");

    watchlistState.set(
      watchlist.filter((video) => video.id !== id),
    );
    saveWatchlist(watchlist.filter((video) => video.id !== id));
    showToast("Removed from watchlist!", "success");
  };

  return (
    <div className="flex flex-col">
      <HoverPreview
        delay={1000}
        preview={
          <NetflixPreviewCard
            rating={`${twoDigitRating(rating * 10)}%`}
            year={getYear(releaseDate)}
            description={description}
            imagePath={backdropPath}
            genres={genres}
          >
            <Link href={`/${type}/${id}`} className="flex justify-center items-center gap-1 bg-white text-black px-3 py-1.5 rounded-lg grow cursor-pointer">
              <FaPlay />
              <span>Play</span>
            </Link>
            {!isFavorite ? (
              <button onClick={addToFavorites} className="p-2 aspect-square rounded-lg bg-[#202020] border border-[#D7D7D7] text-[#D7D7D7] cursor-pointer">
                <FaPlus />
              </button>
            ) : (
              <button onClick={removeFromFavorites} className="p-2 aspect-square rounded-lg bg-[#202020] border border-green text-green cursor-pointer">
                <FaCheck />
              </button>
            )}
            {!isWatchlisted ? (
              <button onClick={addToWatchlist} className="p-2 aspect-square rounded-lg bg-[#202020] border border-[#D7D7D7] text-[#D7D7D7] cursor-pointer">
                <FaRegBookmark />
              </button>
            ) : (
              <button onClick={removeFromWatchlist} className="p-2 aspect-square rounded-lg bg-[#202020] border border-white text-white cursor-pointer">
                <FaBookmark />
              </button>
            )}
          </NetflixPreviewCard>
        }
      >
        <div 
          className={twJoin('relative flex shrink-0 rounded-lg', size === 'backdrop' ? 'w-posterWidth-desktop aspect-poster-desktop' : 'w-posterWidth aspect-poster')}
        >
          <Link
            href={`/${type}/${id}`}
            onClick={handleClick}
            className={twJoin('w-full h-full none-dragable')}
          >
            <div
              style={{
                backgroundImage: backdropPath || posterPath
                  ? `url('${process.env.NEXT_PUBLIC_BASE_URL}/t/p/original${size === 'backdrop' ? backdropPath : posterPath}')`
                  : `url('/images/poster-not-found.png')`,
              }}
              className={twJoin('group relative w-full h-full background-center rounded-lg overflow-hidden transitioning')}
            >
              <RatingCircle rating={rating} className='absolute top-3 left-3' />
            </div>
          </Link>          
        </div>
      </HoverPreview>

      <span className={twJoin('mt-1 ml-1 text-sm font-medium truncate', size === 'backdrop' ? 'max-w-posterWidth-desktop' : 'max-w-posterWidth')}>{title}</span>
    </div>
  );
};

export default Poster;
