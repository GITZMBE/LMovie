'use client';

import { Video } from '@/src/models';
import { useEffect, useState } from 'react'
import Banner from './Banner';
import Searchbar from './Search/Searchbar';
import BannerCarousel from '../ui/BannerCarousel';

export const DashboardBanner = () => {
  // const [topMovie, setTopMovie] = useState<Video | null>(null);
  const [topMovies, setTopMovies] = useState<Video[]>([]);
  
  // useEffect(() => {
  //   fetch(`/api/movie/top-rated-video`).then(r => r.json()).then(t => setTopMovie(t));
  // }, []);

  useEffect(() => {
    fetch(`/api/movie/top-rated`).then(r => r.json()).then(t => setTopMovies(t?.filter((_: any, i: number) => i < 5) || []));
  }, []);

  return topMovies?.length && (
    // <Banner video={topMovie}>
    //   <Searchbar className="absolute top-16 sm:top-24 left-1/2 -translate-x-1/2" />
    // </Banner>
    <BannerCarousel videos={topMovies}>
      <Searchbar className="absolute top-16 sm:top-24 left-1/2 -translate-x-1/2" />
    </BannerCarousel>
  )
}

export default DashboardBanner