"use client";

import { useMemo, useState } from "react";
import VideosContainer from "@/src/components/ui/VideosContainer";
import { VideoType } from "@/src/models";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { twJoin } from "tailwind-merge";
import PageContainer from "@/src/components/ui/PageContainer";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const [videoType, setVideoType] = useState<VideoType | string>("");
  const query = useMemo<string>(() => {
    const queryParam = params.get("query") || "";
    return decodeURIComponent(queryParam);
  }, [params]);

  return (
    <PageContainer className="flex flex-col gap-6">
      <div className='flex justify-between items-center gap-2'>
        <div className='flex items-center gap-4'>
          <Link
            href='/dashboard'
            className='w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]'
          >
            <FaChevronLeft className='text-xl' />
          </Link>
          <h1 className='text-2xl font-semibold text-white'>
            Results for &quot;{query}&quot;
          </h1>
        </div>
        <div className='flex items-center gap-4 p-1 bg-[#202020] rounded-lg'>
          <button
            onClick={() => setVideoType("")}
            className={twJoin(
              "px-3 py-1.5 rounded-lg cursor-pointer",
              videoType === "" && "bg-[#767676]",
            )}
          >
            All
          </button>
          <button
            onClick={() => setVideoType("movie")}
            className={twJoin(
              "px-3 py-1.5 rounded-lg cursor-pointer",
              videoType === "movie" && "bg-[#767676]",
            )}
          >
            Movie
          </button>
          <button
            onClick={() => setVideoType("series")}
            className={twJoin(
              "px-3 py-1.5 rounded-lg cursor-pointer",
              videoType === "series" && "bg-[#767676]",
            )}
          >
            Series
          </button>
        </div>
      </div>

      {query && (
        <VideosContainer
          fetchPath={`/api/search?query=${query}${videoType ? `&type=${videoType}` : ""}`}
          title=''
          wrap
        />
      )}
    </PageContainer>
  );
}
