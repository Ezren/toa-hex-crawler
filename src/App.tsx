import { useEffect, useReducer, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Input,
  List,
  ListItem,
  MenuItem,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { getRandomDirection, rollDice, getPaceEffect, paceModifier } from './utils';
import { rollForEncounter } from './encounters';
import {
  Add,
  Explore,
  North,
  NorthEast,
  NorthWest,
  Remove,
  RestaurantMenu,
  Security,
  South,
  SouthEast,
  SouthWest,
} from '@mui/icons-material';
import { characterReducer, Character, FavoredTerrain } from './characters';

import type { ChultTerrain, Pace, Supplies, TravelDirection } from './types';
import { PartyStats } from './PartyStats';
import { PartyAction } from './PartyActions';

function App() {
  const [currentTab, setCurrentTab] = useState('actions');
  const [day, setDay] = useState(parseInt(localStorage.getItem('day') || '0'));
  const [currentHex, setCurrentHex] = useState(parseInt(localStorage.getItem('currentHex') || '4120')); // Port Nyanzaru https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fg8v2pwzqlqy11.jpg
  const [currentHexTerrain, setCurrentHexTerrain] = useState<ChultTerrain>('forest');
  const [pace, setPace] = useState<Pace>('normal');
  const [direction, setDirection] = useState<TravelDirection>('south');
  const [weather, setWeather] = useState({ weather: '', effect: '' });
  const [characters, characterDispatch] = useReducer(
    characterReducer,
    JSON.parse(localStorage.getItem('characters') || '[]') as Character[],
  );
  const [navigationResult, setNaviationResult] = useState('');
  const [morningEncounter, setMorningEncounter] = useState('');
  const [afternoonEncounter, setAfternoonEncounter] = useState('');
  const [nightEncounter, setNightEncounter] = useState('');
  const [supplies, setSupplies] = useState<Supplies>(
    JSON.parse(
      localStorage.getItem('supplies') ||
        JSON.stringify({
          rainCatchers: 0,
          canoes: 0,
          poundsFood: 0,
          gallonsWater: 0,
        }),
    ),
  );
  const [navigator, setNavigator] = useState<Character | null>(
    characters.find((character) => character.dailyOption === 'navigate') ?? null,
  );

  const allFavoredTerrains = characters.reduce<string[]>((acc, currentCharacter) => {
    const favoredTerrain = currentCharacter.favoredTerrain;
    if (!favoredTerrain || acc.includes(favoredTerrain)) {
      return acc;
    }
    if (favoredTerrain === 'forest') {
      return [...acc, 'forest', 'forestLesser', 'forestGreater'];
    }

    return [...acc, favoredTerrain];
  }, []);

  const supplyBurden =
    supplies.rainCatchers * 5 + supplies.canoes * 100 + supplies.poundsFood + supplies.gallonsWater * 8;
  const excessCapacity = characters.reduce((acc, currCharacter) => {
    const maxCapacity = currCharacter.strScore * 15;
    return acc + maxCapacity - currCharacter.currentBurden;
  }, 0);

  const getWeather = () => {
    const diceRoll = rollDice(20);

    if (diceRoll < 16) {
      return setWeather({ weather: 'Light Rain', effect: 'No special effects' });
    } else if (diceRoll < 19) {
      const inchesOfRain = rollDice(4);
      for (let i = 0; i < supplies.rainCatchers; i++) {
        setSupplies((prev) => ({ ...prev, gallonsWater: prev.gallonsWater + inchesOfRain * 2 }));
      }
      return setWeather({
        weather: 'Heavy Rain',
        effect: `${inchesOfRain} inch(es) of rainfall. Raincatchers collect ${inchesOfRain * 2} gallons of water each. Visibility limited to 150ft.`,
      });
    } else {
      for (let i = 0; i < supplies.rainCatchers; i++) {
        setSupplies((prev) => ({ ...prev, gallonsWater: prev.gallonsWater + 8 }));
      }
      return setWeather({
        weather: 'Tropical Storm',
        effect:
          'At least 4 inches of rain. Raincatchers collect 8 gallons of water each (maximum). Travel by canoe is impossible. Traveling by foot is exhausting. It is easier to become lost.',
      });
    }
  };

  const newDay = () => {
    setDay((prev) => prev + 1);
    getWeather();
    setNaviationResult('');
    setMorningEncounter('');
    setAfternoonEncounter('');
    setNightEncounter('');
    characterDispatch({ type: 'LONG_REST' });
  };

  const getHexesTraveled = (): number => {
    if (pace === 'camp') return 0;

    const inCanoe = currentHexTerrain === 'coast' || currentHexTerrain === 'river';
    const anyCharactersExhausted = characters.some((character) => character.levelsOfExhaustion ?? 0 >= 2);
    const anyCharactersCompletelyExhausted = characters.some((character) => character.levelsOfExhaustion ?? 0 >= 5);
    const roll = rollDice(2);

    if (anyCharactersCompletelyExhausted) return 0;

    if (
      pace === 'normal' ||
      (pace === 'fast' && roll == 1) ||
      (pace === 'slow' && navigator?.favoredTerrain === currentHexTerrain) ||
      (pace === 'slow' && roll === 2)
    ) {
      return (inCanoe ? 2 : 1) - (anyCharactersExhausted ? 1 : 0);
    } else if (pace === 'fast') {
      return (inCanoe ? 3 : 2) - (anyCharactersExhausted ? 1 : 0);
    } else {
      return anyCharactersExhausted ? 0 : inCanoe ? 1 : 0;
    }
  };

  const isHexColumnEven = (hex: number): boolean => parseInt(hex.toString().padStart(4, '0').slice(0, 2)) % 2 === 0;

  const moveCurrentHex = (direction: TravelDirection, numberOfHexes: number) => {
    switch (direction) {
      case 'north':
        return setCurrentHex((prev) => prev - numberOfHexes);
      case 'south':
        return setCurrentHex((prev) => prev + numberOfHexes);
      case 'northeast': {
        let workingHex = currentHex;
        for (let i = 0; i < numberOfHexes; i++) {
          if (isHexColumnEven(workingHex)) {
            workingHex += 99;
          } else {
            workingHex += 100;
          }
        }
        return setCurrentHex(workingHex);
      }
      case 'southeast': {
        let workingHex = currentHex;
        for (let i = 0; i < numberOfHexes; i++) {
          if (isHexColumnEven(workingHex)) {
            workingHex += 100;
          } else {
            workingHex += 101;
          }
        }
        return setCurrentHex(workingHex);
      }
      case 'southwest': {
        let workingHex = currentHex;
        for (let i = 0; i < numberOfHexes; i++) {
          if (isHexColumnEven(workingHex)) {
            workingHex -= 100;
          } else {
            workingHex -= 99;
          }
        }
        return setCurrentHex(workingHex);
      }
      case 'northwest': {
        let workingHex = currentHex;
        for (let i = 0; i < numberOfHexes; i++) {
          if (isHexColumnEven(workingHex)) {
            workingHex -= 101;
          } else {
            workingHex -= 100;
          }
        }
        return setCurrentHex(workingHex);
      }
    }
  };

  const rollNavigation = () => {
    if (!currentHexTerrain || !direction) return;
    const dc = currentHexTerrain === 'coast' ? 10 : 15;
    const roll = rollDice(20) + Number(navigator!.survivalModifier) + paceModifier[pace];
    const hexesTraveled = getHexesTraveled();

    if (pace === 'camp') {
      setNaviationResult('The party rests at camp today.');
    } else if (roll >= dc) {
      setNaviationResult(
        `Navigation success! Party travels ${hexesTraveled} ${hexesTraveled === 1 ? 'hex' : 'hexes'} ${direction}.`,
      );
      moveCurrentHex(direction, hexesTraveled);
    } else {
      const actualDirection = getRandomDirection();
      setNaviationResult(
        `Navigation failed. Party travels ${hexesTraveled} ${hexesTraveled === 1 ? 'hex' : 'hexes'} ${actualDirection}${allFavoredTerrains.includes(currentHexTerrain as FavoredTerrain) ? '.' : ' and is LOST.'}`,
      );
      moveCurrentHex(actualDirection, hexesTraveled);
    }

    if (pace !== 'camp') {
      setMorningEncounter(rollForEncounter(currentHexTerrain));
      setAfternoonEncounter(rollForEncounter(currentHexTerrain));
      setNightEncounter(rollForEncounter(currentHexTerrain));
    }

    const foragingCharacters: Character[] = characters.filter((character) => character.dailyOption === 'forage');

    let totalWaterFound = 0;
    let totalFoodFound = 0;

    foragingCharacters.forEach((character) => {
      const waterRoll = rollDice(20) + Number(character.survivalModifier);
      const foodRoll = rollDice(20) + Number(character.survivalModifier);

      let waterFound = character.isWanderer ? characters.length * 2 : 0;
      let foodFound = character.isWanderer ? characters.length : 0;

      if (waterRoll >= 10) {
        waterFound += Math.max(
          0,
          (rollDice(6) + Number(character.wisModifier)) *
            (character.isRanger && character.favoredTerrain && currentHexTerrain.startsWith(character.favoredTerrain)
              ? 2
              : 1),
        );
        setSupplies((prev) => ({ ...prev, gallonsWater: prev.gallonsWater + waterFound }));
        setNaviationResult((prev) => prev + ` ${character.name} managed to forage ${waterFound} gallons of water.`);
        totalWaterFound += waterFound;
      }

      if (foodRoll >= 10) {
        foodFound += Math.max(
          0,
          (rollDice(6) + Number(character.wisModifier)) *
            (character.isRanger && character.favoredTerrain && currentHexTerrain.startsWith(character.favoredTerrain)
              ? 2
              : 1),
        );
        setSupplies((prev) => ({ ...prev, poundsFood: prev.poundsFood + foodFound }));
        setNaviationResult((prev) => prev + ` ${character.name} managed to forage ${foodFound} pounds of food.`);
        totalFoodFound += foodFound;
      }
    });

    if (supplies.poundsFood + totalFoodFound < characters.length) {
      setNaviationResult((prev) => prev + ' There is not enough food to go around. The party goes to bed hungry.');
      characterDispatch({ type: 'FAMINE' });
      setSupplies((prev) => ({ ...prev, poundsFood: 0 }));
    } else {
      setNaviationResult((prev) => prev + ' The party has enough food. They go to bed with a full stomach.');
      characterDispatch({ type: 'FEAST' });
      setSupplies((prev) => ({ ...prev, poundsFood: prev.poundsFood - characters.length }));
    }

    if (supplies.gallonsWater + totalWaterFound < characters.length * 2) {
      setNaviationResult((prev) => prev + ' The party runs out of water before the end of the day.');
      setSupplies((prev) => ({ ...prev, gallonsWater: 0 }));
      characterDispatch({ type: 'DEHYDRATE', pace });
    } else {
      setNaviationResult((prev) => prev + ' The party has enough water to keep everyone satisfied.');
      setSupplies((prev) => ({ ...prev, gallonsWater: prev.gallonsWater - characters.length * 2 }));
    }

    if (weather.weather === 'Tropical Storm' && pace !== 'camp') {
      characterDispatch({ type: 'STORM_TRAVEL' });
    }
  };

  useEffect(() => {
    getWeather();
    // These effects are only meant to be run once on render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('day', day.toString());
  }, [day]);

  useEffect(() => {
    localStorage.setItem('currentHex', currentHex.toString());
  }, [currentHex]);

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    localStorage.setItem('supplies', JSON.stringify(supplies));
  }, [supplies]);

  return (
    <Box
      component="main"
      sx={(theme) => ({
        textAlign: 'center',
        display: 'grid',
        gridTemplateAreas: `
          "navigation characters"
          "actions    actions"
        `,
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr min-content',
        gap: theme.spacing(2),
        '@media (max-width: 1750px)': {
          gridTemplateAreas: `
            "navigation"
            "characters"
            "actions"
          `,
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr 1fr min-content',
        },
      })}
    >
      <Card sx={{ gridArea: 'navigation' }}>
        <CardContent component={Stack} spacing={2}>
          <Typography variant="h4">Daily Log</Typography>
          <Stack direction="row" spacing={3} alignItems="center" px={2}>
            <Stack spacing={1}>
              <Stack direction="row">
                <IconButton onClick={() => moveCurrentHex('northwest', 1)}>
                  <NorthWest />
                </IconButton>
                <IconButton onClick={() => moveCurrentHex('north', 1)}>
                  <North />
                </IconButton>
                <IconButton onClick={() => moveCurrentHex('northeast', 1)}>
                  <NorthEast />
                </IconButton>
              </Stack>
              <Typography variant="h4">{currentHex.toString().padStart(4, '0')}</Typography>
              <Stack direction="row">
                <IconButton onClick={() => moveCurrentHex('southwest', 1)}>
                  <SouthWest />
                </IconButton>
                <IconButton onClick={() => moveCurrentHex('south', 1)}>
                  <South />
                </IconButton>
                <IconButton onClick={() => moveCurrentHex('southeast', 1)}>
                  <SouthEast />
                </IconButton>
              </Stack>
            </Stack>
            <TextField
              select
              label="Terrain"
              value={currentHexTerrain}
              onChange={(e) => setCurrentHexTerrain(e.target.value as ChultTerrain)}
              sx={{ width: '100%' }}
            >
              <MenuItem value="coast">Coast</MenuItem>
              <MenuItem value="desert">Wasteland</MenuItem>
              <MenuItem value="forest">Jungle</MenuItem>
              <MenuItem value="forestLesser">Jungle (Lesser Undead)</MenuItem>
              <MenuItem value="forestGreater">Jungle (Greater Undead)</MenuItem>
              <MenuItem value="mountain">Mountain</MenuItem>
              <MenuItem value="river">River</MenuItem>
              <MenuItem value="ruins">Ruins</MenuItem>
              <MenuItem value="swamp">Swamp</MenuItem>
            </TextField>
            <Stack sx={{ minWidth: '250px' }}>
              <Typography variant="h5">{weather.weather}</Typography>
              <Typography>{weather.effect}</Typography>
            </Stack>

            <Stack sx={{ minWidth: '100px' }}>
              <Typography variant="h5">Day</Typography>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <IconButton onClick={() => setDay((prev) => prev - 1)}>
                  <Remove />
                </IconButton>
                <Typography variant="h6">{day}</Typography>
                <IconButton onClick={() => setDay((prev) => prev + 1)}>
                  <Add />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          <Typography variant="h6">{navigationResult}</Typography>
          <Stack direction="row" justifyContent="space-around">
            <Stack>
              <Typography variant="h5">Morning</Typography>
              <Typography variant="h6">{morningEncounter}</Typography>
            </Stack>
            <Stack>
              <Typography variant="h5">Afternoon</Typography>
              <Typography variant="h6">{afternoonEncounter}</Typography>
            </Stack>
            <Stack>
              <Typography variant="h5">Night</Typography>
              <Typography variant="h6">{nightEncounter}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ gridArea: 'characters' }}>
        <CardContent>
          <Typography variant="h4">Party</Typography>
          <Stack alignItems="flex-start" px={2} spacing={1}>
            <Typography variant="h5">Supplies</Typography>
            <Table>
              <TableHead sx={{ '.MuiTableCell-root': { textAlign: 'center' } }}>
                <TableRow>
                  <TableCell>Rain Catchers</TableCell>
                  <TableCell>Canoes</TableCell>
                  <TableCell>Gallons of Water</TableCell>
                  <TableCell>Pounds of Food</TableCell>
                  <TableCell>Supply Burden (lbs.)</TableCell>
                  <TableCell>Party Excess Capacity (lbs.)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ '.MuiTableCell-root': { fontSize: 16, fontWeight: '500', textAlign: 'center' } }}>
                <TableRow>
                  <TableCell>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                      <IconButton
                        onClick={() => setSupplies((prev) => ({ ...prev, rainCatchers: prev.rainCatchers - 1 }))}
                      >
                        <Remove />
                      </IconButton>
                      <Typography variant="h6">{supplies.rainCatchers}</Typography>
                      <IconButton
                        onClick={() => setSupplies((prev) => ({ ...prev, rainCatchers: prev.rainCatchers + 1 }))}
                      >
                        <Add />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                      <IconButton onClick={() => setSupplies((prev) => ({ ...prev, canoes: prev.canoes - 1 }))}>
                        <Remove />
                      </IconButton>
                      <Typography variant="h6">{supplies.canoes}</Typography>
                      <IconButton onClick={() => setSupplies((prev) => ({ ...prev, canoes: prev.canoes + 1 }))}>
                        <Add />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                      <IconButton
                        onClick={() => setSupplies((prev) => ({ ...prev, gallonsWater: prev.gallonsWater - 1 }))}
                      >
                        <Remove />
                      </IconButton>
                      <Typography variant="h6">{supplies.gallonsWater}</Typography>
                      <IconButton
                        onClick={() => setSupplies((prev) => ({ ...prev, gallonsWater: prev.gallonsWater + 1 }))}
                      >
                        <Add />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                      <IconButton onClick={() => setSupplies((prev) => ({ ...prev, poundsFood: prev.poundsFood - 1 }))}>
                        <Remove />
                      </IconButton>
                      <Typography variant="h6">{supplies.poundsFood}</Typography>
                      <IconButton onClick={() => setSupplies((prev) => ({ ...prev, poundsFood: prev.poundsFood + 1 }))}>
                        <Add />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={(theme) => ({
                        color: supplyBurden <= excessCapacity ? theme.palette.success.dark : theme.palette.error.dark,
                      })}
                    >
                      {supplyBurden}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{excessCapacity}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={(_e, value) => setCurrentTab(value)} aria-label="party information">
                <Tab label="Party Actions" value="actions" />
                <Tab label="Party Stats" value="stats" />
              </TabList>
            </Box>
            <TabPanel value="actions">
              <PartyAction
                characters={characters}
                characterDispatch={characterDispatch}
                navigator={navigator}
                setNavigator={setNavigator}
                pace={pace}
                setPace={setPace}
                direction={direction}
                setDirection={setDirection}
                currentHexTerrain={currentHexTerrain}
              />
            </TabPanel>
            <TabPanel value="stats">
              <PartyStats characters={characters} characterDispatch={characterDispatch} />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
      <Card
        component={Stack}
        direction="row"
        sx={{ gridArea: 'actions', justifySelf: 'center', width: '600px', height: '100px' }}
      >
        <Button
          disabled={!(currentHexTerrain && navigator && direction) || !!navigationResult}
          onClick={rollNavigation}
          variant="contained"
          size="large"
          fullWidth
        >
          Navigate
        </Button>
        <Button
          onClick={newDay}
          disabled={!navigationResult || supplyBurden > excessCapacity}
          variant="contained"
          size="large"
          fullWidth
        >
          Next Day
        </Button>
      </Card>
    </Box>
  );
}

export default App;
