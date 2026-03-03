"use client";

import { ContinueWatching } from "@/src/models/prisma/client";
import { removeContinueWatchingVideo } from "@/src/storage/continueWatching";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { twJoin } from "tailwind-merge";

type SizeType = "backdrop" | "poster";

interface Props extends ContinueWatching {
  size?: SizeType;
}

export const ContinueWatchingPoster = ({
  tmdbId,
  type,
  title,
  posterPath,
  backdropPath,
  season,
  episode,
  size = "backdrop",
}: Props) => {
  const router = useRouter();

  return (
    <div
      className={twJoin(
        "relative flex shrink-0 rounded-lg overflow-hidden",
        size === "backdrop"
          ? "w-posterWidth sm:w-posterWidth-desktop aspect-poster sm:aspect-poster-desktop"
          : "w-posterWidth aspect-poster",
      )}
    >
      <button
        onClick={() => router.push(`/${type}/${tmdbId}`)}
        className={twJoin("group relative w-full h-full none-dragable")}
      >
        <div
          style={{
            backgroundImage:
              backdropPath || posterPath
                ? `url('${process.env.NEXT_PUBLIC_IMAGE_URL}/t/p/original${posterPath}')`
                : `url('/images/poster-not-found.png')`,
          }}
          className={twJoin(
            "sm:hidden w-full h-full background-center rounded-lg overflow-hidden transitioning duration-300 group-hover:brightness-50 group-hover:scale-105",
          )}
        />
        <div
          style={{
            backgroundImage:
              backdropPath || posterPath
                ? `url('${process.env.NEXT_PUBLIC_IMAGE_URL}/t/p/original${size === "backdrop" ? backdropPath : posterPath}')`
                : `url('/images/poster-not-found.png')`,
          }}
          className={twJoin(
            "hidden sm:flex w-full h-full background-center rounded-lg overflow-hidden transitioning duration-300 group-hover:brightness-50 group-hover:scale-105",
          )}
        />
        <RxCross2
          className='absolute top-3 right-3 text-[#D7D7D7] border border-[#D7D7D7] rounded-full w-8 h-8 p-2 flex justify-center items-center backdrop-brightness-50 backdrop-blur-md'
          onClick={(e) => {
            e.stopPropagation();
            removeContinueWatchingVideo(tmdbId);
          }}
        />
        <div className='absolute bottom-3 left-3 flex flex-col gap-2'>
          <p className='text-xl font-bold opacity-0 group-hover:opacity-100 transitioning duration-300'>
            {title}
          </p>
          <div className='w-full sm:w-fit text-[#D7D7D7] text-sm sm:text-base border border-[#D7D7D7] rounded-lg p-2 flex justify-center items-center backdrop-brightness-50 backdrop-blur-md'>
            <p>
              <span className='text-white font-bold'>Continue Watching</span>{" "}
              {type === "series" ? `S${season}E${episode}` : ""}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ContinueWatchingPoster;
