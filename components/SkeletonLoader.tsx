'use client';

import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="luxury-card animate-pulse">
      <div className="h-8 bg-slate-700/50 rounded-lg w-3/4 mb-4"></div>
      <div className="h-4 bg-slate-700/50 rounded w-full mb-2"></div>
      <div className="h-4 bg-slate-700/50 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-slate-700/50 rounded w-4/6"></div>
    </div>
  );
}

export function SkeletonButton() {
  return (
    <div className="h-12 bg-slate-700/50 rounded-2xl w-full animate-pulse"></div>
  );
}

export function SkeletonPlayerList() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-slate-800/40 rounded-2xl animate-pulse">
          <div className="w-10 h-10 bg-slate-700/50 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-700/50 rounded w-24 mb-2"></div>
            <div className="h-3 bg-slate-700/50 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
