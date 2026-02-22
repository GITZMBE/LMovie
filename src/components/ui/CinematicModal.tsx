"use client";

import { Season } from "@/src/models";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

type Props = {
  open: boolean;
  onClose: () => void;

  title: string; // movie title OR fallback series title
  children: React.ReactNode;

  seasons?: Season[]; // only present if series
  initialSeason?: number;
  initialEpisode?: number;

  onEpisodeChange?: (season: number, episode: number) => void;
};

export function CinematicModal({
  open,
  onClose,
  title,
  children,
  seasons,
  initialSeason = 1,
  initialEpisode = 1,
  onEpisodeChange,
}: Props) {
  const isSeries = !!seasons?.length;

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
    if (!isSeries) return;
    onEpisodeChange?.(currentSeason, currentEpisode);
  }, [currentSeason, currentEpisode]);

  const handleNext = () => {
    if (!isSeries || !seasons) return;

    const episodeCount =
      seasons[currentSeason - 1]?.episodeCount ?? 0;

    // Not last episode
    if (currentEpisode < episodeCount) {
      setCurrentEpisode((prev) => prev + 1);
      return;
    }

    // Last episode but more seasons exist
    if (currentSeason < seasons.length) {
      setCurrentSeason((prev) => prev + 1);
      setCurrentEpisode(1);
    }
  };

  const handlePrev = () => {
    if (!isSeries || !seasons) return;

    // Not first episode
    if (currentEpisode > 1) {
      setCurrentEpisode((prev) => prev - 1);
      return;
    }

    // First episode but previous season exists
    if (currentSeason > 1) {
      const prevSeasonEpisodes =
        seasons[currentSeason - 2]?.episodeCount ?? 1;

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
            {isSeries && (
              <>
                <button
                  onClick={handlePrev}
                  className="hover:opacity-70 transition"
                >
                  <FaChevronLeft size={20} />
                </button>

                <span className="text-sm font-semibold">
                  {isSeries
                    ? `S${currentSeason}E${currentEpisode} - ${title}`
                    : title}
                </span>

                <button
                  onClick={handleNext}
                  className="hover:opacity-70 transition"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default CinematicModal;