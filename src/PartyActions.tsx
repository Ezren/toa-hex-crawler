import { Box, FormLabel, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import type { Character } from './characters';
import {
  Explore,
  North,
  NorthEast,
  NorthWest,
  RestaurantMenu,
  Security,
  South,
  SouthEast,
  SouthWest,
} from '@mui/icons-material';
import { getPaceEffect } from './utils';
import { ChultTerrain, Pace, TravelDirection } from './types';

interface PartyActionProps {
  characters: Character[];
  characterDispatch: (arg: any) => any;
  navigator: Character | null;
  setNavigator: (character: Character | null) => void;
  pace: Pace;
  setPace: (pace: Pace) => void;
  currentHexTerrain: ChultTerrain;
  direction: TravelDirection;
  setDirection: (direction: TravelDirection) => void;
}

export const PartyAction = ({
  characters,
  characterDispatch,
  navigator,
  setNavigator,
  pace,
  setPace,
  currentHexTerrain,
  direction,
  setDirection,
}: PartyActionProps) => {
  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      {characters.map((character) => (
        <Box
          key={character.name}
          sx={(theme) => ({
            maxWidth: '450px',
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            padding: 3,
          })}
        >
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Typography variant="h5">{character.name}</Typography>
            <Stack direction="row" spacing={2} alignItems="flex-end" justifyContent="space-around">
              <TextField
                label="Current Burden (lbs.)"
                sx={{ input: { fontWeight: '500', fontSize: '16px', textAlign: 'center' } }}
                value={character.currentBurden}
                type="number"
                onChange={(e) =>
                  characterDispatch({
                    type: 'SET_BURDEN',
                    name: character.name,
                    burden: e.target.value ? Number(e.target.value) : 0,
                  })
                }
              />
              <Stack alignItems="center" spacing={1}>
                <FormLabel htmlFor={`${character.name}-daily-action`}>Daily Action</FormLabel>
                <ToggleButtonGroup
                  id={`${character.name}-daily-action`}
                  exclusive
                  value={character.dailyOption ?? 'lookout'}
                  onChange={(_e, value) => {
                    if (value === 'navigate') {
                      if (navigator)
                        characterDispatch({
                          type: 'CHOOSE_OPTION',
                          name: navigator.name,
                          option: 'lookout',
                        });
                      setNavigator(character);
                    }
                    if (character.dailyOption === 'navigate' && value !== 'navigate') {
                      setNavigator(null);
                    }
                    characterDispatch({ type: 'CHOOSE_OPTION', name: character.name, option: value });
                  }}
                >
                  <ToggleButton value="navigate">
                    <Explore />
                  </ToggleButton>
                  <ToggleButton value="forage">
                    <RestaurantMenu />
                  </ToggleButton>
                  <ToggleButton value="lookout">
                    <Security />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>
            {character.dailyOption === 'navigate' ? (
              <Stack spacing={1}>
                <FormLabel htmlFor={`${character.name}-navigation`}>Navigation</FormLabel>
                <Stack
                  id={`${character.name}-navigation`}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <TextField
                    select
                    label="Pace"
                    value={pace}
                    onChange={(e) => setPace(e.target.value as Pace)}
                    sx={{ width: '50%' }}
                    helperText={getPaceEffect(
                      pace,
                      !!navigator?.favoredTerrain && currentHexTerrain.startsWith(navigator.favoredTerrain),
                    )}
                  >
                    <MenuItem value="camp">Stay at Camp</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="slow">Slow</MenuItem>
                    <MenuItem value="fast">Fast</MenuItem>
                  </TextField>
                  <ToggleButtonGroup
                    exclusive
                    value={direction}
                    onChange={(_e, newDirection) => setDirection(newDirection)}
                  >
                    <Stack>
                      <Stack direction="row">
                        <ToggleButton value="northwest">
                          <NorthWest />
                        </ToggleButton>
                        <ToggleButton value="north">
                          <North />
                        </ToggleButton>
                        <ToggleButton value="northeast">
                          <NorthEast />
                        </ToggleButton>
                      </Stack>
                      <Stack direction="row">
                        <ToggleButton value="southwest">
                          <SouthWest />
                        </ToggleButton>
                        <ToggleButton value="south">
                          <South />
                        </ToggleButton>
                        <ToggleButton value="southeast">
                          <SouthEast />
                        </ToggleButton>
                      </Stack>
                    </Stack>
                  </ToggleButtonGroup>
                </Stack>
              </Stack>
            ) : null}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
