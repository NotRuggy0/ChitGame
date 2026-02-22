'use client';

import { motion } from 'framer-motion';
import type { SessionSnapshot } from '../types';
import PlayerList from './PlayerList';
import ChitManager from './ChitManager';

interface LobbyProps {
  session: SessionSnapshot;
  playerId: string;
  onToggleReady: () => void;
  onAddChit: (roleName: string, description?: string) => void;
  onEditChit: (chitId: string, roleName: string, description?: string) => void;
  onRemoveChit: (chitId: string) => void;
  onStartGame: () => void;
  onLeaveGame: () => void;
}

export default function Lobby({
  session,
  playerId,
  onToggleReady,
  onAddChit,
  onEditChit,
  onRemoveChit,
  onStartGame,
  onLeaveGame,
}: LobbyProps) {
  const isHost = session.hostId === playerId;
  const currentPlayer = session.players.find(p => p.id === playerId);
  const allPlayersReady = session.players.every(p => p.isReady);
  const chitsMatchPlayers = session.chits.length === session.players.length;
  const canStartGame = isHost && allPlayersReady && chitsMatchPlayers && session.players.length >= 2;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl px-4 py-8 relative"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block mb-4"
        >
          <div className="relative luxury-card inline-block">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl" />
            <div className="relative">
              <p className="text-sm text-slate-400 mb-1">Game Code</p>
              <p className="text-4xl font-bold tracking-widest bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                {session.code}
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
          <span>{session.players.length} / {session.maxPlayers} players</span>
          <span>•</span>
          <span>{session.chits.length} roles</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Players */}
        <div className="luxury-card relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full blur-3xl -z-0" />
          <div className="relative z-10">
            <PlayerList players={session.players} currentPlayerId={playerId} />
          </div>
        </div>

        {/* Chits - Host Only */}
        {isHost && (
          <div className="luxury-card relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl -z-0" />
            <div className="relative z-10">
              <ChitManager
                chits={session.chits}
                onAddChit={onAddChit}
                onEditChit={onEditChit}
                onRemoveChit={onRemoveChit}
              />
            </div>
          </div>
        )}

        {/* Player View - Non-host */}
        {!isHost && (
          <div className="luxury-card relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-0" />
            <div className="relative z-10">
            <h3 className="text-lg font-semibold mb-4 text-white">Roles ({session.chits.length})</h3>
            <div className="space-y-2">
              {session.chits.map((chit) => (
                <div key={chit.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="font-medium text-white">{chit.roleName}</p>
                  {chit.description && (
                    <p className="text-sm text-slate-300 mt-1">{chit.description}</p>
                  )}
                </div>
              ))}
              {session.chits.length === 0 && (
                <p className="text-center py-8 text-slate-400">
                  Waiting for host to add roles...
                </p>
              )}
            </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {isHost && !chitsMatchPlayers && session.players.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-300 text-sm text-center font-medium backdrop-blur-sm"
        >
          ⚠️ Role count ({session.chits.length}) must equal player count ({session.players.length})
        </motion.div>
      )}

      {isHost && !allPlayersReady && chitsMatchPlayers && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-blue-500/20 border border-blue-500/40 rounded-xl text-blue-300 text-sm text-center font-medium backdrop-blur-sm"
        >
          Waiting for all players to ready up...
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onLeaveGame}
          className="luxury-button-secondary"
        >
          Leave Game
        </button>

        {/* Ready Button - All Players Including Host */}
        <button
          onClick={onToggleReady}
          className={`flex-1 luxury-button ${
            currentPlayer?.isReady
              ? 'bg-luxury-grey hover:bg-luxury-grey-light text-luxury-white'
              : 'luxury-button-primary'
          }`}
        >
          {currentPlayer?.isReady ? 'Not Ready' : 'Ready Up'}
        </button>

        {/* Start Game Button - Host Only */}
        {isHost && (
          <button
            onClick={onStartGame}
            disabled={!canStartGame}
            className="flex-1 luxury-button-primary"
          >
            {!chitsMatchPlayers
              ? 'Add Roles'
              : !allPlayersReady
              ? 'Waiting for Players'
              : 'Start Game'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
