'use client';

import Draggable from "../../ui/Draggable";
import { favoriteMoviesState } from "@/src/states";
import Poster from "../../ui/Poster";
import { useStore } from "@nanostores/react";

function Favorites() {
  const favorites = useStore(favoriteMoviesState);

  return favorites && favorites.length ? (
    <div className='w-full'>
      <h2 className='font-bold text-3xl'>Favorites</h2>
      <Draggable>
        <div className='flex gap-4'>
          {favorites.map(
            (video) => (
              <Poster
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

export default Favorites;
