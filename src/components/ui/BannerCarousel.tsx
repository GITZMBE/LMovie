'use client';

import React, { useEffect, useMemo, useState } from "react";
import { BsDot } from "react-icons/bs";
import Image from "next/image";
import { getYear, twoDigitRating } from "../../utils";
import { Logo, Video } from "../../models";
import { useRouter } from "next/navigation";

interface Props {
  videos: Video[];
  children?: React.ReactNode;
}

const SLIDE_DURATION = 6000;

function BannerCarousel({ videos, children }: Props) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL + "/t/p/original";

  const [index, setIndex] = useState(0);
  const [logos, setLogos] = useState<Record<number, Logo | null>>({});
  const [paused, setPaused] = useState(false);

  const video = videos[index];

  const rating = useMemo(
    () => twoDigitRating(video?.rating ? video.rating * 10 : 0),
  [video]);

  /* ---------------- Fetch Logos ---------------- */

  useEffect(() => {
    const loadLogos = async () => {
      const newLogos: Record<number, Logo | null> = {};

      await Promise.all(
        videos.map(async (v) => {
          if (v.logo) {
            newLogos[v.id] = v.logo;
            return;
          }

          try {
            const res = await fetch(`/api/${v.type}/${v.id}/logo`);
            newLogos[v.id] = await res.json();
          } catch {
            newLogos[v.id] = null;
          }
        })
      );

      setLogos(newLogos);
    };

    loadLogos();
  }, [videos]);

  /* ---------------- Carousel Rotation ---------------- */

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [paused, videos.length]);

  if (!videos.length || !baseUrl) return null;

  return (
    <div
      className="relative w-full aspect-video min-h-[50vh] max-h-[80vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {children}

      {/* Slides */}

      {videos.map((v, i) => {
        const active = i === index;
        const logo = v.logo || logos[v.id];

        return (
          <div
            key={v.id}
            style={{
              backgroundImage: v.backdropPath
                ? `url('${baseUrl + v.backdropPath}')`
                : "",
            }}
            className={`
              absolute inset-0 bg-center bg-cover
              transition-opacity duration-700
              ${active ? "opacity-100 z-10" : "opacity-0"}
            `}
          >
            <button
              onClick={() => router.push(`/movie/${v.id}`)}
              className="w-full h-full"
            >
              <div className="absolute inset-0 text-white pt-headerHeight pb-8 px-4 sm:px-12 bg-linear-to-r from-black/70 from-30% to-black/50">
                <div className="flex flex-col justify-end items-center md:items-start gap-2 w-full md:w-3/5 lg:w-2/5 h-full">

                  {/* Logo */}

                  <div className="flex items-center gap-4 py-2">
                    {logo?.filePath && (
                      <>
                        <Image
                          src={baseUrl + logo.filePath}
                          alt={v.title}
                          width={192}
                          height={Math.round(192 / (logo.aspectRatio || 1))}
                          className="hidden md:block"
                        />
                        <Image
                          src={baseUrl + logo.filePath}
                          alt={v.title}
                          width={128}
                          height={Math.round(128 / (logo.aspectRatio || 1))}
                          className="md:hidden"
                        />
                      </>
                    )}
                  </div>

                  {/* Rating + Year */}

                  <p className="space-x-2 font-bold text-white text-sm uppercase">
                    <span className="px-2 py-1 rounded bg-green-600">
                      {rating} %
                    </span>

                    <span className="px-2 py-1 rounded bg-gray-800">
                      {getYear(v.releaseDate)}
                    </span>
                  </p>

                  {/* Genres */}

                  <p className="flex flex-wrap gap-2 text-gray-400">
                    {v.genres?.map((genre, gi) => (
                      <React.Fragment key={genre.id}>
                        <span>{genre.name}</span>
                        {gi !== v.genres!.length - 1 && <BsDot size={22} />}
                      </React.Fragment>
                    ))}
                  </p>

                  {/* Description */}

                  <p className="max-h-16 md:max-h-none overflow-hidden text-sm md:text-base text-center md:text-start">
                    {v.description}
                  </p>
                </div>
              </div>
            </button>
          </div>
        );
      })}

      {/* Progress Bars */}

      <div className="absolute bottom-4 right-4 md:right-6 flex gap-1 z-20 md:justify-end justify-center w-full md:w-auto px-4 md:px-0">
        {videos.map((_, i) => {
          const isPast = i < index;
          const isActive = i === index;

          return (
            <div
              key={i}
              onClick={(e) => {e.stopPropagation(); setIndex(i)}}
              className="w-8 h-1 bg-white/30 overflow-hidden rounded cursor-pointer"
            >
              <div
                className={`
                  h-full
                  ${isPast ? "w-full bg-white" : ""}
                  ${isActive ? "bg-white animate-carousel-progress" : ""}
                `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BannerCarousel;