import {
  Button,
  List,
  ListItem,
  Stack,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Delete, Close, Check } from '@mui/icons-material';

import { CharacterDialog } from './CharacterDialog';

import { type Character } from './characters';
import { useState } from 'react';

interface PartyStatsProps {
  characters: Character[];
  characterDispatch: any;
}

export const PartyStats = ({ characters, characterDispatch }: PartyStatsProps) => {
  const [characterDialogOpen, setCharacterDialogOpen] = useState(false);

  return (
    <>
      <List>
        {characters.map((character) => (
          <ListItem key={character.name}>
            <Stack sx={{ width: '100%' }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">{character.name}</Typography>
                <IconButton onClick={() => characterDispatch({ type: 'DELETE_CHARACER', name: character.name })}>
                  <Delete />
                </IconButton>
              </Stack>
              <Table>
                <TableHead sx={{ '.MuiTableCell-root': { textAlign: 'center' } }}>
                  <TableRow>
                    <TableCell>Con Modifier</TableCell>
                    <TableCell>Wis Modifier</TableCell>
                    <TableCell>Survival Modifier</TableCell>
                    <TableCell>Str Score</TableCell>
                    <TableCell>Is Ranger?</TableCell>
                    <TableCell>Is Wanderer?</TableCell>
                    <TableCell>Wearing Armor?</TableCell>
                    <TableCell>Favored Terrain</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ '.MuiTableCell-root': { fontSize: 16, fontWeight: '500', textAlign: 'center' } }}>
                  <TableRow>
                    <TableCell>{character.conModifier}</TableCell>
                    <TableCell>{character.wisModifier}</TableCell>
                    <TableCell>{character.survivalModifier}</TableCell>
                    <TableCell>{character.strScore}</TableCell>
                    <TableCell>
                      {character.isRanger ? <Check htmlColor="success" /> : <Close htmlColor="error" />}
                    </TableCell>
                    <TableCell>
                      {character.isWanderer ? <Check htmlColor="success" /> : <Close htmlColor="error" />}
                    </TableCell>
                    <TableCell>
                      {character.hasMediumOrHeavyArmor ? <Check htmlColor="success" /> : <Close htmlColor="error" />}
                    </TableCell>
                    <TableCell>
                      {character.favoredTerrain
                        ? String(character.favoredTerrain).charAt(0).toUpperCase() +
                          String(character.favoredTerrain).slice(1)
                        : ''}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableHead sx={{ '.MuiTableCell-root': { textAlign: 'center' } }}>
                  <TableRow>
                    <TableCell>Exhaustion</TableCell>
                    <TableCell>Days Without Food</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ '.MuiTableCell-root': { fontSize: 24, fontWeight: '500', textAlign: 'center' } }}>
                  <TableRow>
                    <TableCell>{character.levelsOfExhaustion ?? 0}</TableCell>
                    <TableCell>{character.daysWithoutFood ?? 0}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Stack>
          </ListItem>
        ))}
      </List>
      <Button onClick={() => setCharacterDialogOpen(true)}>+ Add Character</Button>
      <CharacterDialog
        open={characterDialogOpen}
        handleClose={() => setCharacterDialogOpen(false)}
        addCharacter={(character: Character) => characterDispatch({ type: 'ADD_CHARACTER', character })}
      />
    </>
  );
};
