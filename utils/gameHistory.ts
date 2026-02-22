export interface GameHistoryEntry {
  id: string;
  code: string;
  date: string;
  playerCount: number;
  role?: string;
  isHost: boolean;
}

const HISTORY_KEY = 'chit_game_history';
const MAX_HISTORY = 10;

export function saveGameToHistory(entry: GameHistoryEntry) {
  if (typeof window === 'undefined') return;
  
  try {
    const history = getGameHistory();
    const newHistory = [entry, ...history.filter(h => h.id !== entry.id)].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch (error) {
    console.error('Failed to save game history:', error);
  }
}

export function getGameHistory(): GameHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load game history:', error);
    return [];
  }
}

export function clearGameHistory() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

export function getGameStats() {
  const history = getGameHistory();
  return {
    totalGames: history.length,
    asHost: history.filter(h => h.isHost).length,
    asPlayer: history.filter(h => !h.isHost).length,
    recentRoles: history.filter(h => h.role).map(h => h.role).slice(0, 5),
  };
}
