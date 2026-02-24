'use client';

import { motion } from 'framer-motion';
import type { VotingResults as VotingResultsType } from '../types';

interface VotingResultsProps {
  results: VotingResultsType;
  onContinue: () => void;
}

export default function VotingResults({ results, onContinue }: VotingResultsProps) {
  // Sort players by vote count (descending)
  const sortedPlayers = Object.entries(results.voteCounts)
    .map(([playerId, count]) => ({
      playerId,
      playerName: results.playerNames[playerId],
      voteCount: count,
    }))
    .sort((a, b) => b.voteCount - a.voteCount);

  const maxVotes = sortedPlayers.length > 0 ? sortedPlayers[0].voteCount : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl px-4"
    >
      <div className="luxury-card wave-glow p-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="inline-block p-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl mb-4 border border-cyan-400/20">
            <svg className="w-16 h-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-cyan-300 mb-2">Voting Results</h2>
          <p className="text-slate-400">Total Votes: {results.totalVotes}</p>
        </motion.div>

        <div className="space-y-3 mb-8">
          {sortedPlayers.map((player, index) => {
            const percentage = results.totalVotes > 0 
              ? Math.round((player.voteCount / results.totalVotes) * 100) 
              : 0;
            const isWinner = player.voteCount === maxVotes && maxVotes > 0;

            return (
              <motion.div
                key={player.playerId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-4 rounded-xl border ${
                  isWinner
                    ? 'bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border-amber-400/50'
                    : 'bg-slate-800/30 border-slate-700/50'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${
                      isWinner ? 'text-amber-400' : 'text-slate-500'
                    }`}>
                      #{index + 1}
                    </span>
                    <span className={`font-medium ${
                      isWinner ? 'text-amber-300' : 'text-slate-200'
                    }`}>
                      {player.playerName}
                    </span>
                    {isWinner && (
                      <span className="text-xl">👑</span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      isWinner ? 'text-amber-400' : 'text-cyan-400'
                    }`}>
                      {player.voteCount} {player.voteCount === 1 ? 'vote' : 'votes'}
                    </div>
                    <div className="text-sm text-slate-400">{percentage}%</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-700/30 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={`h-full ${
                      isWinner
                        ? 'bg-gradient-to-r from-amber-400 to-cyan-400'
                        : 'bg-gradient-to-r from-cyan-500 to-teal-500'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={onContinue}
          className="luxury-button-primary w-full text-lg py-4"
          type="button"
        >
          Continue to Chat
        </motion.button>
      </div>
    </motion.div>
  );
}
