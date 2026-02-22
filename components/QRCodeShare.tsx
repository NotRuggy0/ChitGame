'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QRCodeShare({ gameCode }: { gameCode: string }) {
  const [showQR, setShowQR] = useState(false);
  const gameUrl = `https://chit-game94.vercel.app/?code=${gameCode}`;
  
  // Simple QR code using an API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(gameUrl)}`;

  return (
    <>
      <button
        onClick={() => setShowQR(true)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/50 text-cyan-300 rounded-xl border border-cyan-500/20 transition-all text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        Show QR Code
      </button>

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 max-w-sm w-full shadow-[0_8px_48px_rgba(6,182,212,0.2)]"
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Scan to Join
              </h3>
              
              <div className="bg-white p-4 rounded-2xl mb-4">
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-auto" />
              </div>
              
              <p className="text-center text-slate-400 text-sm mb-4">
                Game Code: <span className="text-cyan-400 font-mono font-bold text-lg">{gameCode}</span>
              </p>
              
              <button
                onClick={() => setShowQR(false)}
                className="w-full luxury-button-primary"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
