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
import { twJoin } from "tailwind-merge";

type TextSize = 'small' | 'large';
type Variant = 'primary' | 'secondary';

interface Props {
  variant?: Variant;
  textSize?: TextSize;
  video: Video;
};

export const ToggleWatchlistButton = ({ variant = 'primary', textSize = 'small', video }: Props) => {
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

  return (textSize === 'small') ? (
    !isWatchlisted ? (
      <button
        onClick={addToWatchlist}
        className={twJoin('p-2 aspect-square rounded-lg cursor-pointer', 
          variant === "primary" 
            ? "bg-white text-black" 
            : "border border-tertiary text-white backdrop-blur-sm backdrop-brightness-50",
        )}
      >
        <FaRegBookmark />
      </button>
    ) : (
      <button
        onClick={removeFromWatchlist}
        className={twJoin('p-2 aspect-square rounded-lg cursor-pointer', 
          variant === "primary" 
            ? "bg-white text-black" 
            : "border border-tertiary text-white backdrop-blur-sm backdrop-brightness-50",
        )}
      >
        <FaBookmark />
      </button>
    )
  ) : (
    !isWatchlisted ? (
      <button
        onClick={addToWatchlist}
        className={twJoin('flex gap-2 items-center py-1.5 px-3 rounded-lg cursor-pointer', 
          variant === "primary" 
            ? "bg-white text-black" 
            : "border border-tertiary text-white backdrop-blur-sm backdrop-brightness-50",
        )}
      >
        <FaPlus />
        <span className="sm:hidden">List</span>
        <span className="hidden sm:inline">Watchlist</span>
      </button>
    ) : (
      <button
        onClick={removeFromWatchlist}
        className={twJoin('flex gap-2 items-center py-1.5 px-3 rounded-lg cursor-pointer', 
          variant === "primary" 
            ? "bg-white text-black" 
            : "border border-tertiary text-white backdrop-blur-sm backdrop-brightness-50",
        )}
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