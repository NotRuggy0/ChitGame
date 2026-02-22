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

      {/* BRAND NEW VIBRANT CYAN-TEAL BACKGROUND - SUPER VISIBLE! */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Vibrant gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-950 to-teal-950" />
        
        {/* BRIGHT cyan/teal glows - VERY VISIBLE! */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] bg-gradient-to-br from-teal-500/25 to-emerald-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-sky-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        
        {/* Grid pattern for extra visibility */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/30 to-black/60" />
      </div>

      {/* Connection Status */}
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-4 right-4 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-lg text-sm text-slate-300 flex items-center gap-2 border border-white/20 shadow-lg"
        >
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
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

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 text-xs text-cyan-400 font-bold"
      >
        🌊 CYAN THEME v3.0 - You should SEE this color! 🌊
      </motion.div>
    </main>
  );
}
