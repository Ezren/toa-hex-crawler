import type { Pace, TravelDirection } from './types';

export const rollDice = (sides: number): number => Math.floor(Math.random() * sides) + 1;

export const getPaceEffect = (pace: string, favoredTerrain: boolean) => {
  if (pace === 'camp') {
    return '0 hexes; no encounters';
  }
  if (pace === 'normal') {
    return '2 hexes/day by canoe; 1 hex/day by foot';
  } else if (pace === 'fast') {
    return '2-3 hexes/day by canoe; 1-2 hexes/day by foot; more likely to be surprised';
  } else if (pace === 'slow' && favoredTerrain) {
    return '2 hexes/day by canoe; 1 hex/day by foot; can hide from encounters';
  } else {
    return '1-2 hexes/day by canoe; 0-1 hex/day by foot; can hide from encounters';
  }
};

export const paceModifier: Record<Pace, number> = {
  camp: 0,
  normal: 0,
  slow: 5,
  fast: -5,
};

const direction: Record<number, TravelDirection> = {
  1: 'north',
  2: 'northeast',
  3: 'southeast',
  4: 'south',
  5: 'southwest',
  6: 'northwest',
};

export const getRandomDirection = () => direction[rollDice(6) as keyof typeof direction];
