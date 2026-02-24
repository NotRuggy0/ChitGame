export interface Chit {
  id: string;
  roleName: string;
  description?: string;
}

export interface Player {
  id: string;
  displayName: string;
  isHost: boolean;
  isReady: boolean;
  assignedChit?: Chit;
}

export interface GameSession {
  code: string;
  hostId: string;
  players: Map<string, Player>;
  chits: Chit[];
  maxPlayers: number;
  status: 'lobby' | 'started' | 'finished';
  createdAt: number;
}

export type ClientMessage =
  | { type: 'create_game'; maxPlayers: number; hostName: string }
  | { type: 'join_game'; code: string; displayName: string }
  | { type: 'toggle_ready' }
  | { type: 'add_chit'; roleName: string; description?: string }
  | { type: 'edit_chit'; chitId: string; roleName: string; description?: string }
  | { type: 'remove_chit'; chitId: string }
  | { type: 'start_game' }
  | { type: 'leave_game' }
  | { type: 'kick_player'; targetPlayerId: string }
  | { type: 'restart_game' }
  | { type: 'send_chat'; message: string }
  | { type: 'request_rematch' }
  | { type: 'respond_to_rematch'; requesterId: string; accept: boolean }
  | { type: 'allow_chat_transition' };

export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: number;
}

export interface RematchRequest {
  requesterId: string;
  requesterName: string;
  timestamp: number;
}

export type ServerMessage =
  | { type: 'game_created'; code: string; playerId: string }
  | { type: 'joined_game'; playerId: string; session: SessionSnapshot }
  | { type: 'session_update'; session: SessionSnapshot }
  | { type: 'game_started'; assignedChit: Chit }
  | { type: 'error'; message: string }
  | { type: 'player_left'; playerId: string }
  | { type: 'host_changed'; newHostId: string }
  | { type: 'player_kicked'; playerId: string }
  | { type: 'game_restarted' }
  | { type: 'chat_message'; chatMessage: ChatMessage }
  | { type: 'rematch_requested'; request: RematchRequest }
  | { type: 'rematch_accepted'; requesterId: string }
  | { type: 'rematch_declined'; requesterId: string }
  | { type: 'chat_transition_allowed' }
  | { type: 'all_players_kicked' };

export interface SessionSnapshot {
  code: string;
  hostId: string;
  players: Player[];
  chits: Chit[];
  maxPlayers: number;
  status: 'lobby' | 'started' | 'finished';
}
