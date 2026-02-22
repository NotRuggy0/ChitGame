import { useEffect, useRef, useState, useCallback } from 'react';
import type { ClientMessage, ServerMessage, SessionSnapshot, Chit } from '../types';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [session, setSession] = useState<SessionSnapshot | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [assignedChit, setAssignedChit] = useState<Chit | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      console.log('Connected to WebSocket');
    };

    ws.current.onmessage = (event) => {
      try {
        const message: ServerMessage = JSON.parse(event.data);

        switch (message.type) {
          case 'game_created':
            setPlayerId(message.playerId);
            break;
          case 'joined_game':
            setPlayerId(message.playerId);
            setSession(message.session);
            break;
          case 'session_update':
            setSession(message.session);
            break;
          case 'game_started':
            setAssignedChit(message.assignedChit);
            break;
          case 'error':
            setError(message.message);
            setTimeout(() => setError(null), 5000);
            break;
          case 'host_changed':
            // Session update will follow
            break;
          case 'player_left':
            // Session update will follow
            break;
          case 'player_kicked':
            // Session update will follow
            break;
          case 'game_restarted':
            // Reset local state
            setAssignedChit(null);
            // Session update will follow
            break;
        }
      } catch (err) {
        console.error('Error parsing message:', err);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection error');
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const send = useCallback((message: ClientMessage) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  const createGame = useCallback((maxPlayers: number, hostName: string) => {
    send({ type: 'create_game', maxPlayers, hostName });
  }, [send]);

  const joinGame = useCallback((code: string, displayName: string) => {
    send({ type: 'join_game', code, displayName });
  }, [send]);

  const toggleReady = useCallback(() => {
    send({ type: 'toggle_ready' });
  }, [send]);

  const addChit = useCallback((roleName: string, description?: string) => {
    send({ type: 'add_chit', roleName, description });
  }, [send]);

  const editChit = useCallback((chitId: string, roleName: string, description?: string) => {
    send({ type: 'edit_chit', chitId, roleName, description });
  }, [send]);

  const removeChit = useCallback((chitId: string) => {
    send({ type: 'remove_chit', chitId });
  }, [send]);

  const startGame = useCallback(() => {
    send({ type: 'start_game' });
  }, [send]);

  const leaveGame = useCallback(() => {
    send({ type: 'leave_game' });
    // Reset state when leaving
    setSession(null);
    setPlayerId(null);
    setAssignedChit(null);
  }, [send]);

  const kickPlayer = useCallback((targetPlayerId: string) => {
    send({ type: 'kick_player', targetPlayerId });
  }, [send]);

  const restartGame = useCallback(() => {
    // Reset assigned chit and clear roles
    setAssignedChit(null);
    send({ type: 'restart_game' });
  }, [send]);

  return {
    isConnected,
    session,
    playerId,
    assignedChit,
    error,
    createGame,
    joinGame,
    toggleReady,
    addChit,
    editChit,
    removeChit,
    startGame,
    leaveGame,
    kickPlayer,
    restartGame,
  };
}
