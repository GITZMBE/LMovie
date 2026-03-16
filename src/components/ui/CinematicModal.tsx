"use client";

import { Video } from "@/src/models";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import VideoPlayer from "../VideoPlayer";

type Props = {
  open: boolean;
  onClose: () => void;
  video: Video;
  initialSeason?: number;
  initialEpisode?: number;
  onEpisodeChange?: (season: number, episode: number) => void;
};

export function CinematicModal({
  open,
  onClose,
  video,
  initialSeason = 1,
  initialEpisode = 1,
  onEpisodeChange,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const seasonParam = Number(searchParams.get("season"));
  const episodeParam = Number(searchParams.get("episode"));

  const [currentSeason, setCurrentSeason] = useState(
    seasonParam || initialSeason
  );
  const [currentEpisode, setCurrentEpisode] = useState(
    episodeParam || initialEpisode
  );
  // const [showNextOverlay, setShowNextOverlay] = useState(false);
  // const [countdown, setCountdown] = useState(10);
  // const isLastEpisode = useMemo(() => {
  //   return currentSeason === video?.seasons?.length && currentEpisode === video.seasons[currentSeason - 1]?.episodeCount;
  // }, [video, currentSeason, currentEpisode]);
  
  useEffect(() => {
    if (open) {
      setCurrentSeason(seasonParam || initialSeason);
      setCurrentEpisode(episodeParam || initialEpisode);
    }
  }, [open, seasonParam, episodeParam, initialSeason, initialEpisode]);

  useEffect(() => {
    if (video?.type !== "series") return;
    onEpisodeChange?.(currentSeason, currentEpisode);
  }, [currentSeason, currentEpisode]);

  const updateEpisode = (season: number, episode: number) => {
    setCurrentSeason(season);
    setCurrentEpisode(episode);

    router.replace(`?season=${season}&episode=${episode}`, { scroll: false });
  };

  const handleNext = () => {
    if (video.type !== "series" || !video.seasons) return;

    const episodeCount =
      video.seasons?.find(s => s.seasonNumber === currentSeason)?.episodes?.length ?? 0;

    let nextSeason = currentSeason;
    let nextEpisode = currentEpisode;

    if (currentEpisode < episodeCount) {
      nextEpisode += 1;
    } else if (currentSeason < video.seasons.length) {
      nextSeason += 1;
      nextEpisode = 1;
    }

    updateEpisode(nextSeason, nextEpisode);
  };

  const handlePrev = () => {
    if (video.type !== "series" || !video.seasons) return;

    let nextSeason = currentSeason;
    let nextEpisode = currentEpisode;

    if (currentEpisode > 1) {
      nextEpisode -= 1;
    } else if (currentSeason > 1) {
      nextSeason -= 1;
      nextEpisode = video.seasons?.find(s => s.seasonNumber === currentSeason - 1)?.episodes?.length ?? 1;
    }

    updateEpisode(nextSeason, nextEpisode);
  };

  // useEffect(() => {
  //   if (showNextOverlay) {
  //     setCountdown(10);
  //   }
  // }, [showNextOverlay]);

  // useEffect(() => {
  //   setShowNextOverlay(false);
  //   setCountdown(10);
  // }, [currentSeason, currentEpisode]);

  // useEffect(() => {
  //   if (!showNextOverlay) return;

  //   const interval = setInterval(() => {
  //     setCountdown((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(interval);

  //         setShowNextOverlay(false);
  //         setCountdown(10);

  //         handleNext(); // autoplay next episode

  //         return 0;
  //       }

  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [showNextOverlay]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-[90vw] max-w-6xl bg-neutral-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">

          <div className="flex items-center gap-4 text-white">
            {(video.type === "series") ? (
              <>
                <button onClick={handlePrev} className="hover:opacity-70 transition">
                  <FaChevronLeft size={20} />
                </button>

                <span className="text-sm font-semibold">
                  S{currentSeason}E{currentEpisode} - {video.title}
                </span>

                <button onClick={handleNext} className="hover:opacity-70 transition">
                  <FaChevronRight size={20} />
                </button>
              </>
            ) : (
              <span className="text-sm font-semibold">{video.title}</span>
            )}
          </div>

          <button onClick={onClose} className="text-white hover:opacity-70 transition">
            <RxCross2 size={20} />
          </button>
        </div>

        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <VideoPlayer
            video={video}
            season={currentSeason}
            episode={currentEpisode}
            // onAlmostFinished={() => {
            //   if (video.type === "series" && !isLastEpisode) {
            //     setShowNextOverlay(true);
            //   }
            // }}
          />

          {/* {(video.type === "series" && !isLastEpisode && showNextOverlay) && (
            <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-lg rounded-xl p-4 text-white shadow-xl border border-white/10">
              <p className="text-sm mb-2">Next episode in {countdown}s</p>
              <button
                onClick={() => {
                  setShowNextOverlay(false);
                  handleNext();
                }}
                className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:opacity-80"
              >
                Play Next Episode
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default CinematicModal;