import { rollDice } from './utils';

export type FavoredTerrain =
  | 'arctic'
  | 'coast'
  | 'desert'
  | 'forest'
  | 'grassland'
  | 'mountain'
  | 'swamp'
  | 'underdark';

export type CharacterOption = 'navigate' | 'forage' | 'lookout';

export interface Character {
  name: string;
  conModifier: number;
  wisModifier: number;
  survivalModifier: number;
  strScore: number;
  currentBurden: number;
  isRanger: boolean;
  isWanderer: boolean;
  hasMediumOrHeavyArmor: boolean;
  favoredTerrain?: FavoredTerrain;
  levelsOfExhaustion: number;
  daysWithoutFood: number;
  dailyOption: CharacterOption;
}

export type CharacterReducerAction =
  | AddCharacter
  | DeleteCharacter
  | UpdateCharacter
  | LongRest
  | Famine
  | Feast
  | Dehydrate
  | StormTravel
  | ChooseOption
  | SetBurden;

type AddCharacter = {
  type: 'ADD_CHARACTER';
  character: Character;
};

type DeleteCharacter = {
  type: 'DELETE_CHARACER';
  name: string;
};

type UpdateCharacter = {
  type: 'UPDATE_CHARACTER';
  character: Partial<Character>;
};

type LongRest = {
  type: 'LONG_REST';
};

type Famine = {
  type: 'FAMINE';
};

type Feast = {
  type: 'FEAST';
};

type Dehydrate = {
  type: 'DEHYDRATE';
  pace: string;
};

type StormTravel = {
  type: 'STORM_TRAVEL';
};

type ChooseOption = {
  type: 'CHOOSE_OPTION';
  name: string;
  option: CharacterOption;
};

type SetBurden = {
  type: 'SET_BURDEN';
  name: string;
  burden: number;
};

export const characterReducer = (state: Character[], action: CharacterReducerAction) => {
  switch (action.type) {
    case 'ADD_CHARACTER':
      return [
        ...state,
        {
          ...action.character,
          conModifier: Number(action.character.conModifier),
          wisModifier: Number(action.character.wisModifier),
          survivalModifier: Number(action.character.survivalModifier),
          strScore: Number(action.character.strScore),
          currentBurden: Number(action.character.currentBurden),
          favoredTerrain: action.character.isRanger ? action.character.favoredTerrain : null,
          levelsOfExhaustion: Number(action.character.levelsOfExhaustion),
          daysWithoutFood: Number(action.character.daysWithoutFood),
          dailyOption: 'lookout',
        },
      ] as Character[];
    case 'DELETE_CHARACER':
      return state.filter((character) => character.name !== action.name);
    case 'UPDATE_CHARACTER':
      return state.map((character) => {
        if (character.name === action.character.name) {
          return {
            ...character,
            ...action.character,
            conModifier: Number(action.character.conModifier),
            wisModifier: Number(action.character.wisModifier),
            survivalModifier: Number(action.character.survivalModifier),
            strScore: Number(action.character.strScore),
            currentBurden: Number(action.character.currentBurden),
            favoredTerrain: action.character.isRanger ? action.character.favoredTerrain : null,
            levelsOfExhaustion: Number(action.character.levelsOfExhaustion),
            daysWithoutFood: Number(action.character.daysWithoutFood),
          } as Character;
        }

        return character;
      });
    case 'LONG_REST':
      return state.map((character) => {
        return {
          ...character,
          levelsOfExhaustion: Math.max(0, character.levelsOfExhaustion - 1),
        };
      });
    case 'FAMINE':
      return state.map((character) => {
        const daysWithoutFood = character.daysWithoutFood + 1;
        const isStarving = daysWithoutFood > 3 + character.conModifier;
        const levelsOfExhaustion = isStarving ? character.levelsOfExhaustion + 1 : character.levelsOfExhaustion;

        if (isStarving) {
          console.log(`${character.name} is starving to death. They take one level of exhaustion.`);
        }

        return { ...character, daysWithoutFood, levelsOfExhaustion };
      });
    case 'FEAST':
      return state.map((character) => ({ ...character, daysWithoutFood: 0 }));
    case 'DEHYDRATE':
      return state.map((character) => {
        const conSave =
          (character.levelsOfExhaustion >= 3 || character.hasMediumOrHeavyArmor
            ? Math.min(rollDice(20) + rollDice(20))
            : rollDice(20)) +
          character.conModifier +
          (action.pace === 'fast' ? -5 : 0);

        if (conSave < 15) {
          const levelsOfExhaustion =
            character.levelsOfExhaustion > 0 ? character.levelsOfExhaustion + 2 : character.levelsOfExhaustion + 1;
          console.log(`${character.name} feels delerious from thirst and becomes exhausted.`);
          return { ...character, levelsOfExhaustion };
        }

        return character;
      });
    case 'STORM_TRAVEL':
      return state.map((character) => {
        const conRoll = rollDice(20) + character.conModifier;

        return {
          ...character,
          levelsOfExhaustion: character.levelsOfExhaustion + (conRoll >= 10 ? 1 : 2),
        };
      });
    case 'CHOOSE_OPTION':
      return state.map((character) => {
        if (character.name === action.name) {
          return { ...character, dailyOption: action.option };
        }

        return character;
      });
    case 'SET_BURDEN':
      return state.map((character) => {
        if (character.name === action.name) {
          return { ...character, currentBurden: action.burden };
        }

        return character;
      });
  }

  return state;
};
