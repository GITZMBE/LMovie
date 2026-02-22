'use client';

import { CSSProperties, useEffect, useState } from "react";
import { ProviderInternal, VideoType } from "@/src/models";
import { useParams } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import VideosContainer from "@/src/components/ui/VideosContainer";

export const ProviderPage = () => {
  const { id } = useParams<{ id: string }>()
  const [provider, setProvider] = useState<ProviderInternal | null>(null);
  const [videoType, setVideoType] = useState<VideoType>('movie');

  useEffect(() => {
    fetch(`/api/providers/${id}`).then(r => r.json()).then(setProvider);
  }, [id]);

  return (
    <div id='moviePoster'>
      <div className='w-full min-h-screen py-20 px-12 space-y-4 bg-primary text-white'>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]">
              <FaChevronLeft className="text-xl" />
            </Link>
            {provider && (
              <>
                <div style={{ "--brand": provider?.brandHexColor } as CSSProperties} className="w-12 h-12 flex justify-center items-center p-2 rounded-lg border border-(--brand) bg-(--brand)/50">
                  <Image src={provider?.imagePath ?? ""} alt={provider?.name ?? ""} width={48} height={48} />
                </div>
                <h1 className='text-3xl font-bold text-white'>{provider?.name}</h1>              
              </>
            )}
          </div>
          <div className="flex items-center gap-4 p-1 bg-[#202020] rounded-lg">
            <button onClick={() => setVideoType('movie')} className={twJoin("px-3 py-1.5 rounded-lg cursor-pointer", videoType === 'movie' && "bg-[#767676]")}>Movie</button>
            <button onClick={() => setVideoType('series')} className={twJoin("px-3 py-1.5 rounded-lg cursor-pointer", videoType === 'series' && "bg-[#767676]")}>Series</button>
          </div>
        </div>
        {videoType && id && (
          <VideosContainer fetchPath={`/api/${videoType}/providers/${id}`} wrap />
        )}
      </div>
    </div>
  );
}

export default ProviderPage;
