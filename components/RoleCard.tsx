'use client';

import { motion } from 'framer-motion';
import type { Chit } from '../types';

interface RoleCardProps {
  assignedChit: Chit;
}

export default function RoleCard({ assignedChit }: RoleCardProps) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
      className="luxury-card sticky top-4 max-h-[calc(100vh-2rem)]"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-cyan-500/20">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl">
            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-cyan-200">Your Role</h3>
        </div>

        {/* Role Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
            {assignedChit.roleName}
          </h2>
          
          {assignedChit.description && (
            <p className="text-slate-400 leading-relaxed">
              {assignedChit.description}
            </p>
          )}
        </div>

        {/* Footer tip */}
        <div className="pt-4 border-t border-cyan-500/10">
          <p className="text-xs text-cyan-400/60 text-center">
            💡 Keep this role secret!
          </p>
        </div>
      </div>
    </motion.div>
  );
}
