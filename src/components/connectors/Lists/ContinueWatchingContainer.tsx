'use client';

import Draggable from "../../ui/Draggable";
import { useStore } from "@nanostores/react";
import { continueWatchingState } from "@/src/states/continueWatchingState";
import ContinueWatchingPoster from "../../ui/ContinueWatchingPoster";

export function ContinueWatchingContainer() {
  const continueWatchingVideos = useStore(continueWatchingState);

  return continueWatchingVideos && continueWatchingVideos.length ? (
    <div className='w-full'>
      <h2 className='font-bold text-3xl'>Continue Watching</h2>
      <Draggable>
        <div className='flex gap-4'>
          {continueWatchingVideos.map(
            (video) => (
              <ContinueWatchingPoster
                key={video.id}
                {...video}
              />
            ),
          )}
        </div>
      </Draggable>
    </div>
  ) : (
    <></>
  );
}

export default ContinueWatchingContainer;
