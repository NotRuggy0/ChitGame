'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Chit } from '../types';
import FlipCard from './FlipCard';

interface GameResultProps {
  assignedChit: Chit;
  onLeaveGame: () => void;
  onRematch: () => void;
  isHost: boolean;
  onAllowChatTransition?: () => void;
  showHostDecision?: boolean;
}

export default function GameResult({ 
  assignedChit, 
  onLeaveGame, 
  onRematch, 
  isHost,
  onAllowChatTransition,
  showHostDecision = false
}: GameResultProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Auto-flip after 1 second
    const timer = setTimeout(() => setIsFlipped(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showHostDecision && isHost && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showHostDecision, isHost, countdown]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl px-4"
    >
      <div className="h-[550px] mb-6">
        <FlipCard
          isFlipped={isFlipped}
          front={
            <div 
              className="luxury-card wave-glow h-full flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-[0_12px_48px_rgba(6,182,212,0.25)]"
              onClick={() => setIsFlipped(true)}
            >
              <div className="inline-block p-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-3xl mb-6 shadow-[0_0_48px_rgba(6,182,212,0.3)] border border-cyan-400/30 animate-pulse">
                <svg 
                  className="w-24 h-24 text-cyan-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-3 text-cyan-300">Your Role Awaits...</h2>
              <p className="text-cyan-400/60 text-lg">Click to reveal</p>
            </div>
          }
          back={
            <div className="luxury-card wave-glow h-full flex flex-col items-center justify-center text-center p-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-block p-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl mb-6 border border-cyan-400/20 shadow-[0_4px_20px_rgba(6,182,212,0.15)]">
                  <svg className="w-16 h-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-6 text-cyan-300/80">Your Role</h2>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative p-8 bg-gradient-to-br from-cyan-500/8 to-teal-500/8 rounded-3xl border-2 border-cyan-400/25 overflow-hidden backdrop-blur-sm shadow-[0_8px_32px_rgba(6,182,212,0.12)] mb-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-teal-500/8 opacity-50" />
                <div className="relative z-10">
                  <h3 className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4">
                    {assignedChit.roleName}
                  </h3>
                  {assignedChit.description && (
                    <p className="text-lg text-slate-300 max-w-md mx-auto">
                      {assignedChit.description}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-slate-500 mb-4"
              >
                Keep this role private. The game coordinator will guide you from here.
              </motion.p>
            </div>
          }
        />
      </div>
      
      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="space-y-3"
        style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto' }}
      >
        {/* Host Decision UI */}
        {isHost && showHostDecision && onAllowChatTransition && (
          <div className="mb-4 p-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl border border-cyan-400/30">
            <div className="text-center mb-3">
              <p className="text-cyan-300 font-semibold mb-1">Choose your decision</p>
              <div className="text-2xl font-bold text-cyan-400">{countdown}s</div>
            </div>
            <button
              onClick={onAllowChatTransition}
              className="luxury-button-primary w-full text-lg py-4"
              type="button"
              style={{ position: 'relative', zIndex: 1001, pointerEvents: 'auto', cursor: 'pointer' }}
            >
              Allow Chat
            </button>
          </div>
        )}

        {/* Non-host waiting message */}
        {!isHost && showHostDecision && (
          <div className="mb-4 p-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl border border-cyan-400/30 text-center">
            <p className="text-cyan-300/80">Waiting for host decision...</p>
            <div className="mt-2 flex justify-center gap-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3" style={{ position: 'relative', zIndex: 1000, pointerEvents: 'auto' }}>
          <button
            onClick={onRematch}
            className="luxury-button-secondary py-4"
            style={{ position: 'relative', zIndex: 1001, pointerEvents: 'auto', cursor: 'pointer' }}
            type="button"
          >
            Request Rematch
          </button>

          <button
            onClick={onLeaveGame}
            className="luxury-button-secondary py-4"
            style={{ position: 'relative', zIndex: 1001, pointerEvents: 'auto', cursor: 'pointer' }}
            type="button"
          >
            Leave Game
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
