"use client";

import { CSSProperties, useEffect, useState } from "react";
import { ProviderInternal, Video, VideoType } from "@/src/models";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import VideosContainer from "@/src/components/ui/VideosContainer";
import PageContainer from "../../ui/PageContainer";
import Poster from "../../ui/Poster";

export const ProviderPageClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const params = useSearchParams();
  const pageParam = params.get("page") || "1";

  const [provider, setProvider] = useState<ProviderInternal | null>(null);
  const [videoType, setVideoType] = useState<VideoType>("movie");
  const [videos, setVideos] = useState<Video[]>([]);
  const [pages, setPages] = useState<number>(1);
  const [pageInput, setPageInput] = useState<string>(pageParam);

  useEffect(() => {
    fetch(`/api/providers/${id}`).then((r) => r.json()).then(setProvider);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const page = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam);
    fetch(`/api/${videoType}/providers/${id}?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.results || []);
        setPages(data.totalPages || 1);
      });
  }, [id, videoType, pageParam]);

  useEffect(() => {
    setPageInput(pageParam);
  }, [pageParam]);

  const changePage = (page: number) => {
    if (!page || page > pages) return;
    router.push(`/providers/${id}?type=${videoType}&page=${page}`);
  };

  const goBackPage = () => {
    const current = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam);
    const prev = current > 1 ? current - 1 : 1;
    router.push(`/providers/${id}?type=${videoType}&page=${prev}`);
  };

  const goNextPage = () => {
    const current = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam);
    const next = current < pages ? current + 1 : pages;
    router.push(`/providers/${id}?type=${videoType}&page=${next}`);
  };

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
          <button onClick={() => setVideoType("movie")} className={twJoin("px-3 py-1.5 rounded-lg cursor-pointer", videoType === "movie" && "bg-[#767676]")}>Movie</button>
          <button onClick={() => setVideoType("series")} className={twJoin("px-3 py-1.5 rounded-lg cursor-pointer", videoType === "series" && "bg-[#767676]")}>Series</button>
        </div>
      </div>

      {videoType && id && (
        <VideosContainer wrap>
          {videos.map((video) => (
            <Poster key={video.id} {...video} size="poster" />
          ))}
        </VideosContainer>
      )}

      <div className="w-full flex justify-center items-center gap-4">
        <button className="w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]" onClick={goBackPage}>
          <FaChevronLeft className="text-xl" />
        </button>
        <div className="flex justify-center items-center gap-1">
          <input
            type="text"
            value={pageInput}
            onChange={(e) => setPageInput(e.currentTarget.value)}
            onKeyPress={(e) => e.key === "Enter" && changePage(parseInt(pageInput))}
            onBlur={() => changePage(parseInt(pageInput))}
            className="w-fit max-w-6 focus:border-white/35"
          />
          /<span>{pages}</span>
        </div>
        <button className="w-8 h-8 flex justify-center items-center rounded-lg bg-[#202020]" onClick={goNextPage}>
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </PageContainer>
  );
}

export default ProviderPageClient;
