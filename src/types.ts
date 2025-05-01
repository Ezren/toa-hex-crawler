export type TravelDirection = 'north' | 'northeast' | 'southeast' | 'south' | 'southwest' | 'northwest';

export interface Supplies {
  rainCatchers: number;
  canoes: number;
  poundsFood: number;
  gallonsWater: number;
}

export type ChultTerrain =
  | 'coast'
  | 'desert'
  | 'forest'
  | 'forestLesser'
  | 'forestGreater'
  | 'mountain'
  | 'river'
  | 'ruins'
  | 'swamp';

export type Pace = 'camp' | 'normal' | 'slow' | 'fast';
