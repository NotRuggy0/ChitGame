import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import type {
  GameSession,
  Player,
  Chit,
  ClientMessage,
  ServerMessage,
  SessionSnapshot,
} from '../types';

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: Number(PORT) });

const sessions = new Map<string, GameSession>();
const playerToSession = new Map<string, string>();
const playerToSocket = new Map<string, WebSocket>();

function generateGameCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return sessions.has(code) ? generateGameCode() : code;
}

function getSessionSnapshot(session: GameSession): SessionSnapshot {
  return {
    code: session.code,
    hostId: session.hostId,
    players: Array.from(session.players.values()),
    chits: session.chits,
    maxPlayers: session.maxPlayers,
    status: session.status,
  };
}

function broadcastToSession(sessionCode: string, message: ServerMessage, excludePlayerId?: string) {
  const session = sessions.get(sessionCode);
  if (!session) return;

  session.players.forEach((player) => {
    if (player.id !== excludePlayerId) {
      const ws = playerToSocket.get(player.id);
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    }
  });
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function handleCreateGame(ws: WebSocket, maxPlayers: number, hostName: string) {
  const code = generateGameCode();
  const playerId = uuidv4();
  
  const player: Player = {
    id: playerId,
    displayName: hostName,
    isHost: true,
    isReady: false,
  };

  const session: GameSession = {
    code,
    hostId: playerId,
    players: new Map([[playerId, player]]),
    chits: [],
    maxPlayers,
    status: 'lobby',
    createdAt: Date.now(),
  };

  sessions.set(code, session);
  playerToSession.set(playerId, code);
  playerToSocket.set(playerId, ws);

  const response: ServerMessage = {
    type: 'game_created',
    code,
    playerId,
  };
  ws.send(JSON.stringify(response));

  const updateMessage: ServerMessage = {
    type: 'session_update',
    session: getSessionSnapshot(session),
  };
  ws.send(JSON.stringify(updateMessage));
}

function handleJoinGame(ws: WebSocket, code: string, displayName: string) {
  const session = sessions.get(code.toUpperCase());
  
  if (!session) {
    const error: ServerMessage = { type: 'error', message: 'Game not found' };
    ws.send(JSON.stringify(error));
    return;
  }

  if (session.status !== 'lobby') {
    const error: ServerMessage = { type: 'error', message: 'Game already started' };
    ws.send(JSON.stringify(error));
    return;
  }

  if (session.players.size >= session.maxPlayers) {
    const error: ServerMessage = { type: 'error', message: 'Game is full' };
    ws.send(JSON.stringify(error));
    return;
  }

  const playerId = uuidv4();
  const player: Player = {
    id: playerId,
    displayName,
    isHost: false,
    isReady: false,
  };

  session.players.set(playerId, player);
  playerToSession.set(playerId, code);
  playerToSocket.set(playerId, ws);

  const response: ServerMessage = {
    type: 'joined_game',
    playerId,
    session: getSessionSnapshot(session),
  };
  ws.send(JSON.stringify(response));

  broadcastToSession(code, {
    type: 'session_update',
    session: getSessionSnapshot(session),
  }, playerId);
}

function handleToggleReady(playerId: string) {
  const sessionCode = playerToSession.get(playerId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session) return;

  const player = session.players.get(playerId);
  if (!player) return;

  player.isReady = !player.isReady;

  broadcastToSession(sessionCode, {
    type: 'session_update',
    session: getSessionSnapshot(session),
  });
}

function handleAddChit(playerId: string, roleName: string, description?: string) {
  const sessionCode = playerToSession.get(playerId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session || session.hostId !== playerId) return;

  const chit: Chit = {
    id: uuidv4(),
    roleName,
    description,
  };

  session.chits.push(chit);

  broadcastToSession(sessionCode, {
    type: 'session_update',
    session: getSessionSnapshot(session),
  });
}

function handleEditChit(playerId: string, chitId: string, roleName: string, description?: string) {
  const sessionCode = playerToSession.get(playerId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session || session.hostId !== playerId) return;

  const chitIndex = session.chits.findIndex(c => c.id === chitId);
  if (chitIndex === -1) return;

  session.chits[chitIndex] = {
    id: chitId,
    roleName,
    description,
  };

  broadcastToSession(sessionCode, {
    type: 'session_update',
    session: getSessionSnapshot(session),
  });
}

function handleRemoveChit(playerId: string, chitId: string) {
  const sessionCode = playerToSession.get(playerId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session || session.hostId !== playerId) return;

  session.chits = session.chits.filter(c => c.id !== chitId);

  broadcastToSession(sessionCode, {
    type: 'session_update',
    session: getSessionSnapshot(session),
  });
}

function handleStartGame(playerId: string) {
  const sessionCode = playerToSession.get(playerId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session || session.hostId !== playerId) return;

  const playerArray = Array.from(session.players.values());
  
  // Validation
  if (session.chits.length !== playerArray.length) {
    const ws = playerToSocket.get(playerId);
    if (ws) {
      const error: ServerMessage = {
        type: 'error',
        message: 'Chit count must equal player count',
      };
      ws.send(JSON.stringify(error));
    }
    return;
  }

  if (!playerArray.every(p => p.isReady)) {
    const ws = playerToSocket.get(playerId);
    if (ws) {
      const error: ServerMessage = {
        type: 'error',
        message: 'All players must be ready',
      };
      ws.send(JSON.stringify(error));
    }
    return;
  }

  // Shuffle and assign chits
  const shuffledChits = shuffleArray(session.chits);
  playerArray.forEach((player, index) => {
    player.assignedChit = shuffledChits[index];
    
    const ws = playerToSocket.get(player.id);
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message: ServerMessage = {
        type: 'game_started',
        assignedChit: shuffledChits[index],
      };
      ws.send(JSON.stringify(message));
    }
  });

  session.status = 'started';
}

function handleLeaveGame(playerId: string) {
  const sessionCode = playerToSession.get(playerId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session) return;

  session.players.delete(playerId);
  playerToSession.delete(playerId);
  playerToSocket.delete(playerId);

  // If no players left, delete session
  if (session.players.size === 0) {
    sessions.delete(sessionCode);
    return;
  }

  // If host left, assign new host
  if (session.hostId === playerId) {
    const newHost = Array.from(session.players.values())[0];
    newHost.isHost = true;
    session.hostId = newHost.id;

    broadcastToSession(sessionCode, {
      type: 'host_changed',
      newHostId: newHost.id,
    });
  }

  broadcastToSession(sessionCode, {
    type: 'player_left',
    playerId,
  });

  broadcastToSession(sessionCode, {
    type: 'session_update',
    session: getSessionSnapshot(session),
  });
}

function handleKickPlayer(hostId: string, targetPlayerId: string) {
  const sessionCode = playerToSession.get(hostId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session) return;

  // Verify the requester is the host
  if (session.hostId !== hostId) {
    const ws = playerToSocket.get(hostId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      const error: ServerMessage = {
        type: 'error',
        message: 'Only the host can kick players',
      };
      ws.send(JSON.stringify(error));
    }
    return;
  }

  // Can't kick yourself
  if (targetPlayerId === hostId) {
    const ws = playerToSocket.get(hostId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      const error: ServerMessage = {
        type: 'error',
        message: 'You cannot kick yourself',
      };
      ws.send(JSON.stringify(error));
    }
    return;
  }

  // Notify the kicked player
  const kickedWs = playerToSocket.get(targetPlayerId);
  if (kickedWs && kickedWs.readyState === WebSocket.OPEN) {
    const message: ServerMessage = {
      type: 'error',
      message: 'You have been kicked from the game',
    };
    kickedWs.send(JSON.stringify(message));
  }

  // Remove the player
  handleLeaveGame(targetPlayerId);
}

function handleRestartGame(hostId: string) {
  const sessionCode = playerToSession.get(hostId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session) return;

  // Verify the requester is the host
  if (session.hostId !== hostId) {
    const ws = playerToSocket.get(hostId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      const error: ServerMessage = {
        type: 'error',
        message: 'Only the host can restart the game',
      };
      ws.send(JSON.stringify(error));
    }
    return;
  }

  // Reset game state
  session.status = 'lobby';
  session.chits = [];
  
  // Reset all players
  session.players.forEach((player) => {
    player.isReady = false;
    player.assignedChit = undefined;
  });

  // Broadcast restart to all players
  broadcastToSession(sessionCode, {
    type: 'game_restarted',
  });

  // Send updated session
  broadcastToSession(sessionCode, {
    type: 'session_update',
    session: getSessionSnapshot(session),
  });
}

function handleChatMessage(senderId: string, message: string) {
  const sessionCode = playerToSession.get(senderId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session) return;

  const sender = session.players.get(senderId);
  if (!sender) return;

  const chatMessage = {
    id: uuidv4(),
    playerId: senderId,
    playerName: sender.displayName,
    message,
    timestamp: Date.now(),
  };

  // Broadcast to all players in the session
  broadcastToSession(sessionCode, {
    type: 'chat_message',
    chatMessage,
  });
}

function handleRematchRequest(requesterId: string) {
  const sessionCode = playerToSession.get(requesterId);
  if (!sessionCode) return;

  const session = sessions.get(sessionCode);
  if (!session) return;

  const requester = session.players.get(requesterId);
  if (!requester) return;

  // Broadcast rematch request to all players except the requester
  broadcastToSession(sessionCode, {
    type: 'rematch_requested',
    requesterId,
    requesterName: requester.displayName,
  }, requesterId);
}

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (data: string) => {
    try {
      const message: ClientMessage = JSON.parse(data.toString());

      switch (message.type) {
        case 'create_game':
          handleCreateGame(ws, message.maxPlayers, message.hostName);
          break;
        case 'join_game':
          handleJoinGame(ws, message.code, message.displayName);
          break;
        case 'toggle_ready': {
          const playerId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (playerId) handleToggleReady(playerId);
          break;
        }
        case 'add_chit': {
          const playerId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (playerId) handleAddChit(playerId, message.roleName, message.description);
          break;
        }
        case 'edit_chit': {
          const playerId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (playerId) handleEditChit(playerId, message.chitId, message.roleName, message.description);
          break;
        }
        case 'remove_chit': {
          const playerId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (playerId) handleRemoveChit(playerId, message.chitId);
          break;
        }
        case 'start_game': {
          const playerId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (playerId) handleStartGame(playerId);
          break;
        }
        case 'leave_game': {
          const playerId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (playerId) handleLeaveGame(playerId);
          break;
        }
        case 'kick_player': {
          const hostId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (hostId) handleKickPlayer(hostId, message.targetPlayerId);
          break;
        }
        case 'restart_game': {
          const hostId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (hostId) handleRestartGame(hostId);
          break;
        }
        case 'send_chat': {
          const senderId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (senderId) handleChatMessage(senderId, message.message);
          break;
        }
        case 'request_rematch': {
          const requesterId = Array.from(playerToSocket.entries())
            .find(([, socket]) => socket === ws)?.[0];
          if (requesterId) handleRematchRequest(requesterId);
          break;
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    const playerId = Array.from(playerToSocket.entries())
      .find(([, socket]) => socket === ws)?.[0];
    if (playerId) {
      handleLeaveGame(playerId);
    }
  });
});

console.log(`WebSocket server running on port ${PORT}`);
