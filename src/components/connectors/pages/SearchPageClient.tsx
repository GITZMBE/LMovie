"use client";

import { useEffect, useMemo, useState } from "react";
import VideosContainer from "@/src/components/ui/VideosContainer";
import { Video, VideoType } from "@/src/models";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { twJoin } from "tailwind-merge";
import PageContainer from "@/src/components/ui/PageContainer";
import { useRouter, useSearchParams } from "next/navigation";
import Poster from "../../ui/Poster";

export const SearchPageClient = () => {
  const router = useRouter();
  const params = useSearchParams();
  const query = useMemo<string>(() => {
    const queryParam = params.get("query") || "";
    return decodeURIComponent(queryParam);
  }, [params]);
  const type = params.get("type") || "multi";
  const page = params.get("page") || "1";
  const [videos, setVideos] = useState<Video[]>([]);
  const [pages, setPages] = useState<number>(1);

  const changeType = (type: VideoType) => {
    router.push(`/search?query=${query}&type=${type}&page=1`);
  };

  const changePage = (page: number) => {
    if (!page || page > pages) return;
    router.push(`/search?query=${query}&type=${type}&page=${page}`);
  };

  const goBackPage = () => {
    router.push(`/search?query=${query}&type=${type}&page=${parseInt(page) - 1 ? parseInt(page) - 1 : 1}`);
  };

  const goNextPage = () => {
    router.push(`/search?query=${query}&type=${type}&page=${parseInt(page) + 1}`);
  };

  useEffect(() => {
    fetch(`/api/search?query=${query}&type=${type}&page=${page}`).then(r => r.json()).then(t => {
      setVideos(t.results);
      setPages(t.totalPages);
    });
  }, [query, type, page]);

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
          // fetchPath={`/api/search?query=${query}${['movie', 'series'].includes(type) ? `&type=${type}` : ""}`}
          // title=''
          wrap
        >
          {videos.map((video) => (
            <Poster key={video.id} {...video} size="poster" />
          ))}
        </VideosContainer>
      )}

      <div className="w-full flex justify-center items-center gap-4">
        <button
          className='w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]'
          onClick={goBackPage}
        >
          <FaChevronLeft className="text-xl" />
        </button>        
        <div className="flex justify-center items-center gap-1">
          <input 
            type="text" 
            onKeyPress={e => e.key === 'Enter' && changePage(parseInt(e.currentTarget.value))} 
            onBlur={e => changePage(parseInt(e.target.value))}
            defaultValue={page}
            className="w-fit max-w-6 focus:border-white/35"
          />
          {/* <span>{page}</span> */}
          /
          <span>{pages}</span>
        </div>
        <button
          className='w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]'
          onClick={goNextPage}
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </PageContainer>
  );
}

export default SearchPageClient;