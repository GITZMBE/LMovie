'use client';

import { VideoContinueWatching } from "@/src/models";
import { removeContinueWatchingVideo } from "@/src/storage/continueWatching";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { twJoin } from "tailwind-merge";

type SizeType = 'backdrop' | 'poster';

interface Props extends VideoContinueWatching {
  size?: SizeType;
};

export const ContinueWatchingPoster = ({ id, type, title, posterPath, backdropPath, season, episode, size = 'backdrop' }: Props) => {
  return (
    <div 
      className={twJoin('relative flex shrink-0 rounded-lg overflow-hidden', size === 'backdrop' ? 'w-posterWidth-desktop aspect-poster-desktop' : 'w-posterWidth aspect-poster')}
    >
      <Link
        href={`/${type}/${id}`}
        className={twJoin('group relative w-full h-full none-dragable')}
      >
        <div
          style={{
            backgroundImage: backdropPath || posterPath
              ? `url('${process.env.NEXT_PUBLIC_BASE_URL}/t/p/original${size === 'backdrop' ? backdropPath : posterPath}')`
              : `url('/images/poster-not-found.png')`,
          }}
          className={twJoin('w-full h-full background-center rounded-lg overflow-hidden transitioning duration-300 hover:brightness-50 hover:scale-105')}
        >
          
        </div>
        <RxCross2 className='absolute top-3 right-3 text-[#D7D7D7] border border-[#D7D7D7] rounded-full w-8 h-8 p-2 flex justify-center items-center backdrop-brightness-50 backdrop-blur-md' onClick={(e) => {e.stopPropagation(); removeContinueWatchingVideo(id)}} />
        <div className="absolute bottom-3 left-3 flex flex-col gap-2">
          <p className="text-xl font-bold opacity-0 group-hover:opacity-100 transitioning duration-300">{title}</p>
          <div className='text-[#D7D7D7] border border-[#D7D7D7] rounded-lg p-2 flex justify-center items-center backdrop-brightness-50 backdrop-blur-md'>
            <p><span className="text-white font-bold">Continue Watching</span> {type === 'series' ? `S${season}E${episode}` : ''}</p>
          </div>          
        </div>
      </Link>          
    </div>
  )
}

export default ContinueWatchingPoster;