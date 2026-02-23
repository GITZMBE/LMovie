'use client';

import { Video } from '@/src/models';
import { useEffect, useState } from 'react'
import Banner from './Banner';

export const DashboardBanner = () => {
  const [topMovie, setTopMovie] = useState<Video | null>(null);
  
  useEffect(() => {
    fetch(`/api/movie/top-rated-video`).then(r => r.json()).then(t => setTopMovie(t));
  }, []);

  return topMovie && (
    <Banner topVideo={topMovie}/>
  )
}

export default DashboardBanner