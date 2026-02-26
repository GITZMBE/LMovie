"use client";

import { Season, Video, VideoType } from "@/src/models";
import { useEffect, useState } from "react";
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
  const [currentSeason, setCurrentSeason] = useState(initialSeason);
  const [currentEpisode, setCurrentEpisode] = useState(initialEpisode);

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setCurrentSeason(initialSeason);
      setCurrentEpisode(initialEpisode);
    }
  }, [open, initialSeason, initialEpisode]);

  // Notify parent when episode changes
  useEffect(() => {
    if (video?.type !== "series") return;
    onEpisodeChange?.(currentSeason, currentEpisode);
  }, [currentSeason, currentEpisode]);

  const handleNext = () => {
    if (video.type !== "series" || !video.seasons) return;

    const episodeCount =
      video.seasons[currentSeason - 1]?.episodeCount ?? 0;

    // Not last episode
    if (currentEpisode < episodeCount) {
      setCurrentEpisode((prev) => prev + 1);
      return;
    }

    // Last episode but more seasons exist
    if (currentSeason < video.seasons.length) {
      setCurrentSeason((prev) => prev + 1);
      setCurrentEpisode(1);
    }
  };

  const handlePrev = () => {
    if (video.type !== "series" || !video.seasons) return;

    // Not first episode
    if (currentEpisode > 1) {
      setCurrentEpisode((prev) => prev - 1);
      return;
    }

    // First episode but previous season exists
    if (currentSeason > 1) {
      const prevSeasonEpisodes =
        video.seasons[currentSeason - 2]?.episodeCount ?? 1;

      setCurrentSeason((prev) => prev - 1);
      setCurrentEpisode(prevSeasonEpisodes);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-[90vw] max-w-6xl bg-neutral-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">

          <div className="flex items-center gap-4 text-white">
            {video.type === "series" ? (
              <>
                <button
                  onClick={handlePrev}
                  className="hover:opacity-70 transition"
                >
                  <FaChevronLeft size={20} />
                </button>

                <span className="text-sm font-semibold">
                  S{currentSeason}E{currentEpisode} - {video.title}
                </span>

                <button
                  onClick={handleNext}
                  className="hover:opacity-70 transition"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            ) : (
              <span className="text-sm font-semibold">
                {video.title}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-white hover:opacity-70 transition"
          >
            <RxCross2 size={20} />
          </button>
        </div>

        {/* VIDEO AREA */}
        <div className="w-full aspect-video bg-black flex items-center justify-center">
          <VideoPlayer video={video} season={currentSeason} episode={currentEpisode} />
        </div>
      </div>
    </div>
  );
};

export default CinematicModal;