import { useEffect, useRef, useState, useCallback } from 'react';
import type { ClientMessage, ServerMessage, SessionSnapshot, Chit, ChatMessage, RematchRequest, VoteData, VotingResults } from '../types';

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [session, setSession] = useState<SessionSnapshot | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [assignedChit, setAssignedChit] = useState<Chit | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [rematchRequests, setRematchRequests] = useState<RematchRequest[]>([]);
  const [chatAllowed, setChatAllowed] = useState(false);
  const [voteCounts, setVoteCounts] = useState<{ [playerId: string]: number }>({});
  const [hasVoted, setHasVoted] = useState(false);
  const [myVote, setMyVote] = useState<string | undefined>(undefined);
  const [votingResults, setVotingResults] = useState<VotingResults | null>(null);
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
            setChatMessages([]);
            setChatAllowed(false);
            setRematchRequests([]);
            setVoteCounts({});
            setHasVoted(false);
            setMyVote(undefined);
            setVotingResults(null);
            // Session update will follow
            break;
          case 'chat_message':
            setChatMessages(prev => [...prev, message.chatMessage]);
            break;
          case 'rematch_requested':
            // Add to rematch requests queue
            setRematchRequests(prev => [...prev, message.request]);
            break;
          case 'rematch_accepted':
            // Remove from queue
            setRematchRequests(prev => prev.filter(r => r.requesterId !== message.requesterId));
            setError('Rematch accepted! Restarting game...');
            setTimeout(() => setError(null), 3000);
            break;
          case 'rematch_declined':
            // Remove from queue
            setRematchRequests(prev => prev.filter(r => r.requesterId !== message.requesterId));
            setError('Your rematch request was declined');
            setTimeout(() => setError(null), 3000);
            break;
          case 'chat_transition_allowed':
            setChatAllowed(true);
            break;
          case 'all_players_kicked':
            setError('Host has left the game. All players have been kicked.');
            setTimeout(() => {
              setSession(null);
              setPlayerId(null);
              setAssignedChit(null);
              setChatMessages([]);
              setRematchRequests([]);
              setChatAllowed(false);
            }, 2000);
            break;
          case 'vote_cast':
            // Update vote counts for host, or confirm vote for voter
            if (message.vote.voterId === playerId) {
              setHasVoted(true);
              setMyVote(message.vote.targetPlayerId);
            }
            // For host, update real-time vote counts
            setVoteCounts(prev => ({
              ...prev,
              [message.vote.targetPlayerId]: (prev[message.vote.targetPlayerId] || 0) + 1
            }));
            break;
          case 'voting_ended':
            setVotingResults(message.results);
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
    setChatMessages([]);
    setRematchRequests([]);
    setChatAllowed(false);
    setVoteCounts({});
    setHasVoted(false);
    setMyVote(undefined);
    setVotingResults(null);
  }, [send]);

  const kickPlayer = useCallback((targetPlayerId: string) => {
    send({ type: 'kick_player', targetPlayerId });
  }, [send]);

  const restartGame = useCallback(() => {
    // Reset assigned chit and clear roles
    setAssignedChit(null);
    setChatMessages([]);
    setChatAllowed(false);
    setRematchRequests([]);
    send({ type: 'restart_game' });
  }, [send]);

  const sendChatMessage = useCallback((message: string) => {
    send({ type: 'send_chat', message });
  }, [send]);

  const requestRematch = useCallback(() => {
    send({ type: 'request_rematch' });
  }, [send]);

  const respondToRematch = useCallback((requesterId: string, accept: boolean) => {
    send({ type: 'respond_to_rematch', requesterId, accept });
    // Remove from local queue
    setRematchRequests(prev => prev.filter(r => r.requesterId !== requesterId));
  }, [send]);

  const allowChatTransition = useCallback(() => {
    send({ type: 'allow_chat_transition' });
    setChatAllowed(true);
  }, [send]);

  const castVote = useCallback((targetPlayerId: string) => {
    send({ type: 'cast_vote', targetPlayerId });
  }, [send]);

  const endVoting = useCallback(() => {
    send({ type: 'end_voting' });
  }, [send]);

  return {
    isConnected,
    session,
    playerId,
    assignedChit,
    error,
    chatMessages,
    rematchRequests,
    chatAllowed,
    voteCounts,
    hasVoted,
    myVote,
    votingResults,
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
    sendChatMessage,
    requestRematch,
    respondToRematch,
    allowChatTransition,
    castVote,
    endVoting,
  };
}
