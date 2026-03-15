"use client";

import { useMemo, useState } from "react";
import VideosContainer from "@/src/components/ui/VideosContainer";
import { VideoType } from "@/src/models";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { twJoin } from "tailwind-merge";
import PageContainer from "@/src/components/ui/PageContainer";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchPageClient = () => {
  const router = useRouter();
  const params = useSearchParams();
  // const [videoType, setVideoType] = useState<VideoType | string>("multi");
  const query = useMemo<string>(() => {
    const queryParam = params.get("query") || "";
    return decodeURIComponent(queryParam);
  }, [params]);
  const type = params.get("type") || "multi";

  const changeType = (type: VideoType) => {
    router.push(`/search?query=${query}&type=${type}`);
  };

  return (
    <PageContainer className="flex flex-col gap-6 pt-12 sm:pt-20">
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
            onClick={() => changeType("multi")}
            className={twJoin(
              "px-3 py-1.5 rounded-lg cursor-pointer",
              type === "multi" && "bg-[#767676]",
            )}
          >
            All
          </button>
          <button
            onClick={() => changeType("movie")}
            className={twJoin(
              "px-3 py-1.5 rounded-lg cursor-pointer",
              type === "movie" && "bg-[#767676]",
            )}
          >
            Movie
          </button>
          <button
            onClick={() => changeType("series")}
            className={twJoin(
              "px-3 py-1.5 rounded-lg cursor-pointer",
              type === "series" && "bg-[#767676]",
            )}
          >
            Series
          </button>
        </div>
      </div>

      {query && (
        <VideosContainer
          fetchPath={`/api/search?query=${query}${['movie', 'series'].includes(type) ? `&type=${type}` : ""}`}
          title=''
          wrap
        />
      )}
    </PageContainer>
  );
}

export default SearchPageClient;