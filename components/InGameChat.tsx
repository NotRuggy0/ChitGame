'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Chit, SessionSnapshot, ChatMessage } from '../types';
import RoleCard from './RoleCard';

interface InGameChatProps {
  assignedChit: Chit;
  session: SessionSnapshot;
  playerId: string;
  chatMessages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onLeaveGame: () => void;
  onRematch: () => void;
}

export default function InGameChat({
  assignedChit,
  session,
  playerId,
  chatMessages,
  onSendMessage,
  onLeaveGame,
  onRematch,
}: InGameChatProps) {
  const [message, setMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentPlayer = session.players.find(p => p.id === playerId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-screen flex gap-6 p-6 pt-24"
    >
      {/* Left Side - Chat */}
      <div className="flex-1 flex flex-col">
        <div className="luxury-card flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-cyan-200">Game Chat</h2>
                <p className="text-sm text-slate-400">{session.players.length} players online</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={onRematch}
                className="luxury-button-secondary px-4 py-2 text-sm"
              >
                🔄 Request Rematch
              </button>
              <button
                onClick={onLeaveGame}
                className="luxury-button-secondary px-4 py-2 text-sm"
              >
                🚪 Leave
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
            {chatMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-slate-500">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-sm">No messages yet. Start the conversation!</p>
                </div>
              </div>
            ) : (
              chatMessages.map((msg) => {
                const isOwnMessage = msg.playerId === playerId;
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${isOwnMessage ? 'bg-gradient-to-r from-cyan-600 to-teal-600' : 'bg-slate-800/60'} rounded-2xl px-4 py-3`}>
                      <p className="text-xs font-semibold mb-1 text-cyan-200">
                        {isOwnMessage ? 'You' : msg.playerName}
                      </p>
                      <p className="text-sm text-slate-100 break-words">
                        {msg.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="luxury-input flex-1"
              maxLength={500}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="luxury-button-primary px-6"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Role Card */}
      <div className="w-80">
        <RoleCard assignedChit={assignedChit} />
      </div>
    </motion.div>
  );
}
