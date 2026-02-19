'use client';

import { useEffect, useState, useRef } from "react";
import { fetchProviders } from "../api/fetch";
import { Provider } from "../models/providers";

function Providers() {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const [providers, setProviders] = useState<Provider[]>([]);
  useEffect(() => {
    fetchProviders().then(setProviders);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseDown = (e: any) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };
  const handleMouseUp = () => {
    if (!isDragging || !scrollContainerRef.current) return;

    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };
  const handleMouseLeave = () => {
    if (!isDragging || !scrollContainerRef.current) return;

    setIsDragging(false);
    scrollContainerRef.current.style.cursor = "grab";
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseMove = (e: any) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div id='providers' className='w-full px-12'>
      <div
        className='flex overflow-hidden'
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {providers?.length
          ? providers.map((item, i) => {
              return (
                <img
                  key={i}
                  src={baseUrl + item.logo_path}
                  alt=''
                  className='w-12 h-12'
                ></img>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Providers;
