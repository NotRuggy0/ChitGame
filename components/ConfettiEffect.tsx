'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  delay: number;
}

export default function ConfettiEffect({ trigger }: { trigger: boolean }) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const colors = ['#06B6D4', '#14B8A6', '#22D3EE', '#2DD4BF', '#67E8F9'];
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.3,
      }));
      setConfetti(pieces);

      // Clear confetti after animation
      setTimeout(() => setConfetti([]), 3000);
    }
  }, [trigger]);

  if (!trigger || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 9999, pointerEvents: 'none' }}>
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: '-10%',
            backgroundColor: piece.color,
            rotate: piece.rotation,
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: 0,
            rotate: piece.rotation + 720,
            x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100],
          }}
          transition={{
            duration: 2.5 + Math.random(),
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}
