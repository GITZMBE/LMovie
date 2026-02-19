'use client';

import { fetchPopular, fetchTopVideo, fetchTopVideos, fetchUpcoming, fetchVideoKey } from "@/src/api";
import { Trailer } from "@/src/components";
import Banner from "@/src/components/connectors/Banner";
import Favorites from "@/src/components/connectors/Lists/Favorites";
import VideosContainer from "@/src/components/ui/VideosContainer";
import { Video } from "@/src/models";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [bannerObject, setBannerObject] = useState<Video | null>(null);
  const [videoInfo, setVideoInfo] = useState<{ key: string } | null>(null);
  useEffect(() => {
    fetchTopVideo().then(setBannerObject);
  }, []);

  useEffect(() => {
    if (!bannerObject || !bannerObject.id) return;

    fetchVideoKey(bannerObject.id).then(setVideoInfo);
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
        <Favorites />
        <VideosContainer title='Top Rated' fetchFunction={fetchTopVideos} />
        <VideosContainer title='Popular' fetchFunction={fetchPopular} />
        <VideosContainer title='Upcoming' fetchFunction={fetchUpcoming} />
        <VideosContainer title='Top Series' fetchFunction={async () => await fetchTopVideos('series')} />
      </main>
    </div>
  );
};

export default Dashboard;
