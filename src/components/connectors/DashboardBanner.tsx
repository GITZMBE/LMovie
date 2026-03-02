'use client';

import { Video } from '@/src/models';
import { useEffect, useState } from 'react'
import Banner from './Banner';
import Searchbar from './Search/Searchbar';

export const DashboardBanner = () => {
  const [topMovie, setTopMovie] = useState<Video | null>(null);
  
  useEffect(() => {
    fetch(`/api/movie/top-rated-video`).then(r => r.json()).then(t => setTopMovie(t));
  }, []);

  return topMovie && (
    <Banner video={topMovie}>
      <Searchbar className="absolute top-16 sm:top-24 left-1/2 -translate-x-1/2" />
    </Banner>
  )
}

export default DashboardBanner