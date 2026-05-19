'use client';

import { useEffect, useState } from "react";
import { Video, VideoKey, VideoType } from "@/src/models";
import Credits from "@/src/components/Credits";
import { useParams, useSearchParams } from "next/navigation";
import Banner from "@/src/components/connectors/Banner";
import VideosContainer from "@/src/components/ui/VideosContainer";
import Draggable from "@/src/components/ui/Draggable";
import PageContainer from "../../ui/PageContainer";
import SeasonList from "../Series/SeasonList";
import TrailerLink from "../Trailer/TrailerLink";

export const MoviePageClient = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const { id, type } = useParams<{ id: string; type: VideoType }>();
  const [videoKeys, setVideoKeys] = useState<VideoKey[]>([]);
  const searchParams = useSearchParams();
  const selectedSeason = Number(searchParams.get("season")) || 1;
  const selectedEpisode = Number(searchParams.get("episode")) || 1;

  const isSeries = video?.type === "series";

  useEffect(() => {
    if (!id || !type) return;
    fetch(`/api/${type}/${id}`).then(res => res.json()).then(setVideo);
    fetch(`/api/${type}/${id}/video`).then(res => res.json()).then(setVideoKeys);
  }, [id, type]);

  const mainContent = (
    <>
      {videoKeys?.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold">Trailers</h2>
          <Draggable>
            <div className="w-full overflow-x-auto hide-scrollbar">
              <div className="flex gap-4">
                {videoKeys.map(videoKey => (
                  <TrailerLink key={videoKey.key} videoKey={videoKey.key} />
                ))}
              </div>
            </div>
          </Draggable>
        </section>
      )}

      {type && (
        <>
          <Credits id={id ? +id : 0} type={type} />
          <VideosContainer
            title="Related"
            fetchPath={`/api/${type}/${id}/related`}
            posterSize="backdrop"
          />
        </>
      )}
    </>
  );

  return (
    <div id="moviePoster">
      <Banner
        video={video as Video}
        selectedSeason={selectedSeason}
        selectedEpisode={selectedEpisode}
      />

      <PageContainer className="gap-8">

        {isSeries ? (
          <>
            {/* Mobile: season list above main content */}
            <div className="lg:hidden">
              <SeasonList
                seasons={video.seasons || []}
                selectedSeason={selectedSeason}
                selectedEpisode={selectedEpisode}
                variant="mobile"
              />
            </div>

            {/* Desktop: main content + sticky sidebar */}
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              <div className="flex min-w-0 flex-1 flex-col gap-8">
                {mainContent}
              </div>

              <aside className="hidden lg:block w-80 shrink-0 sticky top-20">
                <SeasonList
                  seasons={video.seasons || []}
                  selectedSeason={selectedSeason}
                  selectedEpisode={selectedEpisode}
                  variant="desktop"
                />
              </aside>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-8">
            {mainContent}
          </div>
        )}

      </PageContainer>
    </div>
  );
};

export default MoviePageClient;