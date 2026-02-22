'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROLE_PRESETS, generateRolesFromPreset } from '../utils/rolePresets';

interface RolePresetSelectorProps {
  playerCount: number;
  onLoadPreset: (roles: Array<{ name: string; description: string }>) => void;
}

export default function RolePresetSelector({ playerCount, onLoadPreset }: RolePresetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectPreset = (presetId: string) => {
    const preset = ROLE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      if (preset.id === 'custom') {
        onLoadPreset([]);
      } else {
        const roles = generateRolesFromPreset(preset, playerCount);
        onLoadPreset(roles);
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/40 hover:bg-slate-700/50 text-cyan-300 rounded-xl border border-cyan-500/20 transition-all text-sm"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Load Template
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Role Templates</h3>
              <p className="text-slate-400 text-sm mb-6">Choose a preset to quickly set up your game</p>

              <div className="grid gap-4">
                {ROLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className="text-left bg-slate-800/40 hover:bg-slate-700/50 border border-cyan-500/10 hover:border-cyan-500/30 rounded-2xl p-5 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {preset.name}
                      </h4>
                      <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-lg">
                        {preset.minPlayers}-{preset.maxPlayers} players
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">{preset.description}</p>
                    {preset.roles.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {preset.roles.slice(0, 4).map((role, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded-lg"
                          >
                            {role.name}
                          </span>
                        ))}
                        {preset.roles.length > 4 && (
                          <span className="text-xs text-slate-500">+{preset.roles.length - 4} more</span>
                        )}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-6 luxury-button-secondary"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
