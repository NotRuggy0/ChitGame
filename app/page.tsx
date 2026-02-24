'use client';

import { useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useTheme } from '../hooks/useTheme';
import HomePage from '../components/HomePage';
import CreateGame from '../components/CreateGame';
import JoinGame from '../components/JoinGame';
import Lobby from '../components/Lobby';
import GameResult from '../components/GameResult';
import ErrorToast from '../components/ErrorToast';
import Navbar from '../components/Navbar';
import ParticleEffect from '../components/ParticleEffect';
import ConfettiEffect from '../components/ConfettiEffect';
import CountdownTimer from '../components/CountdownTimer';
import ThemeSwitcher from '../components/ThemeSwitcher';
import GameHistory from '../components/GameHistory';
import InGameChat from '../components/InGameChat';
import RematchRequestPopup from '../components/RematchRequestPopup';
import { motion, AnimatePresence } from 'framer-motion';
import { saveGameToHistory } from '../utils/gameHistory';

type Screen = 'home' | 'create' | 'join' | 'lobby' | 'game' | 'in-game';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showHostDecision, setShowHostDecision] = useState(false);
  const [chatCountdown, setChatCountdown] = useState(10);
  const { theme, config, changeTheme } = useTheme();
  
  const {
    isConnected,
    session,
    playerId,
    assignedChit,
    error,
    chatMessages,
    rematchRequests,
    chatAllowed,
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
  } = useWebSocket();

  const handleCreateGame = (maxPlayers: number, hostName: string) => {
    createGame(maxPlayers, hostName);
    setScreen('lobby');
  };

  const handleJoinGame = (code: string, displayName: string) => {
    joinGame(code, displayName);
    setScreen('lobby');
  };

  const handleStartGame = () => {
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    startGame();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleLeaveGame = () => {
    leaveGame();
    setScreen('home');
  };

  const handleBack = () => {
    setScreen('home');
  };

  const handleRematch = () => {
    requestRematch();
  };

  const handleAllowChatTransition = () => {
    allowChatTransition();
    setShowHostDecision(false);
  };

  const handleAcceptRematch = (requesterId: string) => {
    respondToRematch(requesterId, true);
  };

  const handleDeclineRematch = (requesterId: string) => {
    respondToRematch(requesterId, false);
  };

  // Save game to history when assigned a chit
  useEffect(() => {
    if (assignedChit && session && playerId) {
      saveGameToHistory({
        id: session.code + '-' + Date.now(),
        code: session.code,
        date: new Date().toISOString(),
        playerCount: session.players.length,
        role: assignedChit.roleName,
        isHost: session.hostId === playerId,
      });
    }
  }, [assignedChit, session, playerId]);

  // Auto-switch to game screen when chit is assigned
  useEffect(() => {
    if (assignedChit && screen !== 'game' && screen !== 'in-game') {
      setScreen('game');
      setChatCountdown(10); // Reset countdown
      // Show host decision after 2 seconds
      if (session && playerId === session.hostId) {
        setTimeout(() => setShowHostDecision(true), 2000);
      }
    }
  }, [assignedChit, screen, session, playerId]);

  // Auto-switch to in-game chat when chat is allowed
  useEffect(() => {
    if (chatAllowed && screen === 'game') {
      setScreen('in-game');
      setShowHostDecision(false);
    }
  }, [chatAllowed, screen]);

  // Auto-switch to lobby when game is restarted (rematch accepted)
  useEffect(() => {
    if (!assignedChit && session && (screen === 'game' || screen === 'in-game')) {
      setScreen('lobby');
      setShowHostDecision(false);
      setChatCountdown(10);
    }
  }, [assignedChit, session, screen]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Navigation Bar - Always visible */}
      <Navbar showLogo={true} />

      {/* Particle Effects - Behind everything */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -10, pointerEvents: 'none' }}>
        <ParticleEffect count={25} />
      </div>

      {/* Confetti on Game Start */}
      <ConfettiEffect trigger={showConfetti} />

      {/* Countdown Timer */}
      <AnimatePresence>
        {showCountdown && <CountdownTimer onComplete={handleCountdownComplete} />}
      </AnimatePresence>

      {/* Theme Switcher & Game History - Top Right */}
      <div className="fixed top-20 right-4 flex gap-2 z-30">
        <GameHistory />
        <ThemeSwitcher currentTheme={theme} onThemeChange={changeTheme} />
      </div>

      {/* Dynamic Themed Background */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -20, pointerEvents: 'none' }}>
        {/* Deep minimal base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Dynamic themed wave glows - organic floating orbs */}
        <div 
          className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full blur-3xl animate-wave-pulse transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${config.colors.primary}20, ${config.colors.secondary}10)`
          }}
        />
        <div 
          className="absolute bottom-[15%] right-[20%] w-[600px] h-[600px] rounded-full blur-3xl animate-wave-pulse transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${config.colors.secondary}15, ${config.colors.primary}08)`,
            animationDelay: '2s',
            animationDuration: '10s'
          }}
        />
        <div 
          className="absolute top-[45%] right-[10%] w-[450px] h-[450px] rounded-full blur-3xl animate-wave-pulse transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${config.colors.accent}12, ${config.colors.primary}06)`,
            animationDelay: '4s',
            animationDuration: '12s'
          }}
        />
        
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

      {/* Rematch Request Popups */}
      {session && playerId === session.hostId && (
        <RematchRequestPopup
          requests={rematchRequests}
          onAccept={handleAcceptRematch}
          onDecline={handleDeclineRematch}
        />
      )}

      {/* Main Content - Add padding-top for navbar */}
      <div className="w-full flex items-center justify-center min-h-screen pt-16" style={{ position: 'relative', zIndex: 1, pointerEvents: 'auto' }}>
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
            onStartGame={handleStartGame}
            onLeaveGame={handleLeaveGame}
            onKickPlayer={kickPlayer}
            onRestartGame={restartGame}
          />
        )}

        {screen === 'game' && assignedChit && session && playerId && (
          <GameResult
            assignedChit={assignedChit}
            onLeaveGame={handleLeaveGame}
            onRematch={handleRematch}
            isHost={session.hostId === playerId}
            onAllowChatTransition={handleAllowChatTransition}
            showHostDecision={showHostDecision}
            countdown={chatCountdown}
            onCountdownChange={setChatCountdown}
          />
        )}

        {screen === 'in-game' && assignedChit && session && playerId && (
          <InGameChat
            assignedChit={assignedChit}
            session={session}
            playerId={playerId}
            chatMessages={chatMessages}
            onSendMessage={sendChatMessage}
            onLeaveGame={handleLeaveGame}
            onRematch={handleRematch}
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
