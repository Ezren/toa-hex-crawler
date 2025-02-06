import { rollDice } from './utils';

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

export const rollForEncounter = (terrain: ChultTerrain): string => {
  const encounterRoll = rollDice(20);

  if (encounterRoll < 16) return 'No encounters';

  switch (terrain) {
    case 'coast':
      return rollCoastEncounter();
    case 'desert':
      return rollWastelandEncounter();
    case 'forest':
      return rollJungleEncounter();
    case 'forestLesser':
      return rollLesserUndeadJungleEncounter();
    case 'forestGreater':
      return rollGreaterUndeadJungleEncounter();
    case 'mountain':
      return rollMountainEncounter();
    case 'river':
      return rollRiverEncounter();
    case 'ruins':
      return rollRuinsEncounter();
    case 'swamp':
      return rollSwampEncounter();
  }
};

const rollCoastEncounter = (): string => {
  const encounterRoll = rollDice(100);

  if (encounterRoll <= 7) {
    return 'Aarakocra';
  } else if (encounterRoll === 8) {
    return 'Artus Cimber';
  } else if (encounterRoll <= 10) {
    return rollCacheContents();
  } else if (encounterRoll <= 12) {
    return 'Chwinga';
  } else if (encounterRoll <= 14) {
    return 'Dinosaurs, allosaurus';
  } else if (encounterRoll <= 16) {
    return 'Dinosarus, dimetrodon';
  } else if (encounterRoll <= 21) {
    return 'Dinosaurs, plesiosaurus';
  } else if (encounterRoll <= 28) {
    return 'Dinosaurs, pteranodon';
  } else if (encounterRoll <= 31) {
    return 'Dinosaurs, quetzalcoatlus';
  } else if (encounterRoll <= 37) {
    return 'Dinosaurs, velociraptor';
  } else if (encounterRoll <= 40) {
    return 'Dragon, red';
  } else if (encounterRoll <= 42) {
    return 'Emerald Enclave';
  } else if (encounterRoll <= 46) {
    return 'Explorers';
  } else if (encounterRoll <= 49) {
    return 'Flaming Fist';
  } else if (encounterRoll <= 52) {
    return 'Flying monkeys';
  } else if (encounterRoll <= 55) {
    return 'Flying snakes';
  } else if (encounterRoll <= 57) {
    return 'Frost giants';
  } else if (encounterRoll <= 63) {
    return 'Giant lizards';
  } else if (encounterRoll <= 67) {
    return 'Giant snapping turtle';
  } else if (encounterRoll <= 71) {
    return 'Lizardfolk';
  } else if (encounterRoll <= 74) {
    return 'Red Wizard';
  } else if (encounterRoll <= 84) {
    return 'Sea hags';
  } else if (encounterRoll <= 87) {
    return 'Stirges';
  } else if (encounterRoll <= 89) {
    return 'Swarm of bats';
  } else if (encounterRoll <= 94) {
    return 'Tabaxi hunter';
  } else {
    return 'Tri-flower frond';
  }
};

const rollWastelandEncounter = (): string => {
  const encounterRoll = rollDice(100);

  if (encounterRoll === 1) {
    return 'Artus Cimber';
  } else if (encounterRoll <= 5) {
    return rollCacheContents();
  } else if (encounterRoll <= 9) {
    return 'Dragon, red';
  } else if (encounterRoll <= 18) {
    return 'Explorer, dead';
  } else if (encounterRoll === 19) {
    return 'Explorers';
  } else if (encounterRoll <= 37) {
    return 'Firenewts';
  } else if (encounterRoll <= 45) {
    return 'Giant scorpions';
  } else if (encounterRoll <= 54) {
    return 'Magmins';
  } else if (encounterRoll <= 71) {
    return 'Mephits';
  } else if (encounterRoll <= 78) {
    return 'Night hag';
  } else if (encounterRoll === 79) {
    return 'Statue of Ubtao';
  } else if (encounterRoll <= 83) {
    return 'Troll';
  } else if (encounterRoll <= 85) {
    return 'Undead, ghouls';
  } else if (encounterRoll <= 95) {
    return 'Undead, skeletons';
  } else if (encounterRoll <= 97) {
    return 'Undead, wight';
  } else if (encounterRoll === 98) {
    return 'Undead, zombies';
  } else {
    return 'Zhentarim';
  }
};

const rollJungleEncounter = (): string => {
  const encounterRoll = rollDice(100);

  if (encounterRoll === 1) {
    return 'Albino dwarves';
  } else if (encounterRoll === 2) {
    return 'Almiraj';
  } else if (encounterRoll <= 4) {
    return 'Apes';
  } else if (encounterRoll === 5) {
    return 'Artus Cimber';
  } else if (encounterRoll <= 7) {
    return 'Assassin vines';
  } else if (encounterRoll === 8) {
    return 'Axe beaks';
  } else if (encounterRoll === 9) {
    return 'Baboons';
  } else if (encounterRoll <= 11) {
    return rollCacheContents();
  } else if (encounterRoll <= 13) {
    return 'Cannibals';
  } else if (encounterRoll <= 15) {
    return 'Chwinga';
  } else if (encounterRoll === 16) {
    return 'Cyclops';
  } else if (encounterRoll === 17) {
    return 'Dinosaurs, allosaurus';
  } else if (encounterRoll === 18) {
    return 'Dinosaurs, ankylosaurus';
  } else if (encounterRoll === 19) {
    return 'Dinosaurs, brontosaurus';
  } else if (encounterRoll <= 21) {
    return 'Dinosaurs, deinonychus';
  } else if (encounterRoll <= 23) {
    return 'Dinosaurs, hadrosaurus';
  } else if (encounterRoll === 24) {
    return 'Dinosaurs, pteranodon';
  } else if (encounterRoll <= 26) {
    return 'Dinosaurs, stegosaurus';
  } else if (encounterRoll <= 28) {
    return 'Dinosaurs, triceratops';
  } else if (encounterRoll <= 30) {
    return 'Dinosaurs, tyrannosaurus';
  } else if (encounterRoll <= 35) {
    return 'Dinosaurs, velociraptor';
  } else if (encounterRoll === 36) {
    return 'Dragon, faerie';
  } else if (encounterRoll === 37) {
    return 'Eblis';
  } else if (encounterRoll <= 42) {
    return 'Emerald Enclave';
  } else if (encounterRoll <= 44) {
    return 'Explorer, dead';
  } else if (encounterRoll === 45) {
    return 'Explorers';
  } else if (encounterRoll === 46) {
    return 'Flail snail';
  } else if (encounterRoll <= 50) {
    return 'Flaming Fist';
  } else if (encounterRoll === 51) {
    return 'Flying monkeys';
  } else if (encounterRoll <= 53) {
    return 'Flying snakes';
  } else if (encounterRoll <= 55) {
    return 'Frost giants';
  } else if (encounterRoll === 56) {
    return 'Giant boars';
  } else if (encounterRoll === 57) {
    return 'Giant frogs';
  } else if (encounterRoll === 58) {
    return 'Giant lizards';
  } else if (encounterRoll === 59) {
    return 'Giant scorpions';
  } else if (encounterRoll === 60) {
    return 'Giant wasps';
  } else if (encounterRoll <= 62) {
    return 'Girallons';
  } else if (encounterRoll <= 64) {
    return 'Goblins';
  } else if (encounterRoll <= 66) {
    return 'Grungs';
  } else if (encounterRoll === 67) {
    return 'Jaculis';
  } else if (encounterRoll === 68) {
    return 'Kamadans';
  } else if (encounterRoll <= 70) {
    return 'Lizardfolk';
  } else if (encounterRoll <= 72) {
    return 'Magic mist';
  } else if (encounterRoll === 73) {
    return 'Mantraps';
  } else if (encounterRoll === 74) {
    return 'Night hag';
  } else if (encounterRoll === 75) {
    return 'Pterafolk';
  } else if (encounterRoll === 76) {
    return 'Rare plant(s)';
  } else if (encounterRoll === 77) {
    return 'Red Wizard';
  } else if (encounterRoll <= 79) {
    return 'Snake, constrictor';
  } else if (encounterRoll === 80) {
    return 'Snake, giant constrictor';
  } else if (encounterRoll === 81) {
    return 'Snake, giant poisonous';
  } else if (encounterRoll === 82) {
    return 'Spiders';
  } else if (encounterRoll <= 85) {
    return 'Statue of Ubtao';
  } else if (encounterRoll === 86) {
    return 'Stirges';
  } else if (encounterRoll === 87) {
    return 'Su-monsters';
  } else if (encounterRoll === 88) {
    return 'Swarms of bats';
  } else if (encounterRoll === 89) {
    return 'Swarms of insects';
  } else if (encounterRoll === 90) {
    return 'Tabaxi hunter';
  } else if (encounterRoll === 91) {
    return 'Tiger';
  } else if (encounterRoll === 92) {
    return 'Tri-flower frond';
  } else if (encounterRoll === 93) {
    return 'Vegepygmies';
  } else if (encounterRoll === 94) {
    return 'Wereboar';
  } else if (encounterRoll === 95) {
    return 'Weretiger';
  } else if (encounterRoll === 96) {
    return 'Winterscape';
  } else if (encounterRoll === 97) {
    return 'Yellow musk creeper and zombies';
  } else if (encounterRoll === 98) {
    return 'Yuan-ti';
  } else if (encounterRoll === 99) {
    return 'Zhentarim';
  } else {
    return 'Zorbos';
  }
};

const rollLesserUndeadJungleEncounter = (): string => {
  const encounterRoll = rollDice(100);

  if (encounterRoll === 1) {
    return 'Albino dwarves';
  } else if (encounterRoll === 2) {
    return 'Artus Cimber';
  } else if (encounterRoll <= 5) {
    return 'Assassin vines';
  } else if (encounterRoll === 6) {
    return 'Axe beaks';
  } else if (encounterRoll <= 8) {
    return rollCacheContents();
  } else if (encounterRoll <= 10) {
    return 'Cannibals';
  } else if (encounterRoll === 11) {
    return 'Dinosaurs, allosaurus';
  } else if (encounterRoll === 12) {
    return 'Dinosaurs, ankylosaurus';
  } else if (encounterRoll === 13) {
    return 'Dinosaurs, deinonychus';
  } else if (encounterRoll === 14) {
    return 'Dinosaurs, hadrosaurus';
  } else if (encounterRoll === 15) {
    return 'Dinosaurs, pteranodon';
  } else if (encounterRoll === 16) {
    return 'Dinosaurs, stegosaurus';
  } else if (encounterRoll === 17) {
    return 'Dinosaurs, triceratops';
  } else if (encounterRoll === 18) {
    return 'Dinosaurs, tyrannosaurus';
  } else if (encounterRoll <= 20) {
    return 'Emerald Enclave';
  } else if (encounterRoll <= 22) {
    return 'Explorer, dead';
  } else if (encounterRoll === 23) {
    return 'Explorers';
  } else if (encounterRoll <= 26) {
    return 'Flaming Fist';
  } else if (encounterRoll === 27) {
    return 'Flying snakes';
  } else if (encounterRoll === 28) {
    return 'Giant lizards';
  } else if (encounterRoll === 29) {
    return 'Giant wasps';
  } else if (encounterRoll <= 31) {
    return 'Girallons';
  } else if (encounterRoll <= 33) {
    return 'Goblins';
  } else if (encounterRoll <= 35) {
    return 'Grungs';
  } else if (encounterRoll <= 39) {
    return 'Magic mist';
  } else if (encounterRoll <= 41) {
    return 'Mantraps';
  } else if (encounterRoll === 42) {
    return 'Night hag';
  } else if (encounterRoll <= 44) {
    return 'Pterafolk';
  } else if (encounterRoll === 45) {
    return 'Rare plant(s)';
  } else if (encounterRoll === 46) {
    return 'Red Wizard';
  } else if (encounterRoll <= 48) {
    return 'Snake, constrictor';
  } else if (encounterRoll === 49) {
    return 'Snake, giant constrictor';
  } else if (encounterRoll === 50) {
    return 'Snake, giant poisonous';
  } else if (encounterRoll <= 52) {
    return 'Spiders';
  } else if (encounterRoll <= 55) {
    return 'Statue of Ubtao';
  } else if (encounterRoll <= 57) {
    return 'Stirges';
  } else if (encounterRoll <= 59) {
    return 'Su-monsters';
  } else if (encounterRoll <= 62) {
    return 'Swarms of bats';
  } else if (encounterRoll <= 65) {
    return 'Swarms of insects';
  } else if (encounterRoll === 66) {
    return 'Tri-flower frond';
  } else if (encounterRoll === 67) {
    return 'Troll';
  } else if (encounterRoll <= 72) {
    return 'Undead, ghouls';
  } else if (encounterRoll <= 77) {
    return 'Undead, skeletons';
  } else if (encounterRoll <= 79) {
    return 'Undead, specter';
  } else if (encounterRoll === 80) {
    return 'Undead, wight';
  } else if (encounterRoll <= 89) {
    return 'Undead, zombies';
  } else if (encounterRoll <= 91) {
    return 'Vegepygmies';
  } else if (encounterRoll === 92) {
    return 'Wereboar';
  } else if (encounterRoll === 93) {
    return 'Weretiger';
  } else if (encounterRoll === 94) {
    return 'Winterscape';
  } else if (encounterRoll <= 96) {
    return 'Yellow musk creeper and zombies';
  } else if (encounterRoll <= 98) {
    return 'Yuan-ti';
  } else if (encounterRoll === 99) {
    return 'Zhentarim';
  } else {
    return 'Zorbos';
  }
};

const rollGreaterUndeadJungleEncounter = (): string => {
  const encounterRoll = rollDice(100);

  if (encounterRoll === 1) {
    return 'Artus Cimber';
  } else if (encounterRoll === 2) {
    return 'Assassin vines';
  } else if (encounterRoll <= 5) {
    return rollCacheContents();
  } else if (encounterRoll === 6) {
    return 'Dinosaurs, allosaurus';
  } else if (encounterRoll === 7) {
    return 'Dinosaurs, ankylosaurus';
  } else if (encounterRoll === 8) {
    return 'Dinosaurs, hadrosaurus';
  } else if (encounterRoll === 9) {
    return 'Dinosaurs, pteranodon';
  } else if (encounterRoll === 10) {
    return 'Dinosaurs, stegosaurus';
  } else if (encounterRoll <= 12) {
    return 'Dinosaurs, tyrannosaurus';
  } else if (encounterRoll <= 14) {
    return 'Dinosaurs, velociraptor';
  } else if (encounterRoll <= 16) {
    return 'Emerald Enclave';
  } else if (encounterRoll <= 20) {
    return 'Explorer, dead';
  } else if (encounterRoll === 21) {
    return 'Explorers';
  } else if (encounterRoll <= 23) {
    return 'Flaming Fist';
  } else if (encounterRoll === 24) {
    return 'Giant wasps';
  } else if (encounterRoll === 25) {
    return 'Mantraps';
  } else if (encounterRoll === 26) {
    return 'Pterafolk';
  } else if (encounterRoll === 27) {
    return 'Rare plant(s)';
  } else if (encounterRoll === 28) {
    return 'Red Wizard';
  } else if (encounterRoll <= 31) {
    return 'Snake, constrictor';
  } else if (encounterRoll === 32) {
    return 'Snake, giant constrictor';
  } else if (encounterRoll === 33) {
    return 'Snake, giant poisonous';
  } else if (encounterRoll <= 36) {
    return 'Spiders';
  } else if (encounterRoll <= 40) {
    return 'Statue of Ubtao';
  } else if (encounterRoll <= 44) {
    return 'Stirges';
  } else if (encounterRoll === 45) {
    return 'Su-monsters';
  } else if (encounterRoll === 46) {
    return 'Swarms of bats';
  } else if (encounterRoll <= 49) {
    return 'Swarms of insects';
  } else if (encounterRoll === 50) {
    return 'Tri-flower frond';
  } else if (encounterRoll === 51) {
    return 'Troll';
  } else if (encounterRoll <= 63) {
    return 'Undead, ghouls';
  } else if (encounterRoll <= 67) {
    return 'Undead, skeletons';
  } else if (encounterRoll <= 70) {
    return 'Undead, specter';
  } else if (encounterRoll <= 73) {
    return 'Undead, wight';
  } else if (encounterRoll <= 85) {
    return 'Undead, zombies';
  } else if (encounterRoll <= 87) {
    return 'Vegepygmies';
  } else if (encounterRoll <= 89) {
    return 'Wereboar';
  } else if (encounterRoll <= 91) {
    return 'Weretiger';
  } else if (encounterRoll === 92) {
    return 'Winterscape';
  } else if (encounterRoll <= 96) {
    return 'Yellow musk creeper and zombies';
  } else if (encounterRoll <= 98) {
    return 'Yuan-ti';
  } else {
    return 'Zorbos';
  }
};

const rollMountainEncounter = (): string => {
  const encounterRoll = rollDice(100);

  if (encounterRoll <= 11) {
    return 'Aarakocra';
  } else if (encounterRoll <= 17) {
    return 'Albino dwarves';
  } else if (encounterRoll <= 20) {
    return 'Apes';
  } else if (encounterRoll <= 22) {
    return 'Baboons';
  } else if (encounterRoll <= 25) {
    return rollCacheContents();
  } else if (encounterRoll <= 27) {
    return 'Chwinga';
  } else if (encounterRoll <= 29) {
    return 'Cyclops';
  } else if (encounterRoll <= 38) {
    return 'Dinosaurs, pteranodon';
  } else if (encounterRoll <= 42) {
    return 'Dinosaurs, quetzalcoatlus';
  } else if (encounterRoll <= 45) {
    return 'Dragon, red';
  } else if (encounterRoll <= 47) {
    return 'Emerald Enclave';
  } else if (encounterRoll <= 50) {
    return 'Explorer, dead';
  } else if (encounterRoll <= 53) {
    return 'Explorers';
  } else if (encounterRoll <= 59) {
    return 'Flying monkeys';
  } else if (encounterRoll <= 61) {
    return 'Flying snakes';
  } else if (encounterRoll === 62) {
    return 'Giant boars';
  } else if (encounterRoll === 63) {
    return 'Giant lizards';
  } else if (encounterRoll <= 65) {
    return 'Giant wasps';
  } else if (encounterRoll <= 70) {
    return 'Girallons';
  } else if (encounterRoll <= 73) {
    return 'Night hag';
  } else if (encounterRoll <= 80) {
    return 'Pterafolk';
  } else if (encounterRoll === 81) {
    return 'Red Wizard';
  } else if (encounterRoll <= 84) {
    return 'Snake, giant poisonous';
  } else if (encounterRoll <= 87) {
    return 'Stirges';
  } else if (encounterRoll <= 90) {
    return 'Swarms of bats';
  } else if (encounterRoll <= 92) {
    return 'Tabaxi hunter';
  } else if (encounterRoll <= 97) {
    return 'Troll';
  } else {
    return 'Wereboar';
  }
};

const rollRiverEncounter = (): string => {
  const encounterRoll = rollDice(100);

  if (encounterRoll <= 3) {
    return 'Aarakocra';
  } else if (encounterRoll <= 7) {
    return 'Aldani';
  } else if (encounterRoll <= 9) {
    return 'Artus Cimber';
  } else if (encounterRoll === 10) {
    return 'Assassin vines';
  } else if (encounterRoll <= 12) {
    return rollCacheContents();
  } else if (encounterRoll <= 15) {
    return 'Cannibals';
  } else if (encounterRoll <= 18) {
    return 'Chwinga';
  } else if (encounterRoll <= 23) {
    return 'Crocodiles';
  } else if (encounterRoll === 24) {
    return 'Dinosaurs, brontosaurus';
  } else if (encounterRoll <= 26) {
    return 'Dinosaurs, dimetrodon';
  } else if (encounterRoll <= 28) {
    return 'Dinosaurs, hadrosaurus';
  } else if (encounterRoll <= 31) {
    return 'Dinosaurs, plesiosaurus';
  } else if (encounterRoll <= 34) {
    return 'Dinosaurs, pteranodon';
  } else if (encounterRoll <= 36) {
    return 'Dinosaurs, quetzalcoatlus';
  } else if (encounterRoll === 37) {
    return 'Dragon, faerie';
  } else if (encounterRoll <= 40) {
    return 'Eblis';
  } else if (encounterRoll <= 43) {
    return 'Emerald Enclave';
  } else if (encounterRoll <= 45) {
    return 'Explorer, dead';
  } else if (encounterRoll <= 49) {
    return 'Explorers';
  } else if (encounterRoll <= 51) {
    return 'Flaming Fist';
  } else if (encounterRoll <= 53) {
    return 'Flying monkeys';
  } else if (encounterRoll <= 55) {
    return 'Flying snakes';
  } else if (encounterRoll <= 58) {
    return 'Giant crocodile';
  } else if (encounterRoll <= 60) {
    return 'Giant frogs';
  } else if (encounterRoll <= 62) {
    return 'Giant snapping turtle';
  } else if (encounterRoll === 63) {
    return 'Giant wasps';
  } else if (encounterRoll <= 66) {
    return 'Grungs';
  } else if (encounterRoll === 67) {
    return 'Jaculis';
  } else if (encounterRoll === 68) {
    return 'Lizardfolk';
  } else if (encounterRoll <= 70) {
    return 'Magic mist';
  } else if (encounterRoll <= 72) {
    return 'Pterafolk';
  } else if (encounterRoll === 73) {
    return 'Rare plant(s)';
  } else if (encounterRoll === 74) {
    return 'Red Wizard';
  } else if (encounterRoll <= 76) {
    return 'Sea hags';
  } else if (encounterRoll <= 79) {
    return 'Snake, constrictor';
  } else if (encounterRoll === 80) {
    return 'Snake, giant constrictor';
  } else if (encounterRoll === 81) {
    return 'Statue of Ubtao';
  } else if (encounterRoll <= 83) {
    return 'Stirges';
  } else if (encounterRoll <= 85) {
    return 'Swarm of insects';
  } else if (encounterRoll <= 91) {
    return 'Swarms of quippers';
  } else if (encounterRoll <= 93) {
    return 'Tabaxi hunter';
  } else if (encounterRoll === 94) {
    return 'Undead, ghouls';
  } else if (encounterRoll === 95) {
    return 'Undead, skeletons';
  } else if (encounterRoll === 96) {
    return 'Undead, zombies';
  } else if (encounterRoll <= 98) {
    return 'Yuan-ti';
  } else {
    return 'Zhentarim';
  }
};

const rollRuinsEncounter = (): string => {
  const encounterRoll = rollDice(100);

  if (encounterRoll <= 2) {
    return 'Albino dwarves';
  } else if (encounterRoll === 3) {
    return 'Almiraj';
  } else if (encounterRoll <= 6) {
    return 'Apes';
  } else if (encounterRoll <= 8) {
    return 'Artus Cimber';
  } else if (encounterRoll <= 12) {
    return 'Assassin vines';
  } else if (encounterRoll <= 14) {
    return 'Baboons';
  } else if (encounterRoll <= 18) {
    return rollCacheContents();
  } else if (encounterRoll === 19) {
    return 'Chwinga';
  } else if (encounterRoll <= 21) {
    return 'Cyclops';
  } else if (encounterRoll === 22) {
    return 'Dinosaurs, deinonychus';
  } else if (encounterRoll === 23) {
    return 'Dinosaurs, velociraptor';
  } else if (encounterRoll <= 26) {
    return 'Emerald Enclave';
  } else if (encounterRoll <= 28) {
    return 'Explorer, dead';
  } else if (encounterRoll <= 31) {
    return 'Explorers';
  } else if (encounterRoll <= 33) {
    return 'Flail snail';
  } else if (encounterRoll <= 36) {
    return 'Flaming Fist';
  } else if (encounterRoll <= 38) {
    return 'Flying monkeys';
  } else if (encounterRoll === 39) {
    return 'Flying snakes';
  } else if (encounterRoll <= 41) {
    return 'Frost giants';
  } else if (encounterRoll === 42) {
    return 'Giant lizards';
  } else if (encounterRoll <= 45) {
    return 'Giant scorpions';
  } else if (encounterRoll <= 48) {
    return 'Giant wasps';
  } else if (encounterRoll <= 50) {
    return 'Girallons';
  } else if (encounterRoll <= 52) {
    return 'Goblins';
  } else if (encounterRoll <= 54) {
    return 'Jaculis';
  } else if (encounterRoll <= 57) {
    return 'Kamadans';
  } else if (encounterRoll === 58) {
    return 'Lizardfolk';
  } else if (encounterRoll <= 60) {
    return 'Magic mist';
  } else if (encounterRoll === 61) {
    return 'Night hag';
  } else if (encounterRoll === 62) {
    return 'Rare plant(s)';
  } else if (encounterRoll === 63) {
    return 'Red Wizard';
  } else if (encounterRoll <= 66) {
    return 'Snake, giant poisonous';
  } else if (encounterRoll <= 68) {
    return 'Spiders';
  } else if (encounterRoll <= 73) {
    return 'Statue of Ubtao';
  } else if (encounterRoll <= 75) {
    return 'Stirges';
  } else if (encounterRoll <= 77) {
    return 'Swarms of bats';
  } else if (encounterRoll === 78) {
    return 'Tabaxi hunter';
  } else if (encounterRoll <= 80) {
    return 'Tri-flower frond';
  } else if (encounterRoll === 81) {
    return 'Troll';
  } else if (encounterRoll <= 84) {
    return 'Undead, ghouls';
  } else if (encounterRoll <= 87) {
    return 'Undead, skeletons';
  } else if (encounterRoll <= 89) {
    return 'Undead, specter';
  } else if (encounterRoll <= 91) {
    return 'Undead, wight';
  } else if (encounterRoll <= 93) {
    return 'Undead, zombies';
  } else if (encounterRoll === 94) {
    return 'Weretiger';
  } else if (encounterRoll === 95) {
    return 'Winterscape';
  } else if (encounterRoll === 96) {
    return 'Yellow musk creeper and zombies';
  } else if (encounterRoll <= 98) {
    return 'Yuan-ti';
  } else {
    return 'Zhentarim';
  }
};
const rollSwampEncounter = (): string => {
  const encounterRoll = rollDice(100);

  if (encounterRoll <= 10) {
    return 'Aldani';
  } else if (encounterRoll === 11) {
    return 'Artus Cimber';
  } else if (encounterRoll <= 14) {
    return 'Assassin vines';
  } else if (encounterRoll <= 16) {
    return 'Chwinga';
  } else if (encounterRoll <= 21) {
    return 'Crocodiles';
  } else if (encounterRoll === 22) {
    return 'Dinosaurs, allosaurus';
  } else if (encounterRoll === 23) {
    return 'Dinosaurs, ankylosaurus';
  } else if (encounterRoll <= 25) {
    return 'Dinosaurs, brontosaurus';
  } else if (encounterRoll <= 30) {
    return 'Dinosaurs, dimetrodon';
  } else if (encounterRoll <= 33) {
    return 'Dinosaurs, hadrosaurus';
  } else if (encounterRoll <= 35) {
    return 'Dinosaurs, pteranodon';
  } else if (encounterRoll <= 39) {
    return 'Eblis';
  } else if (encounterRoll <= 41) {
    return 'Explorer, dead';
  } else if (encounterRoll <= 45) {
    return 'Explorers';
  } else if (encounterRoll <= 47) {
    return 'Flail snail';
  } else if (encounterRoll <= 50) {
    return 'Flying snakes';
  } else if (encounterRoll <= 53) {
    return 'Giant crocodile';
  } else if (encounterRoll <= 56) {
    return 'Giant frogs';
  } else if (encounterRoll <= 58) {
    return 'Giant lizards';
  } else if (encounterRoll <= 60) {
    return 'Giant snapping turtles';
  } else if (encounterRoll <= 62) {
    return 'Giant wasps';
  } else if (encounterRoll <= 64) {
    return 'Grungs';
  } else if (encounterRoll <= 66) {
    return 'Lizardfolk';
  } else if (encounterRoll <= 69) {
    return 'Magic mist';
  } else if (encounterRoll === 70) {
    return 'Mephits';
  } else if (encounterRoll === 71) {
    return 'Night hag';
  } else if (encounterRoll === 72) {
    return 'Rare plant(s)';
  } else if (encounterRoll <= 76) {
    return 'Shambling mound';
  } else if (encounterRoll <= 80) {
    return 'Snake, constrictor';
  } else if (encounterRoll <= 82) {
    return 'Snake, giant constrictor';
  } else if (encounterRoll <= 85) {
    return 'Spiders';
  } else if (encounterRoll <= 87) {
    return 'Statue of Ubtao';
  } else if (encounterRoll <= 89) {
    return 'Swarms of bats';
  } else if (encounterRoll <= 94) {
    return 'Swarm of insects';
  } else if (encounterRoll === 95) {
    return 'Undead, ghouls';
  } else if (encounterRoll <= 97) {
    return 'Undead, skeletons';
  } else if (encounterRoll === 98) {
    return 'Undead, zombies';
  } else if (encounterRoll === 99) {
    return 'Yellow musk creeper and zombies';
  } else {
    return 'Yuan-ti';
  }
};

const rollCacheContents = (): string => {
  const treatureRoll = rollDice(20);

  switch (treatureRoll) {
    case 1:
      return 'Cache: Rain Catcher and mess kit';
    case 2:
      return 'Cache: 10-day supply of preserved rations';
    case 3:
      return 'Cache: 20-day supply of preserved rations';
    case 4:
      return 'Cache: 50-day supply of preserved rations';
    case 5:
      return `Cache: ${rollDice(4)} casks of water holding 5 gallons each`;
    case 6:
      return `Cache: ${rollDice(4)} casks of tej`;
    case 7:
      return `Cache: ${rollDice(4)} climber's kits`;
    case 8:
      return `Cache: coffer containing ${rollDice(4) + rollDice(4)} vials of antitoxin`;
    case 9:
      return 'Cache: 20-day supply of insect repellent salve in a leather tube';
    case 10:
      return `Cache: ${rollDice(4)} quivers, each containing ${rollDice(20)} arrows`;
    case 11:
      return 'Cache: canoe with six paddles';
    case 12:
      return 'Cache: 2 hooded lanters and 10 flasks of lamp oil';
    case 13:
      return `Cache: two-person tent and ${rollDice(4)} explorer's packs`;
    case 14:
      return `Cache: wooden box containing ${rollDice(10) + rollDice(10)} daggers (low quality, of the type used as trade goods)`;
    case 15:
      return "Cache: set of navigator's tools";
    case 16:
      return `Cache: ${rollDice(10)} changes of woolen clothing`;
    case 17:
      return "Cache: set of cartographer's tools";
    case 18:
      return `Cache: two-person tent and ${rollDice(4)} healer's kits`;
    case 19:
      return 'Cache: 2 two-person tents, folding camp table, and four folding stools';
    case 20:
      return `Cache: wooden box containing ${rollDice(4) + rollDice(4)} potions of healing`;
    default:
      return 'Cache';
  }
};
