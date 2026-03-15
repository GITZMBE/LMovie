import { Season } from '@/src/models';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

interface Props {
  seasons: Season[];
  selectedSeason: number;
  selectedEpisode: number;
};

export const SeasonList = ({ seasons, selectedSeason = 1, selectedEpisode = 1 }: Props) => {
  const router = useRouter();

  const selectPreviousSeason = () => {
    if (selectedSeason === 1) return;
    
    router.push(`?season=${selectedSeason - 1}&episode=${1}`)
  };
  const selectNextSeason = () => {
    if (seasons?.length === selectedSeason) return;
    
    router.push(`?season=${selectedSeason + 1}&episode=${1}`);
  };

  const selectEpisode = (season: number, episode: number) => {
    if (season && season === selectedSeason && episode && episode === selectedEpisode) return;

    const newSeason = seasons?.find(s => s.seasonNumber === season) || null;

    if (!newSeason) return;

    const newEpisodeNumber = newSeason?.episodes?.length || 1;

    if (episode > newEpisodeNumber) return;

    router.push(`?season=${season}&episode=${episode}`);
  };

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const season = useMemo(() => {
    return seasons?.find(season => season.seasonNumber === selectedSeason) || null;
  }, [seasons, selectedSeason]);

  return seasons?.length && (
    <div className='rounded-t-lg overflow-hidden'>
      <div className="flex justify-between items-center w-full px-4 py-2 bg-secondary">
        <span>Season {selectedSeason}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={selectPreviousSeason}
            className="
              px-3 py-2
              rounded-md
              text-white
              hover:bg-white/10
              transition-all duration-150
            "
          >
            <FaChevronLeft className="text-white" />
          </button>
          <button
            onClick={selectNextSeason}
            className="
              px-3 py-2
              rounded-md
              text-white
              hover:bg-white/10
              transition-all duration-150
            "
          >
            <FaChevronRight className="text-white" />
          </button>
        </div>
      </div>
      <div className="max-h-100 overflow-auto">
        {season && season.episodes?.length ? season.episodes.map(episode => (
          <div 
            key={episode.id} 
            onClick={() => selectEpisode(selectedSeason, episode.episodeNumber)}
            className={twJoin("flex gap-1 w-full p-2 opacity-35 cursor-pointer", episode.episodeNumber === selectedEpisode && "bg-secondary opacity-100")}>
            <span className="text-nowrap">Episode {episode.episodeNumber}: </span>
            <span>{episode.name}</span>
          </div>
        )) : (
          <div className="w-full p-2 text-secondary">
            No episodes yet.
          </div>
        )}
      </div>
    </div>
  )
};

export default SeasonList;