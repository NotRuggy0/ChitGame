'use client';

import { motion } from 'framer-motion';
import type { Player } from '../types';

interface VotingAreaProps {
  players: Player[];
  onVote: (targetPlayerId: string) => void;
  hasVoted: boolean;
  myVote?: string;
  isHost: boolean;
  voteCounts?: { [playerId: string]: number };
  onEndVoting?: () => void;
  hostVotingTimer?: number;
}

export default function VotingArea({ 
  players, 
  onVote, 
  hasVoted, 
  myVote,
  isHost,
  voteCounts = {},
  onEndVoting,
  hostVotingTimer
}: VotingAreaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl border border-cyan-400/30"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-cyan-300">Cast Your Vote</h3>
        {isHost && hostVotingTimer !== undefined && hostVotingTimer > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">
              You can end voting in <span className="text-cyan-400 font-bold">{hostVotingTimer}s</span>
            </span>
            {hostVotingTimer <= 30 && onEndVoting && (
              <button
                onClick={onEndVoting}
                className="luxury-button-secondary px-4 py-2 text-sm"
                type="button"
              >
                End Voting
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {players.map((player, index) => {
          const voteCount = voteCounts[player.id] || 0;
          const isMyVote = myVote === player.id;
          
          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex justify-between items-center p-3 rounded-xl border transition-all ${
                isMyVote
                  ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border-cyan-400/50'
                  : 'bg-slate-800/30 border-slate-700/50 hover:border-cyan-400/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  player.isHost ? 'bg-amber-400' : 'bg-cyan-400'
                }`} />
                <span className="text-slate-200">
                  {player.displayName}
                  {player.isHost && (
                    <span className="ml-2 text-xs text-amber-400">(Host)</span>
                  )}
                </span>
                {isHost && voteCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-lg text-xs text-cyan-300">
                    {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
                  </span>
                )}
              </div>

              <button
                onClick={() => onVote(player.id)}
                disabled={hasVoted}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  hasVoted
                    ? isMyVote
                      ? 'bg-cyan-500/30 text-cyan-300 cursor-default border border-cyan-400/50'
                      : 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
                    : 'luxury-button-primary hover:scale-105'
                }`}
                type="button"
              >
                {isMyVote ? 'Voted' : hasVoted ? 'Vote' : 'Vote'}
              </button>
            </motion.div>
          );
        })}
      </div>

      {hasVoted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-center text-sm text-slate-400"
        >
          {isHost 
            ? "You've voted. Waiting for others or use 'End Voting' button above."
            : "You've voted. Waiting for host to end voting..."}
        </motion.p>
      )}
    </motion.div>
  );
}
