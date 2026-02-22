export interface RolePreset {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  roles: Array<{ name: string; description: string }>;
}

export const ROLE_PRESETS: RolePreset[] = [
  {
    id: 'mafia',
    name: 'Classic Mafia',
    description: 'Traditional Mafia game with civilians and mafia members',
    minPlayers: 5,
    maxPlayers: 12,
    roles: [
      { name: 'Mafia Boss', description: 'Lead the mafia to victory' },
      { name: 'Mafia Member', description: 'Work with the boss' },
      { name: 'Detective', description: 'Investigate and find the mafia' },
      { name: 'Doctor', description: 'Save players from elimination' },
      { name: 'Civilian', description: 'Vote to eliminate suspects' },
    ],
  },
  {
    id: 'werewolf',
    name: 'Werewolf',
    description: 'Village vs Werewolves - find the monsters!',
    minPlayers: 6,
    maxPlayers: 15,
    roles: [
      { name: 'Alpha Werewolf', description: 'Lead the pack' },
      { name: 'Werewolf', description: 'Hunt at night' },
      { name: 'Seer', description: 'See true identities' },
      { name: 'Hunter', description: 'Take one down with you' },
      { name: 'Villager', description: 'Survive and deduce' },
    ],
  },
  {
    id: 'secret-hitler',
    name: 'Secret Roles',
    description: 'Hidden identity party game',
    minPlayers: 5,
    maxPlayers: 10,
    roles: [
      { name: 'Liberal Leader', description: 'Lead the liberals' },
      { name: 'Liberal', description: 'Support democracy' },
      { name: 'Fascist Leader', description: 'Hidden dictator' },
      { name: 'Fascist', description: 'Support the leader secretly' },
    ],
  },
  {
    id: 'among-us',
    name: 'Impostor Hunt',
    description: 'Find the impostor among the crew',
    minPlayers: 4,
    maxPlayers: 10,
    roles: [
      { name: 'Impostor', description: 'Eliminate crewmates' },
      { name: 'Sheriff', description: 'Can eliminate once' },
      { name: 'Engineer', description: 'Can vent' },
      { name: 'Crewmate', description: 'Complete tasks and find impostor' },
    ],
  },
  {
    id: 'custom',
    name: 'Custom Game',
    description: 'Create your own roles from scratch',
    minPlayers: 2,
    maxPlayers: 20,
    roles: [],
  },
];

export function getRolePreset(id: string): RolePreset | undefined {
  return ROLE_PRESETS.find(preset => preset.id === id);
}

export function generateRolesFromPreset(preset: RolePreset, playerCount: number) {
  const roles = [...preset.roles];
  const result = [];
  
  // Add roles cyclically until we reach player count
  for (let i = 0; i < playerCount; i++) {
    result.push(roles[i % roles.length]);
  }
  
  return result;
}
