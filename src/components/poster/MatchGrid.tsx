import React from 'react';
import type { Fixture } from '../../types/fixture';
import { MatchCard } from './MatchCard';

interface MatchGridProps {
  matches: Fixture[];
}

export const MatchGrid: React.FC<MatchGridProps> = ({ matches }) => {
  const count = matches.length;

  // Determine grid layout structure
  let gridColsClass = 'grid-cols-2';
  let gridRowsClass = 'grid-rows-5';
  let isCompact = false;
  let gapClass = 'gap-3.5';

  if (count <= 6) {
    gridColsClass = 'grid-cols-2';
    gridRowsClass = '';
    gapClass = 'gap-4';
    isCompact = false;
  } else if (count <= 8) {
    gridColsClass = 'grid-cols-2';
    gridRowsClass = 'grid-rows-4';
    gapClass = 'gap-4';
    isCompact = false;
  } else if (count <= 10) {
    gridColsClass = 'grid-cols-2';
    gridRowsClass = 'grid-rows-5';
    gapClass = 'gap-3.5';
    isCompact = false;
  } else if (count <= 14) {
    gridColsClass = 'grid-cols-2';
    gridRowsClass = '';
    gapClass = 'gap-2.5';
    isCompact = true;
  } else {
    gridColsClass = 'grid-cols-3';
    gridRowsClass = '';
    gapClass = 'gap-2';
    isCompact = true;
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-center relative z-10 py-1">
      <div className={`grid ${gridColsClass} ${gridRowsClass} ${gapClass} w-full h-full items-stretch`}>
        {matches.map((fixture, idx) => {
          const isOddLast = count % 2 === 1 && idx === count - 1;
          const keyId = fixture?.id || `${idx}-${fixture?.homeTeam?.id ?? 0}-${fixture?.awayTeam?.id ?? 0}`;
          return (
            <div
              key={keyId}
              className={isOddLast ? 'col-span-2 flex justify-center w-full h-full' : 'w-full h-full'}
            >
              <div className={isOddLast ? 'w-full max-w-[490px] h-full' : 'w-full h-full'}>
                <MatchCard
                  fixture={fixture}
                  index={idx + 1}
                  compact={isCompact}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



