'use client';

import { Trailer } from "@/src/components";
import Banner from "@/src/components/connectors/Banner";
import Favorites from "@/src/components/connectors/Lists/Favorites";
import VideosContainer from "@/src/components/ui/VideosContainer";
import ProviderContainer from "@/src/components/ui/ProviderContainer";
import { Video } from "@/src/models";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [bannerObject, setBannerObject] = useState<Video | null>(null);
  const [videoInfo, setVideoInfo] = useState<{ key: string } | null>(null);
  
  useEffect(() => {
    fetch(`/api/movie/top-rated-video`).then(r => r.json()).then(t => {
      setBannerObject(t);
    });
  }, []);

  useEffect(() => {
    if (!bannerObject || !bannerObject.id) return;

    fetch(`/api/${bannerObject.type}/${bannerObject.id}/video`).then(r => r.json()).then(setVideoInfo);
  }, [bannerObject]);

  return (
    <div
      id='dashboard'
      className='flex flex-col pb-headerHeight bg-primary min-h-screen'
    >
      {bannerObject && (
        <Banner topVideo={bannerObject}>
          {videoInfo?.key && <Trailer videoKey={videoInfo.key} className='hidden' />}
        </Banner>        
      )}
      <main className='w-full text-white'>
        {/* <Favorites /> */}
        <ProviderContainer title='Watch Providers' fetchPath='/api/movie/providers' />
        <VideosContainer title='Top Rated' fetchPath='/api/movie/top-rated' />
        <VideosContainer title='Popular' fetchPath='/api/movie/popular' />
        <VideosContainer title='Upcoming' fetchPath='/api/movie/upcoming' />
        <VideosContainer title='Top Series' fetchPath='/api/series/top-rated' />
      </main>
    </div>
  );
};

export default Dashboard;
