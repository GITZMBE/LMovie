'use client';

import { twJoin } from "tailwind-merge";
import VideosContainer from "../../ui/VideosContainer";
import { useEffect, useState } from "react";
import { VideoType } from "@/src/models";
import { useParams } from "next/navigation";
import PageContainer from "../../ui/PageContainer";
import { Person } from "@/src/models/Person";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import Image from "next/image";

export const PersonPageClient = () => {
  const { id } = useParams<{ id: string }>()
  const [person, setPerson] = useState<Person | null>(null);
  const [videoType, setVideoType] = useState<VideoType>('movie');
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL + "/t/p/original";

  useEffect(() => {
    fetch(`/api/person/${id}`).then(r => r.json()).then(setPerson);
  }, [id]);

  return (
    <PageContainer className="flex flex-col gap-6 pt-12 sm:pt-20">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]">
            <FaChevronLeft className="text-xl" />
          </Link>
          {person && (
            <>
              <div className="w-12 h-12 min-w-12 min-h-12 flex justify-center items-center rounded-full overflow-hidden border border-(--brand) bg-(--brand)/50">
                <Image
                  src={
                    person.profilePath
                      ? baseUrl + person.profilePath
                      : "https://www.blunttech.com/storage/blunttech/no-image-available.png"
                  }
                  className='w-full h-full aspect-square image-center'
                  width={48}
                  height={48}
                  alt=''                
                />
              </div>
              <h1 className='text-xl sm:text-3xl font-bold text-white'>{person?.name}</h1>              
            </>
          )}
        </div>
        <div className="flex items-center gap-4 p-1 bg-[#202020] rounded-lg">
          <button onClick={() => setVideoType('movie')} className={twJoin("px-3 py-1.5 rounded-lg cursor-pointer", videoType === 'movie' && "bg-[#767676]")}>Movie</button>
          <button onClick={() => setVideoType('series')} className={twJoin("px-3 py-1.5 rounded-lg cursor-pointer", videoType === 'series' && "bg-[#767676]")}>Series</button>
        </div>
      </div>
      {videoType && id && (
        <VideosContainer fetchPath={`/api/${videoType}/person/${id}`} wrap />
      )}
    </PageContainer>
  )
};

export default PersonPageClient;