'use client';

import { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import HomePage from '../components/HomePage';
import CreateGame from '../components/CreateGame';
import JoinGame from '../components/JoinGame';
import Lobby from '../components/Lobby';
import GameResult from '../components/GameResult';
import ErrorToast from '../components/ErrorToast';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

type Screen = 'home' | 'create' | 'join' | 'lobby' | 'game';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');
  const {
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
  } = useWebSocket();

  const handleCreateGame = (maxPlayers: number, hostName: string) => {
    createGame(maxPlayers, hostName);
    setScreen('lobby');
  };

  const handleJoinGame = (code: string, displayName: string) => {
    joinGame(code, displayName);
    setScreen('lobby');
  };

  const handleLeaveGame = () => {
    leaveGame();
    setScreen('home');
  };

  const handleBack = () => {
    setScreen('home');
  };

  // Auto-switch to game screen when chit is assigned
  if (assignedChit && screen !== 'game') {
    setScreen('game');
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Navigation Bar - Always visible */}
      <Navbar showLogo={true} />

      {/* Minimal Cyan Wave Background with Subtle Glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Deep minimal base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/50" />
        
        {/* Subtle cyan wave glows - organic floating orbs */}
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/12 to-teal-500/8 rounded-full blur-3xl animate-wave-pulse" />
        <div className="absolute bottom-[15%] right-[20%] w-[600px] h-[600px] bg-gradient-to-br from-teal-400/10 to-cyan-500/8 rounded-full blur-3xl animate-wave-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute top-[45%] right-[10%] w-[450px] h-[450px] bg-gradient-to-br from-cyan-400/8 to-sky-500/6 rounded-full blur-3xl animate-wave-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }} />
        
        {/* Subtle wave pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)
          `
        }} />
        
        {/* Minimal grid texture */}
        <div className="absolute inset-0 opacity-[0.008]" style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
        
        {/* Soft vignette for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/60" />
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-4 right-4 bg-slate-800/40 backdrop-blur-xl px-4 py-2 rounded-2xl text-sm text-cyan-300/80 flex items-center gap-2 border border-cyan-500/20 shadow-[0_4px_24px_rgba(6,182,212,0.1)]"
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          Connecting...
        </motion.div>
      )}

      {/* Error Toast */}
      <ErrorToast message={error} />

      {/* Main Content - Add padding-top for navbar */}
      <div className="w-full flex items-center justify-center min-h-screen pt-16">
        {screen === 'home' && (
          <HomePage
            onCreateGame={() => setScreen('create')}
            onJoinGame={() => setScreen('join')}
          />
        )}

        {screen === 'create' && (
          <CreateGame
            onCreateGame={handleCreateGame}
            onBack={handleBack}
          />
        )}

        {screen === 'join' && (
          <JoinGame
            onJoinGame={handleJoinGame}
            onBack={handleBack}
          />
        )}

        {screen === 'lobby' && session && playerId && (
          <Lobby
            session={session}
            playerId={playerId}
            onToggleReady={toggleReady}
            onAddChit={addChit}
            onEditChit={editChit}
            onRemoveChit={removeChit}
            onStartGame={startGame}
            onLeaveGame={handleLeaveGame}
          />
        )}

        {screen === 'game' && assignedChit && (
          <GameResult
            assignedChit={assignedChit}
            onLeaveGame={handleLeaveGame}
          />
        )}
      </div>

      {/* Minimal Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-6 text-xs text-cyan-400/60 font-light tracking-wide"
      >
        Cyan Wave Theme
      </motion.div>
    </main>
  );
}
