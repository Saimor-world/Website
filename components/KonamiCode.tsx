'use client';
import { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.key].slice(-konamiCode.length);
      setSequence(newSequence);

      // Check if konami code is entered
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        setActivated(true);
        setShowMessage(true);

        // Add special effects to body
        document.body.style.animation = 'rainbow 3s linear infinite';

        // Hide message after 5 seconds
        setTimeout(() => setShowMessage(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sequence, konamiCode]);

  useEffect(() => {
    if (activated) {
      // Inject rainbow animation
      const style = document.createElement('style');
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
      `;
      document.head.appendChild(style);
    }
  }, [activated]);

  return (
    <>
      {/* Easter Egg Activation Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none"
          >
            <motion.div
              className="relative px-8 py-6 rounded-3xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(212, 180, 131, 0.9) 100%)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(212, 180, 131, 0.6)',
                boxShadow: '0 20px 60px rgba(212, 180, 131, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.1)'
              }}
              animate={{
                rotate: [0, -2, 2, -2, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 0.5,
                repeat: 3
              }}
            >
              {/* Particle Burst */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#D4B483' : '#4A6741',
                    left: '50%',
                    top: '50%'
                  }}
                  animate={{
                    x: Math.cos((i * 30) * Math.PI / 180) * 100,
                    y: Math.sin((i * 30) * Math.PI / 180) * 100,
                    opacity: [1, 0],
                    scale: [1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut"
                  }}
                />
              ))}

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="text-6xl mb-3"
              >
                🌟✨🎮
              </motion.div>

              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                KONAMI CODE AKTIVIERT!
              </h2>

              <p className="text-white/90 text-lg">
                Du hast den geheimen Daten-Dschungel-Modus freigeschaltet! 🌿
              </p>

              {/* Glowing Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(212, 180, 131, 0.5)',
                    '0 0 60px rgba(212, 180, 131, 0.8)',
                    '0 0 20px rgba(212, 180, 131, 0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Rain Effect when activated */}
      <AnimatePresence>
        {activated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-saimor-green font-mono text-sm matrix-rain"
                style={{
                  left: `${i * 5}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                {Array.from({ length: 30 }).map((_, j) => (
                  <div key={j} className="opacity-70">
                    {String.fromCharCode(0x30A0 + Math.random() * 96)}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Secret Saimôr Logo */}
      <AnimatePresence>
        {activated && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9997]"
            style={{ width: '80vw', height: '80vh' }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-full h-full"
              style={{
                background: 'radial-gradient(circle, rgba(74, 103, 65, 0.1) 0%, transparent 70%)',
                filter: 'blur(100px)'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Particles Everywhere */}
      <AnimatePresence>
        {activated && (
          <motion.div className="fixed inset-0 pointer-events-none z-[9996]">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 3 === 0 ? '#D4B483' : i % 3 === 1 ? '#4A6741' : '#669966',
                  boxShadow: `0 0 ${10 + Math.random() * 20}px currentColor`
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 40 - 20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
