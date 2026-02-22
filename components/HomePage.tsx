'use client';

import { motion } from 'framer-motion';
import Logo from './Logo';
import { useRipple } from './RippleEffect';

interface HomePageProps {
  onCreateGame: () => void;
  onJoinGame: () => void;
}

export default function HomePage({ onCreateGame, onJoinGame }: HomePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md px-4"
    >
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <Logo variant="full" />
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <button
          onClick={onCreateGame}
          className="w-full luxury-button-primary text-lg py-4"
        >
          Create New Game
        </button>

        <button
          onClick={onJoinGame}
          className="w-full luxury-button-secondary text-lg py-4"
        >
          Join Game
        </button>
      </motion.div>

    </motion.div>
  );
}
