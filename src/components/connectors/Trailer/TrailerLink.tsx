'use client';

import { FaCirclePlay } from "react-icons/fa6";

interface Props {
  videoKey: string;
};

export const TrailerLink = ({ videoKey }: Props) => {
  return (
    <a href={`https://www.youtube.com/watch?v=${videoKey}`} target="_blank" className="flex items-center gap-2 w-full min-w-40 p-4 rounded-lg border border-secondary">
      <FaCirclePlay className="text-3xl" />
      <p className="text-sm text-nowrap">Watch trailer</p>
    </a>
  )
};

export default TrailerLink;