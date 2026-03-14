'use client';

import { CSSProperties, useEffect, useState } from "react";
import { ProviderInternal, VideoType } from "@/src/models";
import { useParams } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import VideosContainer from "@/src/components/ui/VideosContainer";
import PageContainer from "../../ui/PageContainer";

export const ProviderPageClient = () => {
  const { id } = useParams<{ id: string }>()
  const [provider, setProvider] = useState<ProviderInternal | null>(null);
  const [videoType, setVideoType] = useState<VideoType>('movie');

  useEffect(() => {
    fetch(`/api/providers/${id}`).then(r => r.json()).then(setProvider);
  }, [id]);

  return (
    <PageContainer className="flex flex-col gap-6 pt-12 sm:pt-20">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]">
            <FaChevronLeft className="text-xl" />
          </Link>
          {provider && (
            <>
              <div style={{ "--brand": provider?.brandHexColor } as CSSProperties} className="w-12 h-12 min-w-12 min-h-12 flex justify-center items-center p-2 rounded-lg border border-(--brand) bg-(--brand)/50">
                <Image src={provider?.imagePath ?? ""} alt={provider?.name ?? ""} width={48} height={48} />
              </div>
              <h1 className='text-xl sm:text-3xl font-bold text-white'>{provider?.name}</h1>              
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
    </PageContainer>
  );
}

export default ProviderPageClient;
