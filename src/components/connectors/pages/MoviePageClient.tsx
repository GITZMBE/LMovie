'use client';

import { useEffect, useState } from "react";
import { Video, VideoKey, VideoType } from "@/src/models";
import Credits from "@/src/components/Credits";
import { useParams, useSearchParams } from "next/navigation";
import Banner from "@/src/components/connectors/Banner";
import VideosContainer from "@/src/components/ui/VideosContainer";
import YoutubePlayer from "@/src/components/ui/YoutubePlayer";
import Draggable from "@/src/components/ui/Draggable";
import PageContainer from "../../ui/PageContainer";
import SeasonList from "../Series/SeasonList";
import TrailerLink from "../Trailer/TrailerLink";

export const MoviePageClient = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const {id, type} = useParams<{id: string, type: VideoType}>();
  const [videoKeys, setVideoKeys] = useState<VideoKey[]>([]);
  const searchParams = useSearchParams();
  const selectedSeason = Number(searchParams.get("season")) || 1;
  const selectedEpisode = Number(searchParams.get("episode")) || 1;

  useEffect(() => {
    if (!id || !type) return;

    fetch(`/api/${type}/${id}`).then(res => res.json()).then(setVideo);
    fetch(`/api/${type}/${id}/video`).then(res => res.json()).then(setVideoKeys);
  }, [id, type]);

  useEffect(( ) => {
    console.log(videoKeys);
  }, [videoKeys])

  return (
    <div id='moviePoster'>
      <div>
        <Banner video={video as Video} />
        <PageContainer className="gap-4">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between flex-wrap gap-4">
            {(video?.type === "series" && (
              <SeasonList 
                seasons={video.seasons || []}
                selectedSeason={selectedSeason}
                selectedEpisode={selectedEpisode}
              />
            ))}
          </div>
          {videoKeys?.length && (
            <>
              <h2 className='font-bold text-xl'>Trailers</h2>
              <Draggable>
                <div className="w-full overflow-x-auto hide-scrollbar">
                  <div
                    className={`flex gap-4`}
                  >
                    {videoKeys?.map((videoKey) => (
                      // <YoutubePlayer key={videoKey.key} videoKey={videoKey.key} />
                      <TrailerLink key={videoKey.key} videoKey={videoKey.key} />
                    ))}
                  </div>
                </div>
              </Draggable>            
            </>
          )}
          {/* <div className='flex items-center gap-4'>
            <h2 className='text-xl font-bold'>Votes: </h2>
            <div className='space-y-2'>
              <AiOutlineArrowUp
                className='fill-green-500 hover:fill-green-800 cursor-pointer'
                onClick={() => setVotes(votes + 1)}
              />
              <p className='selection:bg-transparent'>{votes}</p>
              <AiOutlineArrowDown
                className='fill-red-500 hover:fill-red-800 cursor-pointer'
                onClick={() => setVotes(votes - 1)}
              />
            </div>
          </div> */}
          {type && (
            <>
              <Credits id={id ? +id : 0} type={type} />
              <VideosContainer title='Related' fetchPath={`/api/${type}/${id}/related`} posterSize="backdrop" />
            </>
          )}
        </PageContainer>
      </div>
    </div>
  );
}

export default MoviePageClient;