'use client';

import Draggable from "@/src/components/ui/Draggable";
import Poster from "@/src/components/ui/Poster";
import { watchlistState } from "@/src/states/watchlistState";
import { useStore } from "@nanostores/react";

export const WatchlistPage = () => {
  const watchlist = useStore(watchlistState);

  return (
    <div className='w-full min-h-screen py-20 px-12 space-y-4 bg-primary text-white'>
      
        <div className='w-full h-full flex flex-col grow'>
          <h2 className='font-bold text-3xl'>My Watchlist</h2>
          {watchlist && watchlist.length ? (
            <Draggable>
              <div className='flex gap-4'>
                {watchlist.map(
                  ({ id, type, title, posterPath, backdropPath, description, releaseDate, rating, genreIds }) => (
                    <Poster
                      key={id}
                      id={id}
                      type={type}
                      posterPath={posterPath}
                      backdropPath={backdropPath}
                      description={description}
                      genreIds={genreIds}
                      title={title}
                      releaseDate={releaseDate}
                      rating={rating}
                    />
                  ),
                )}
              </div>
            </Draggable>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center grow py-12 px-2 gap-4">
              <h3 className="text-xl font-semibold text-white">Your watchlist is empty</h3>
              <p className="text-center text-[#D7D7D7]">
                Start adding movies and series to your watchlist to see them here by clicking the + button when browsing movies and series
              </p>
            </div>
          )}
        </div>
    </div>
  );
};

export default WatchlistPage;