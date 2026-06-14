"use client";

import PageContainer from "@/src/components/ui/PageContainer";
import VideosContainer from "@/src/components/ui/VideosContainer";
import { Genre, Video } from "@/src/models";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { twJoin } from "tailwind-merge";
import Poster from "../../ui/Poster";

export const GenrePageClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const params = useSearchParams();
  const pageParam = params.get("page") || "1";
  const [videoType, setVideoType] = useState("movie");
  const [genre, setGenre] = useState<Genre | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [pages, setPages] = useState<number>(1);

  useEffect(() => {
    fetch(`/api/genres`, {
      method: "POST",
      body: JSON.stringify({ genreIds: [+id] }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGenre(data[0]);
      });
  }, [id, videoType]);

  useEffect(() => {
    if (!id) return;
    const page = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam);
    fetch(`/api/genres/${videoType}/${id}?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.results || []);
        setPages(data.totalPages || 1);
      });
  }, [id, videoType, pageParam]);

  const changePage = (page: number) => {
    if (!page || page > pages) return;
    router.push(`/genres/${id}?type=${videoType}&page=${page}`);
  };

  const goBackPage = () => {
    const current = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam);
    const prev = current - 1 ? current - 1 : 1;
    router.push(`/genres/${id}?type=${videoType}&page=${prev}`);
  };

  const goNextPage = () => {
    const current = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam);
    router.push(`/genres/${id}?type=${videoType}&page=${current + 1}`);
  };

  return (
    <PageContainer className='flex flex-col gap-6'>
      <div className='w-full min-h-screen py-20 px-12 space-y-4 bg-primary text-white'>
        <div className='flex justify-between items-center gap-2'>
          <div className='flex items-center gap-4'>
            <Link
              href='/dashboard'
              className='w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]'
            >
              <FaChevronLeft className='text-xl' />
            </Link>
            <h1 className='text-2xl font-semibold text-white'>{genre?.name}</h1>
          </div>
          <div className='flex items-center gap-4 p-1 bg-[#202020] rounded-lg'>
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
        {videoType && id && (
          <VideosContainer wrap>
            {videos.map((video) => (
              <Poster key={video.id} {...video} size='poster' />
            ))}
          </VideosContainer>
        )}

        <div className='w-full flex justify-center items-center gap-4'>
          <button
            className='w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]'
            onClick={goBackPage}
          >
            <FaChevronLeft className='text-xl' />
          </button>
          <div className='flex justify-center items-center gap-1'>
            <input
              type='text'
              onKeyPress={(e) =>
                e.key === "Enter" && changePage(parseInt(e.currentTarget.value))
              }
              onBlur={(e) => changePage(parseInt(e.target.value))}
              defaultValue={pageParam}
              className='w-fit max-w-6 focus:border-white/35'
            />
            /<span>{pages}</span>
          </div>
          <button
            className='w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]'
            onClick={goNextPage}
          >
            <FaChevronRight className='text-xl' />
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default GenrePageClient;
