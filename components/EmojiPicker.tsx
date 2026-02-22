'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMOJIS = [
  '😀', '😎', '🥳', '🤓', '😇', '🤠', '🥸', '🤡',
  '👻', '👽', '🤖', '🎃', '😺', '🐶', '🐼', '🦊',
  '🦁', '🐯', '🐸', '🐙', '🦄', '🐲', '🌟', '⭐',
  '🔥', '💎', '👑', '🎯', '🎮', '🎨', '🎭', '🎪',
];

interface EmojiPickerProps {
  currentEmoji: string;
  onSelect: (emoji: string) => void;
}

export default function EmojiPicker({ currentEmoji, onSelect }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-slate-800/40 border border-cyan-500/20 hover:border-cyan-400/40 transition-all flex items-center justify-center text-2xl"
      >
        {currentEmoji}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="absolute top-full mt-2 left-0 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-3 shadow-[0_8px_32px_rgba(6,182,212,0.2)] z-50"
          >
            <div className="grid grid-cols-8 gap-2 max-w-xs">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleSelect(emoji)}
                  className="w-8 h-8 rounded-lg hover:bg-cyan-500/20 transition-all flex items-center justify-center text-xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
