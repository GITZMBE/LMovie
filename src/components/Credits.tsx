import React, { useEffect, useRef, useState } from "react";
import { fetchCredits } from "../api/fetch";
import { VideoType } from "../models";
import { Cast } from "../models/credit";

interface Props {
  id: number;
  type: VideoType;
}

function Credits({ id, type = 'movie' }: Props) {
  const [cast, setCast] = useState<Cast[]>([]);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    fetchCredits(id, type).then(credits => setCast(credits.cast));
  }, [id, type]);
  const baseUrl = "https://image.tmdb.org/t/p/w780";

  const handleMouseDown = (e: any) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - (scrollContainerRef.current as any).offsetLeft);
      setScrollLeft((scrollContainerRef.current as any).scrollLeft);
      (scrollContainerRef.current as any).style.cursor = "grabbing";
    }
  };
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (scrollContainerRef.current) {
        (scrollContainerRef.current as any).style.cursor = "grab";
      }
    }
  };
  const handleMouseLeave = () => {
    if (isDragging && scrollContainerRef.current) {
      setIsDragging(false);
      (scrollContainerRef.current as any).style.cursor = "grab";
    }
  };
  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - (scrollContainerRef.current as any).offsetLeft;
      const walk = (x - startX) * 1.5;
      (scrollContainerRef.current as any).scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div id='credits' className='w-full space-y-4'>
      <h2 className='font-bold text-3xl'>Credits</h2>
      <div
        className='flex flex-nowrap lg:flex-wrap lg:justify-between gap-4 max-h-228 overflow-y-hidden overflow-x-auto hide-scrollbar'
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {cast.map((person, index) => (
              <div
                key={index}
                className='flex flex-col lg:flex-row lg:w-100 gap-4 lg:space-x-4 items-center'
              >
                <img
                  src={
                    person.profilePath
                      ? baseUrl + person.profilePath
                      : "https://www.blunttech.com/storage/blunttech/no-image-available.png"
                  }
                  className='min-w-25 w-[25vw] lg:max-w-24 aspect-square image-center rounded-full'
                  alt=''
                ></img>
                <p className='w-full flex flex-col text-center lg:text-left'>
                  <span>{person.name}</span>
                  <span className='text-gray-500'>{person.character}</span>
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Credits;
