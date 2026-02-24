'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { RematchRequest } from '../types';

interface RematchRequestPopupProps {
  requests: RematchRequest[];
  onAccept: (requesterId: string) => void;
  onDecline: (requesterId: string) => void;
}

export default function RematchRequestPopup({ 
  requests, 
  onAccept, 
  onDecline 
}: RematchRequestPopupProps) {
  return (
    <div className="fixed top-24 right-4 z-[9999] space-y-2 max-w-sm">
      <AnimatePresence>
        {requests.map((request, index) => (
          <motion.div
            key={request.requesterId}
            initial={{ opacity: 0, x: 100, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl border border-cyan-400/30 shadow-[0_8px_32px_rgba(6,182,212,0.2)] overflow-hidden"
            style={{ marginTop: index > 0 ? '8px' : '0' }}
          >
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-cyan-400/30">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-cyan-300 font-semibold text-sm">Rematch Request</p>
                  <p className="text-slate-300 text-xs mt-0.5">
                    {request.requesterName} wants to play again
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onAccept(request.requesterId)}
                  className="flex-1 bg-gradient-to-r from-cyan-500/80 to-teal-500/80 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-200 text-sm border border-cyan-400/30"
                  type="button"
                >
                  Accept
                </button>
                <button
                  onClick={() => onDecline(request.requesterId)}
                  className="flex-1 bg-slate-700/50 hover:bg-slate-700/80 text-slate-300 font-semibold py-2 px-3 rounded-lg transition-all duration-200 text-sm border border-slate-600/30"
                  type="button"
                >
                  Decline
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
