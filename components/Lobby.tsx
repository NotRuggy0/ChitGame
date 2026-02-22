'use client';

import { motion } from 'framer-motion';
import type { SessionSnapshot } from '../types';
import PlayerList from './PlayerList';
import ChitManager from './ChitManager';
import QRCodeShare from './QRCodeShare';
import CopyButton from './CopyButton';
import HostControls from './HostControls';
import RolePresetSelector from './RolePresetSelector';

interface LobbyProps {
  session: SessionSnapshot;
  playerId: string;
  onToggleReady: () => void;
  onAddChit: (roleName: string, description?: string) => void;
  onEditChit: (chitId: string, roleName: string, description?: string) => void;
  onRemoveChit: (chitId: string) => void;
  onStartGame: () => void;
  onLeaveGame: () => void;
  onKickPlayer: (targetPlayerId: string) => void;
  onRestartGame: () => void;
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
  onKickPlayer,
  onRestartGame,
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
          <div className="relative luxury-card inline-block wave-glow px-10 py-6">
            <div className="relative">
              <p className="text-sm text-cyan-400/60 mb-2 font-light tracking-wide">Game Code</p>
              <p className="text-5xl font-bold tracking-[0.3em] bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                {session.code}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Quick Actions */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <CopyButton text={session.code} label="Copy Code" />
          <QRCodeShare gameCode={session.code} />
          {isHost && (
            <HostControls
              onKickPlayer={onKickPlayer}
              onRestartGame={onRestartGame}
              players={session.players.filter(p => p.id !== playerId).map(p => ({ id: p.id, name: p.displayName }))}
            />
          )}
        </div>
        
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <span className="text-cyan-400/70">{session.players.length} / {session.maxPlayers} players</span>
          <span className="text-cyan-500/30">•</span>
          <span className="text-cyan-400/70">{session.chits.length} roles</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Players */}
        <div className="luxury-card wave-glow">
          <PlayerList players={session.players} currentPlayerId={playerId} />
        </div>

        {/* Chits - Host Only */}
        {isHost && (
          <div className="luxury-card wave-glow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-cyan-200">Roles</h3>
              <RolePresetSelector 
                playerCount={session.players.length}
                onLoadPreset={(roles) => {
                  // Clear existing chits and add preset roles
                  session.chits.forEach(chit => onRemoveChit(chit.id));
                  roles.forEach(role => onAddChit(role.name, role.description));
                }}
              />
            </div>
            <ChitManager
              chits={session.chits}
              onAddChit={onAddChit}
              onEditChit={onEditChit}
              onRemoveChit={onRemoveChit}
            />
          </div>
        )}

        {/* Player View - Non-host */}
        {!isHost && (
          <div className="luxury-card wave-glow">
            <h3 className="text-lg font-semibold mb-4 text-cyan-200">Roles ({session.chits.length})</h3>
            <div className="space-y-3">
              {session.chits.map((chit) => (
                <div key={chit.id} className="p-4 bg-slate-800/30 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300">
                  <p className="font-medium text-cyan-100">{chit.roleName}</p>
                  {chit.description && (
                    <p className="text-sm text-slate-400 mt-1">{chit.description}</p>
                  )}
                </div>
              ))}
              {session.chits.length === 0 && (
                <p className="text-center py-12 text-slate-500">
                  Waiting for host to add roles...
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {isHost && !chitsMatchPlayers && session.players.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-amber-500/10 border border-amber-400/30 rounded-2xl text-amber-300/90 text-sm text-center font-medium backdrop-blur-xl"
        >
          ⚠️ Role count ({session.chits.length}) must equal player count ({session.players.length})
        </motion.div>
      )}

      {isHost && !allPlayersReady && chitsMatchPlayers && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-2xl text-cyan-300/90 text-sm text-center font-medium backdrop-blur-xl"
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
