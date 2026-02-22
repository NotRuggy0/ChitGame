'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

interface NavbarProps {
  showLogo?: boolean;
}

export default function Navbar({ showLogo = true }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'about' | 'howto' | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const openModal = (modal: 'about' | 'howto') => {
    setActiveModal(modal);
    closeMenu();
  };

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            {showLogo && (
              <div className="flex-shrink-0">
                <Logo variant="minimal" />
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 ml-auto">
              <button
                onClick={() => openModal('about')}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                About Us
              </button>
              <button
                onClick={() => openModal('howto')}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                How to Play
              </button>
              <a
                href="https://github.com/NotRuggy0/ChitGame"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
              >
                GitHub
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-auto"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/10 bg-gray-950/95 backdrop-blur-xl"
            >
              <div className="px-4 py-3 space-y-2">
                <button
                  onClick={() => openModal('about')}
                  className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => openModal('howto')}
                  className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  How to Play
                </button>
                <a
                  href="https://github.com/NotRuggy0/ChitGame"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modal Overlays */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="luxury-card max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              {activeModal === 'about' && (
                <div className="pr-8">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    About Chit Game
                  </h2>
                  <div className="space-y-4 text-slate-300">
                    <p className="text-lg">
                      Welcome to <span className="font-semibold text-white">Chit Game</span> - the premium platform for fair and exciting role assignment in your favorite games!
                    </p>
                    <p>
                      Whether you're playing Mafia, Werewolf, Secret Hitler, or any other social deduction game, 
                      our platform ensures everyone gets their role privately and securely.
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-6">
                      <h3 className="font-semibold text-white mb-3">✨ Why Chit Game?</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          <span><strong>100% Fair:</strong> Server-side random assignment ensures no cheating</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          <span><strong>Private Roles:</strong> Each player only sees their own assignment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          <span><strong>Real-time Sync:</strong> Everyone joins instantly with WebSocket technology</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          <span><strong>Mobile Friendly:</strong> Play on any device, anywhere</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-0.5">✓</span>
                          <span><strong>Beautiful Design:</strong> Premium UI with smooth animations</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-sm text-slate-400 mt-6 italic">
                      Built with precision and care for the best gaming experience.
                    </p>
                  </div>
                </div>
              )}

              {activeModal === 'howto' && (
                <div className="pr-8">
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    How to Play
                  </h2>
                  <div className="space-y-6 text-slate-300">
                    {/* Host Instructions */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-orange-500/30 rounded-xl p-5">
                      <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        For Hosts
                      </h3>
                      <ol className="space-y-3 text-sm">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">1</span>
                          <div>
                            <strong className="text-white">Create a Game:</strong> Click "Create New Game" and enter your name and max players (2-20)
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">2</span>
                          <div>
                            <strong className="text-white">Share the Code:</strong> Give the 6-character code to your friends
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">3</span>
                          <div>
                            <strong className="text-white">Add Roles:</strong> Click "Add Role" to create roles (must match player count)
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">4</span>
                          <div>
                            <strong className="text-white">Start Game:</strong> When all players are ready and roles match, click "Start Game"
                          </div>
                        </li>
                      </ol>
                    </div>

                    {/* Player Instructions */}
                    <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                      <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        For Players
                      </h3>
                      <ol className="space-y-3 text-sm">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">1</span>
                          <div>
                            <strong className="text-white">Join Game:</strong> Click "Join Game" on the home screen
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">2</span>
                          <div>
                            <strong className="text-white">Enter Details:</strong> Type the game code and your display name
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">3</span>
                          <div>
                            <strong className="text-white">Ready Up:</strong> Click "Ready Up" when you're ready to play
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">4</span>
                          <div>
                            <strong className="text-white">Get Your Role:</strong> Once the host starts, you'll see your private role!
                          </div>
                        </li>
                      </ol>
                    </div>

                    {/* Tips */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="font-semibold text-white mb-2 text-sm">💡 Pro Tips</h4>
                      <ul className="space-y-1 text-xs text-slate-400">
                        <li>• Role count must exactly match the number of players</li>
                        <li>• All players (including host) must click "Ready Up"</li>
                        <li>• Roles are assigned randomly and kept 100% private</li>
                        <li>• You can edit/remove roles before starting the game</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
