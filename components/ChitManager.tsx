'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Chit } from '../types';

interface ChitManagerProps {
  chits: Chit[];
  onAddChit: (roleName: string, description?: string) => void;
  onEditChit: (chitId: string, roleName: string, description?: string) => void;
  onRemoveChit: (chitId: string) => void;
}

export default function ChitManager({ chits, onAddChit, onEditChit, onRemoveChit }: ChitManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (roleName.trim()) {
      onAddChit(roleName.trim(), description.trim() || undefined);
      setRoleName('');
      setDescription('');
      setIsAdding(false);
    }
  };

  const handleEdit = (chitId: string) => {
    if (roleName.trim()) {
      onEditChit(chitId, roleName.trim(), description.trim() || undefined);
      setRoleName('');
      setDescription('');
      setEditingId(null);
    }
  };

  const startEdit = (chit: Chit) => {
    setEditingId(chit.id);
    setRoleName(chit.roleName);
    setDescription(chit.description || '');
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setRoleName('');
    setDescription('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Roles</h3>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Add Role
          </button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="luxury-card space-y-3"
          >
            <input
              type="text"
              placeholder="Role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="luxury-input"
              autoFocus
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="luxury-input resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={cancelEdit}
                className="luxury-button-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={() => editingId ? handleEdit(editingId) : handleAdd()}
                disabled={!roleName.trim()}
                className="luxury-button-primary flex-1"
              >
                {editingId ? 'Save' : 'Add'}
              </button>
            </div>
          </motion.div>
        )}

        {chits.map((chit) => (
          <motion.div
            key={chit.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="luxury-card group hover:border-luxury-grey-light"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white truncate">
                  {chit.roleName}
                </h4>
                {chit.description && (
                  <p className="text-sm text-slate-300 mt-1 line-clamp-2">
                    {chit.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(chit)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-300"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onRemoveChit(chit.id)}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  title="Remove"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {chits.length === 0 && !isAdding && !editingId && (
        <div className="text-center py-12 text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="font-medium text-white">No roles added yet</p>
          <p className="text-sm mt-1">Click "Add Role" to get started</p>
        </div>
      )}
    </div>
  );
}
