'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DataParticle {
  id: string;
  path: number;
  position: number;
  speed: number;
  size: number;
  color: string;
}

export default function JungleElements() {
  const [particles, setParticles] = useState<DataParticle[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initialize data particles - reduced to 8 for better performance
    const initialParticles: DataParticle[] = Array.from({ length: 8 }, (_, i) => ({
      id: `particle-${i}`,
      path: i % 3, // 3 different liana paths
      position: Math.random(),
      speed: 0.02 + Math.random() * 0.03,
      size: 4 + Math.random() * 6,
      color: i % 2 === 0 ? '#D4B483' : '#4A6741'
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;

    let animationFrameId: number;
    let lastUpdate = Date.now();

    const animate = () => {
      const now = Date.now();
      // Update only every 100ms for better performance
      if (now - lastUpdate > 100) {
        setParticles(prev =>
          prev.map(p => ({
            ...p,
            position: (p.position + p.speed) % 1
          }))
        );
        lastUpdate = now;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [particles.length]);

  // SVG path definitions for lianas (vines)
  const lianaPaths = [
    // Left liana - elegant curve
    'M 50,0 Q 100,150 80,300 Q 60,450 100,600 Q 140,750 90,900',
    // Center liana - organic wave
    'M 250,0 Q 200,150 240,300 Q 280,450 230,600 Q 180,750 240,900',
    // Right liana - gentle sweep
    'M 450,0 Q 400,150 430,300 Q 460,450 420,600 Q 380,750 440,900'
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Container for Lianas */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 500 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: isHovered ? 0.8 : 0.6 }}
      >
        <defs>
          {/* Gradient for lianas */}
          <linearGradient id="lianaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A6741" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#5D7C54" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4A6741" stopOpacity="0.4" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Animated Lianas */}
        {lianaPaths.map((path, index) => (
          <g key={`liana-${index}`}>
            {/* Main liana path */}
            <motion.path
              d={path}
              fill="none"
              stroke="url(#lianaGradient)"
              strokeWidth={isHovered ? 4 : 3}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: isHovered ? 0.7 : 0.5,
                strokeWidth: isHovered ? 4 : 3
              }}
              transition={{
                pathLength: { duration: 2, delay: index * 0.3 },
                opacity: { duration: 0.5 },
                strokeWidth: { duration: 0.3 }
              }}
            />

            {/* Decorative leaves along the liana */}
            {[0.2, 0.4, 0.6, 0.8].map((offset, leafIndex) => (
              <motion.circle
                key={`leaf-${index}-${leafIndex}`}
                cx={0}
                cy={0}
                r={5}
                fill="#D4B483"
                opacity={0.7}
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isHovered ? 0.9 : 0.7,
                  scale: isHovered ? 1.5 : 1.2
                }}
                transition={{ duration: 0.3 }}
              >
                <animateMotion
                  dur={`${8 + index * 2}s`}
                  repeatCount="indefinite"
                  path={path}
                  keyPoints={`${offset};${offset}`}
                  keyTimes="0;1"
                />
              </motion.circle>
            ))}
          </g>
        ))}

        {/* Data Particles flowing through lianas */}
        {particles.map((particle) => {
          const path = lianaPaths[particle.path];
          const radius = (particle.size || 5) * 1.5; // Safe fallback
          return (
            <motion.circle
              key={particle.id}
              r={radius || 7.5}
              fill={particle.color || '#D4B483'}
              opacity={0.8}
              filter="url(#glow)"
              style={{
                boxShadow: `0 0 20px ${particle.color}`
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: isHovered ? [1, 1.5, 1] : [1, 1.3, 1]
              }}
              transition={{
                opacity: { duration: 2, repeat: Infinity },
                scale: { duration: 1.5, repeat: Infinity }
              }}
            >
              <animateMotion
                dur={`${20 / (particle.speed || 0.025)}s`}
                repeatCount="indefinite"
                path={path}
                keyPoints={`${particle.position || 0};${((particle.position || 0) + 0.5) % 1};${particle.position || 0}`}
                keyTimes="0;0.5;1"
              />
            </motion.circle>
          );
        })}
      </svg>

      {/* Floating organic shapes (jungle atmosphere) */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-48 h-48 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(74, 103, 65, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/5 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 180, 131, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)'
        }}
        animate={{
          x: [0, -25, 0],
          y: [0, 35, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Saimôr Logo Reveal Effect (center) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 0.08 : 0.03,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(74, 103, 65, 0.3) 0%, rgba(212, 180, 131, 0.2) 50%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
      </motion.div>

      {/* Interactive data nodes */}
      {isHovered && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Data connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.line
                key={`connection-${i}`}
                x1={`${20 + i * 15}%`}
                y1={`${30 + i * 10}%`}
                x2={`${40 + i * 10}%`}
                y2={`${50 + i * 15}%`}
                stroke="#4A6741"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
          </svg>
        </motion.div>
      )}

      {/* Depth particles (bokeh effect) - reduced to 5 for better performance */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`depth-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + i * 8}%`,
            background: i % 2 === 0 ? 'rgba(212, 180, 131, 0.4)' : 'rgba(74, 103, 65, 0.3)',
            boxShadow: `0 0 ${8 + i * 2}px ${i % 2 === 0 ? 'rgba(212, 180, 131, 0.5)' : 'rgba(74, 103, 65, 0.4)'}`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
