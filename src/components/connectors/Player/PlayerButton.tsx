'use client';

import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import CinematicModal from "../../ui/CinematicModal";
import { Video } from "@/src/models";

interface Props { 
  video: Video;
  selectedSeason?: number;
  selectedEpisode?: number;
};

export const PlayerButton = ({ video, selectedSeason, selectedEpisode }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex justify-center items-center gap-1 bg-white text-black px-3 py-1.5 rounded-lg cursor-pointer">
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