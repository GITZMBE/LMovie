'use client';

import PageContainer from "@/src/components/ui/PageContainer";
// import ProtectedAuthentication from "@/src/components/ui/auth/ProtectedAuthentication";
import VideosContainer from "@/src/components/ui/VideosContainer";
import { Genre } from "@/src/models";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { twJoin } from "tailwind-merge";

export const GenrePage = () => {
  const {id} = useParams<{id: string}>();
  const [videoType, setVideoType] = useState("movie");
  const [genre, setGenre] = useState<Genre | null>(null);

  useEffect(() => {
    fetch(`/api/genres`, { 
      method: "POST", 
      body: JSON.stringify({ genreIds: [+id] }),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(data => {console.log(data); setGenre(data[0])});
  }, [id, videoType]);
  
  return (
    // <ProtectedAuthentication>
    <PageContainer>
       <div className='w-full min-h-screen py-20 px-12 space-y-4 bg-primary text-white'>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]">
              <FaChevronLeft className="text-xl" />
            </Link>
            <h1 className='text-2xl font-semibold text-white'>
              {genre?.name}
            </h1>
          </div>
          <div className="flex items-center gap-4 p-1 bg-[#202020] rounded-lg">
            <button onClick={() => setVideoType('movie')} className={twJoin("px-3 py-1.5 rounded-lg cursor-pointer", videoType === 'movie' && "bg-[#767676]")}>Movie</button>
            <button onClick={() => setVideoType('series')} className={twJoin("px-3 py-1.5 rounded-lg cursor-pointer", videoType === 'series' && "bg-[#767676]")}>Series</button>
          </div>
        </div>
        {videoType && id && (
          <VideosContainer fetchPath={`/api/genres/${videoType}/${id}`} wrap />
        )}
      </div>
    </PageContainer>
    // </ProtectedAuthentication>
  );
}

export default GenrePage;
