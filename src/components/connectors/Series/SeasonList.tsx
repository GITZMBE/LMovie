'use client';

import { Season } from '@/src/models';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaChevronDown } from 'react-icons/fa';
import { twJoin } from 'tailwind-merge';

interface Props {
  seasons: Season[];
  selectedSeason: number;
  selectedEpisode: number;
  variant?: 'desktop' | 'mobile';
}

export const SeasonList = ({
  seasons,
  selectedSeason = 1,
  selectedEpisode = 1,
  variant = 'desktop',
}: Props) => {
  const router = useRouter();
  const activeRef = useRef<HTMLDivElement>(null);

  const isFirstSeason = selectedSeason === 1;
  const isLastSeason = seasons?.length === selectedSeason;

  const season = useMemo(
    () => seasons?.find(s => s.seasonNumber === selectedSeason) ?? null,
    [seasons, selectedSeason]
  );

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedSeason, selectedEpisode]);

  if (!seasons?.length) return null;

  const selectPreviousSeason = () => {
    if (isFirstSeason) return;
    router.push(`?season=${selectedSeason - 1}&episode=1`);
  };

  const selectNextSeason = () => {
    if (isLastSeason) return;
    router.push(`?season=${selectedSeason + 1}&episode=1`);
  };

  const selectEpisode = (episodeNumber: number) => {
    if (episodeNumber === selectedEpisode) return;
    router.push(`?season=${selectedSeason}&episode=${episodeNumber}`);
  };

  const episodeCount = season?.episodes?.length ?? 0;

  /* ─── Desktop ─────────────────────────────────────────────────────────── */
  if (variant === 'desktop') {
    return (
      <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0d1520]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="text-sm font-medium text-white">
            Season {selectedSeason}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={selectPreviousSeason}
              disabled={isFirstSeason}
              aria-label="Previous season"
              className={twJoin(
                'rounded border border-white/10 p-1.5 transition-colors duration-150',
                isFirstSeason
                  ? 'cursor-not-allowed text-white/20'
                  : 'text-white hover:bg-white/10 active:scale-95'
              )}
            >
              <FaChevronLeft className="text-[10px]" />
            </button>
            <button
              onClick={selectNextSeason}
              disabled={isLastSeason}
              aria-label="Next season"
              className={twJoin(
                'rounded border border-white/10 p-1.5 transition-colors duration-150',
                isLastSeason
                  ? 'cursor-not-allowed text-white/20'
                  : 'text-white hover:bg-white/10 active:scale-95'
              )}
            >
              <FaChevronRight className="text-[10px]" />
            </button>
          </div>
        </div>

        {/* Episode rows */}
        <div className="max-h-105 overflow-y-auto">
          {season?.episodes?.length ? (
            season.episodes.map(episode => {
              const isActive = episode.episodeNumber === selectedEpisode;
              return (
                <div
                  key={episode.id}
                  ref={isActive ? activeRef : null}
                  onClick={() => selectEpisode(episode.episodeNumber)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && selectEpisode(episode.episodeNumber)}
                  aria-current={isActive ? 'true' : undefined}
                  className={twJoin(
                    'flex cursor-pointer items-center gap-3 border-b border-white/5 px-4 py-3',
                    'last:border-b-0 transition-colors duration-100',
                    isActive
                      ? 'border-l-2 border-l-amber-400/80 bg-white/10 pl-3.5'
                      : 'hover:bg-white/5'
                  )}
                >
                  <span className={twJoin(
                    'w-9 shrink-0 text-xs tabular-nums',
                    isActive ? 'text-amber-400/80' : 'text-white/40'
                  )}>
                    Ep {episode.episodeNumber}
                  </span>
                  <span className={twJoin(
                    'text-sm leading-snug',
                    isActive ? 'font-medium text-amber-400' : 'text-white/70 hover:text-white/90'
                  )}>
                    {episode.name}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="px-4 py-6 text-center text-sm text-white/40">No episodes yet.</p>
          )}
        </div>
      </div>
    );
  }

  /* ─── Mobile ──────────────────────────────────────────────────────────── */
  return (
    <div className="flex flex-col gap-0">

      {/* Season pill + count */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="relative">
          <select
            value={selectedSeason}
            onChange={e => router.push(`?season=${e.target.value}&episode=1`)}
            className={twJoin(`
              appearance-none cursor-pointer rounded-full
              border border-white/20 bg-white/10
              py-1.5 pl-3 pr-8
              text-sm font-medium text-white
              focus:outline-none focus:ring-1 focus:ring-white/30
            `)}
            aria-label="Select season"
          >
            {seasons.map(s => (
              <option key={s.seasonNumber} value={s.seasonNumber} className="bg-[#0d1520]">
                Season {s.seasonNumber}
              </option>
            ))}
          </select>
          <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/60" />
        </div>
        <span className="text-sm text-white/40">
          {episodeCount} episode{episodeCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Episode rows */}
      <div className="flex flex-col">
        {season?.episodes?.length ? (
          season.episodes.map(episode => {
            const isActive = episode.episodeNumber === selectedEpisode;
            return (
              <div
                key={episode.id}
                ref={isActive ? activeRef : null}
                onClick={() => selectEpisode(episode.episodeNumber)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && selectEpisode(episode.episodeNumber)}
                aria-current={isActive ? 'true' : undefined}
                className={twJoin(
                  'flex cursor-pointer items-center gap-3 px-4 py-3',
                  'border-b border-white/5 last:border-b-0 transition-colors duration-100',
                  !isActive && 'hover:bg-white/5'
                )}
              >
                {/* Number */}
                <span className="w-5 shrink-0 text-center text-xs tabular-nums text-white/40">
                  {episode.episodeNumber}
                </span>

                {/* Thumbnail play button */}
                <div
                  style={
                    episode.stillPath
                      ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/t/p/original${episode.stillPath})` }
                      : undefined
                  }
                  className={twJoin(
                    'flex h-10 w-16 shrink-0 items-center justify-center rounded',
                    'border bg-cover bg-center bg-white/5 transition-colors duration-100',
                    isActive
                      ? 'border-amber-400/70 text-amber-400'
                      : 'border-white/10 text-white/40 hover:text-white/70'
                  )}
                >
                  <FaPlay className="text-[10px]" />
                </div>

                {/* Info */}
                <div className="flex min-w-0 flex-col">
                  <span className={twJoin(
                    'text-sm leading-snug',
                    isActive ? 'font-medium text-white' : 'text-white/70'
                  )}>
                    {episode.name}
                  </span>
                  {episode.runtime && (
                    <span className="mt-0.5 text-xs text-white/40">
                      {episode.runtime} min
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="px-4 py-6 text-center text-sm text-white/40">No episodes yet.</p>
        )}
      </div>
    </div>
  );
};

export default SeasonList;