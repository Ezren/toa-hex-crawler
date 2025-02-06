import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from '@mui/material';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Character } from './characters';

interface CharacterDialogProps {
  open: boolean;
  handleClose: () => void;
  addCharacter: (character: Character) => void;
}

interface Inputs {
  name: string;
  conModifier: number;
  wisModifier: number;
  survivalModifier: number;
  strScore: number;
  currentBurden: number;
  isRanger: boolean;
  isWanderer: boolean;
  hasMediumOrHeavyArmor: boolean;
  favoredTerrain?: 'arctic' | 'coast' | 'desert' | 'forest' | 'grassland' | 'mountain' | 'swamp' | 'underdark';
}

export const CharacterDialog = ({ open, handleClose, addCharacter }: CharacterDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addCharacter({ ...data, daysWithoutFood: 0, levelsOfExhaustion: 0, dailyOption: 'forage' });
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        reset();
        handleClose();
      }}
    >
      <DialogTitle>Add a Character</DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}
          sx={(theme) => ({ py: theme.spacing(1) })}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            required
            label="Name"
            slotProps={{
              input: {
                ...register('name'),
              },
            }}
            error={!!errors['name']}
            helperText={errors['name']?.message}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              required
              label="Constitution Modifier"
              type="number"
              slotProps={{
                input: {
                  ...register('conModifier'),
                },
              }}
              error={!!errors['conModifier']}
              helperText={errors['conModifier']?.message}
            />
            <TextField
              required
              label="Wisdom Modifier"
              type="number"
              slotProps={{
                input: {
                  ...register('wisModifier'),
                },
              }}
              error={!!errors['wisModifier']}
              helperText={errors['wisModifier']?.message}
            />
            <TextField
              required
              label="Survival Modifier"
              type="number"
              slotProps={{
                input: {
                  ...register('survivalModifier'),
                },
              }}
              error={!!errors['survivalModifier']}
              helperText={errors['survivalModifier']?.message}
            />
            <TextField
              required
              label="Strength Score"
              type="number"
              slotProps={{
                input: {
                  ...register('strScore'),
                },
              }}
              error={!!errors['strScore']}
              helperText={errors['strScore']?.message}
            />
            <TextField
              required
              label="Current Burden (lbs.)"
              type="number"
              slotProps={{
                input: {
                  ...register('currentBurden'),
                },
              }}
              error={!!errors['currentBurden']}
              helperText={errors['currentBurden']?.message}
            />
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-around">
            <FormControlLabel control={<Checkbox {...register('isRanger')} />} label="Ranger?" />
            <FormControlLabel control={<Checkbox {...register('isWanderer')} />} label="Wanderer?" />
            <FormControlLabel
              control={<Checkbox {...register('hasMediumOrHeavyArmor')} />}
              label="Med or Heavy Armor?"
            />
          </Stack>
          {watch('isRanger') ? (
            <TextField
              label="Favored Terrain"
              select
              slotProps={{
                input: {
                  ...register('favoredTerrain'),
                },
              }}
              error={!!errors['favoredTerrain']}
              helperText={errors['favoredTerrain']?.message}
              sx={{ width: '100%' }}
            >
              <MenuItem value="arctic">Arctic</MenuItem>
              <MenuItem value="coast">Coast</MenuItem>
              <MenuItem value="desert">Desert</MenuItem>
              <MenuItem value="forest">Forest</MenuItem>
              <MenuItem value="grassland">Grassland</MenuItem>
              <MenuItem value="mountain">Mountain</MenuItem>
              <MenuItem value="swamp">Swamp</MenuItem>
              <MenuItem value="underdark">The Underdark</MenuItem>
            </TextField>
          ) : null}
          <Button type="submit">Add character</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
