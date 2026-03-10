'use client';

import { useEffect, useState } from "react";
import { Video, VideoKey, VideoType } from "@/src/models";
import Credits from "@/src/components/Credits";
import CinematicModal from "@/src/components/ui/CinematicModal";
import { useParams } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import Banner from "@/src/components/connectors/Banner";
import VideosContainer from "@/src/components/ui/VideosContainer";
import YoutubePlayer from "@/src/components/ui/YoutubePlayer";
import Draggable from "@/src/components/ui/Draggable";
import PageContainer from "../../ui/PageContainer";

export const MoviePageClient = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const {id, type} = useParams<{id: string, type: VideoType}>();
  const [videoKeys, setVideoKeys] = useState<VideoKey[]>([]);

  useEffect(() => {
    if (!id || !type) return;

    fetch(`/api/${type}/${id}`).then(res => res.json()).then(setVideo);
    fetch(`/api/${type}/${id}/video`).then(res => res.json()).then(setVideoKeys);
  }, [id, type]);

  const [open, setOpen] = useState(false);

  return (
    <div id='moviePoster'>
      <div>
        <Banner video={video as Video}>
          {/* <Trailer videoKey={videoInfo && videoInfo.key} className='hidden' /> */}
          {/* <iframe
            src={streamUrl + `?video_id=${video?.id}&tmdb=1`}
            title={`Stream for ${video?.title || `movie-${video?.id}`}`}
            frameBorder="0"
            className="w-full aspect-video"
            allowFullScreen
          /> */}
          {/* <div className="w-full h-[80vh] bg-[#0f1115]"></div> */}
        </Banner>
        <PageContainer>
          <div className="flex items-end gap-2">
            <h1 className='text-3xl font-bold'>{video?.title}</h1>
            <>
              <button onClick={() => setOpen(true)} className="flex justify-center items-center gap-1 bg-white text-black px-3 py-1.5 rounded-lg cursor-pointer">
                <FaPlay />
                <span>Play</span>
              </button>

              <CinematicModal
                open={open}
                onClose={() => setOpen(false)}
                video={video as Video}
                onEpisodeChange={(season, episode) => {
                  console.log("Load video:", season, episode);
                }}
              />
            </>
          </div>
          <Draggable>
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div
                className={`flex gap-4`}
              >
                {videoKeys?.map((videoKey) => (
                  <YoutubePlayer key={videoKey.key} videoKey={videoKey.key} />
                ))}
              </div>
            </div>
          </Draggable>
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