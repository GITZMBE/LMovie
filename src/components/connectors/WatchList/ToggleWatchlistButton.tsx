'use client';

import { useToast } from "@/src/hooks";
import { Video } from "@/src/models";
import { WatchlistDTO } from "@/src/models/watchlist";
import { watchlistState } from "@/src/states";
import { removeWatchlist, saveWatchlist } from "@/src/storage/watchlist";
import { useStore } from "@nanostores/react";
import { useMemo } from "react";
import { FaBookmark, FaCheck, FaPlus, FaRegBookmark } from "react-icons/fa";
import { ImCross } from "react-icons/im";

type Variant = 'small' | 'large';

interface Props {
  variant?: Variant;
  video: Video;
};

export const ToggleWatchlistButton = ({ variant = 'small', video }: Props) => {
  const { showToast } = useToast();
  const watchlist = useStore(watchlistState);

  const isWatchlisted = useMemo(
      () => watchlist?.some((item) => item.tmdbId === video.id),
      [watchlist, video.id],
    );

  const addToWatchlist = async () => {
      if (isWatchlisted) return showToast("Already in watchlist!", "info");
  
      const movieObject = {
        tmdbId: video.id,
        type: video.type,
        title: video.title,
        posterPath: video.posterPath,
        backdropPath: video.backdropPath,
        releaseDate: video.releaseDate,
        rating: video.rating,
        genreIds: video.genreIds,
      } as WatchlistDTO;
  
      const savedVideo = await saveWatchlist(movieObject);
      watchlistState.set([...(watchlist ?? []), savedVideo]);
  
      showToast("Added to watchlist!", "success");
    };
    const removeFromWatchlist = async () => {
      if (!isWatchlisted) return showToast("Not in watchlist!", "info");
  
      const { tmdbId } = await removeWatchlist(video.id, video.type);
      watchlistState.set(watchlist.filter((video) => video.tmdbId != tmdbId));
  
      showToast("Removed from watchlist!", "success");
    };

  return (variant === 'small') ? (
    !isWatchlisted ? (
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
    )
  ) : (
    !isWatchlisted ? (
      <button
        onClick={addToWatchlist}
        className='flex gap-2 items-center py-1.5 px-3 rounded-lg bg-[#202020] border border-[#D7D7D7] text-[#D7D7D7] cursor-pointer'
      >
        <FaPlus />
        <span className="sm:hidden">List</span>
        <span className="hidden sm:inline">Watchlist</span>
      </button>
    ) : (
      <button
        onClick={removeFromWatchlist}
        className='group flex gap-2 items-center py-1.5 px-3 rounded-lg bg-[#202020] border border-white text-white cursor-pointer'
      >
        <FaCheck className="group-hover:hidden" />
        <ImCross className="hidden group-hover:inline" />
        <span className="sm:hidden">List</span>
        <span className="hidden sm:inline">Watchlist</span>
      </button>
    )
  )
};

export default ToggleWatchlistButton;