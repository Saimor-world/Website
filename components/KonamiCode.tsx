'use client';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KonamiCode() {
  const [activated, setActivated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = useMemo(
    () => [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a'
    ],
    []
  );

  const handleActivation = useCallback(() => {
    setActivated(true);
    setShowMessage(true);

    // Add special effects to body
    document.body.style.animation = 'rainbow 3s linear infinite';

    // Haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }

    // Hide message after 5 seconds
    setTimeout(() => setShowMessage(false), 5000);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.key].slice(-konamiCode.length);
      setSequence(newSequence);

      // Check if konami code is entered
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        handleActivation();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sequence, konamiCode, handleActivation]);

  useEffect(() => {
    if (activated) {
      // Inject rainbow animation
      const style = document.createElement('style');
      style.id = 'konami-animations';
      style.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        @keyframes matrixRain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        .matrix-rain {
          animation: matrixRain 3s linear infinite;
        }

        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(0.5); opacity: 0; }
        }
      `;
      if (!document.getElementById('konami-animations')) {
        document.head.appendChild(style);
      }
    }
  }, [activated]);

  return (
    <>
      {/* Easter Egg Activation Message - Enhanced */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none"
          >
            <motion.div
              className="relative px-8 py-6 rounded-3xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.98) 0%, rgba(212, 180, 131, 0.95) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                border: '2px solid rgba(212, 180, 131, 0.7)',
                boxShadow: '0 25px 70px rgba(212, 180, 131, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.15)'
              }}
              animate={{
                rotate: [0, -1, 1, -1, 0],
                scale: [1, 1.03, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: 4,
                ease: "easeInOut"
              }}
            >
              {/* Enhanced Particle Burst */}
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: i % 3 === 0 ? '#D4A857' : i % 3 === 1 ? '#4A6741' : '#E6C897',
                    left: '50%',
                    top: '50%',
                    boxShadow: `0 0 10px ${i % 3 === 0 ? '#D4A857' : i % 3 === 1 ? '#4A6741' : '#E6C897'}`
                  }}
                  animate={{
                    x: Math.cos((i * 22.5) * Math.PI / 180) * 120,
                    y: Math.sin((i * 22.5) * Math.PI / 180) * 120,
                    opacity: [1, 0],
                    scale: [1, 0.3]
                  }}
                  transition={{
                    duration: 1.8,
                    ease: "easeOut"
                  }}
                />
              ))}

              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-7xl mb-4"
              >
                🌟✨🎮
              </motion.div>

              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-3"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  textShadow: '0 4px 12px rgba(0,0,0,0.4)'
                }}
              >
                RESONANZ AKTIVIERT!
              </h2>

              <p className="text-white/95 text-lg font-medium">
                Du hast den geheimen Daten-Dschungel-Modus freigeschaltet! 🌿
              </p>

              {/* Enhanced Glowing Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(212, 180, 131, 0.6)',
                    '0 0 80px rgba(212, 180, 131, 0.9)',
                    '0 0 30px rgba(212, 180, 131, 0.6)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Matrix Rain Effect */}
      <AnimatePresence>
        {activated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-saimor-green font-mono text-sm matrix-rain"
                style={{
                  left: `${i * 4}%`,
                  animationDelay: `${i * 0.15}s`,
                  filter: 'drop-shadow(0 0 3px rgba(74, 103, 65, 0.8))'
                }}
              >
                {Array.from({ length: 35 }).map((_, j) => (
                  <div key={j} className="opacity-80">
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Secret Saimôr Logo */}
      <AnimatePresence>
        {activated && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 0.06, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9997]"
            style={{ width: '85vw', height: '85vh' }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-full h-full"
              style={{
                background: 'radial-gradient(circle, rgba(74, 103, 65, 0.12) 0%, transparent 70%)',
                filter: 'blur(120px)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Particles Everywhere */}
      <AnimatePresence>
        {activated && (
          <motion.div className="fixed inset-0 pointer-events-none z-[9996]">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 4 === 0 ? '#D4A857' : i % 4 === 1 ? '#4A6741' : i % 4 === 2 ? '#669966' : '#E6C897',
                  boxShadow: `0 0 ${12 + Math.random() * 24}px currentColor`,
                  filter: 'blur(1px)'
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.8, 0]
                }}
                transition={{
                  duration: 3.5 + Math.random() * 2.5,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Data Connections */}
      <AnimatePresence>
        {activated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9995]"
          >
            <svg className="w-full h-full" preserveAspectRatio="none">
              {Array.from({ length: 8 }).map((_, i) => {
                const x1 = Math.random() * 100;
                const y1 = Math.random() * 100;
                const x2 = Math.random() * 100;
                const y2 = Math.random() * 100;

                return (
                  <motion.line
                    key={i}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="rgba(212, 180, 131, 0.4)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                );
              })}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
