'use client';

import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import CinematicModal from "../../ui/CinematicModal";
import { Video } from "@/src/models";
import { twJoin } from "tailwind-merge";

interface Props { 
  video: Video;
  variant?: "primary" | "secondary";
  selectedSeason?: number;
  selectedEpisode?: number;
  className?: string;
};

export const PlayerButton = ({ video, variant = "primary", selectedSeason, selectedEpisode, className }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className={twJoin(`flex justify-center items-center gap-1 px-3 py-1.5 rounded-lg cursor-pointer`, 
          variant === "primary" 
            ? "bg-white text-black" 
            : "border border-tertiary text-white backdrop-blur-sm backdrop-brightness-50",
          className
        )}
      >
        <FaPlay />
        <span>Play {video.type === 'series' ? `S${selectedSeason}E${selectedEpisode}` : ''}</span>
      </button>
      <CinematicModal
        open={open}
        onClose={() => setOpen(false)}
        video={video as Video}
        initialSeason={selectedSeason}
        initialEpisode={selectedEpisode}
        onEpisodeChange={(season, episode) => {
          console.log("Load video:", season, episode);
        }}
      />
    </>
  )
};

export default PlayerButton;