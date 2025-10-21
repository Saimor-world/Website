'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DataNode {
  id: string;
  x: number;
  y: number;
  value: string;
  opacity: number;
  speed: number;
}

export default function DataJungle() {
  const [dataNodes, setDataNodes] = useState<DataNode[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Erstelle Daten-Chaos im Hintergrund
    const sampleData = [
      '0101', '1010', 'DATA', '∞', '{}', '[]', 'KPI', 'AI',
      '€', '%', '⚡', '∑', 'Δ', '≈', '→', '↓', '↑',
      'JSON', 'SQL', 'CSV', 'API', 'DB'
    ];

    const nodes: DataNode[] = Array.from({ length: 30 }, (_, i) => ({
      id: `node-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      value: sampleData[Math.floor(Math.random() * sampleData.length)],
      opacity: 0.05 + Math.random() * 0.15,
      speed: 30 + Math.random() * 40 // Langsamer: 30-70s statt schnell
    }));

    setDataNodes(nodes);
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* COOKIE-LIANEN - Tracker Cookies als verwinkelte Pfade */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{ opacity: isHovered ? 0.25 : 0.15 }}
      >
        <defs>
          <linearGradient id="cookieGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B9D83" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#4A6741" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B9D83" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* 3 Haupt-Cookie-Lianen */}
        {[
          'M 100,0 Q 150,200 120,400 Q 90,600 140,800 Q 180,950 150,1000',
          'M 500,0 Q 450,250 480,500 Q 510,750 460,1000',
          'M 900,0 Q 850,200 880,400 Q 910,600 860,800 Q 820,950 850,1000'
        ].map((path, i) => (
          <g key={`cookie-liana-${i}`}>
            <motion.path
              d={path}
              stroke="url(#cookieGradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: i * 0.5 }}
            />

            {/* Cookie-Krümel entlang der Liane */}
            {[0.2, 0.4, 0.6, 0.8].map((offset, j) => (
              <g key={`cookie-${i}-${j}`}>
                <circle
                  r="8"
                  fill="#D4B483"
                  opacity="0.6"
                >
                  <animate
                    attributeName="opacity"
                    values="0.4;0.8;0.4"
                    dur={`${4 + j}s`}
                    repeatCount="indefinite"
                    begin={`${j * 0.5}s`}
                  />
                  <animate
                    attributeName="r"
                    values="8;10;8"
                    dur={`${4 + j}s`}
                    repeatCount="indefinite"
                    begin={`${j * 0.5}s`}
                  />
                  <animateMotion
                    dur={`${60 + i * 10}s`}
                    repeatCount="indefinite"
                    path={path}
                    keyPoints={`${offset};${(offset + 0.5) % 1};${offset}`}
                    keyTimes="0;0.5;1"
                  />
                </circle>
                {/* Cookie-Bites (kleine Delle) */}
                <circle
                  r="3"
                  fill="rgba(0,0,0,0.2)"
                  opacity="0.3"
                >
                  <animateMotion
                    dur={`${60 + i * 10}s`}
                    repeatCount="indefinite"
                    path={path}
                    keyPoints={`${offset};${(offset + 0.5) % 1};${offset}`}
                    keyTimes="0;0.5;1"
                  />
                </circle>
              </g>
            ))}
          </g>
        ))}
      </svg>

      {/* DATENDSCHUNGEL - Cookie-Strings als Chaos */}
      {dataNodes.map((node, i) => {
        const cookieStrings = [
          '_ga=...', '_gid=...', 'utm_source', 'session_id',
          'tracking_id', 'user_pref', 'analytics', 'fbp',
          'PHPSESSID', 'cookie_consent', '__cf_bm', '_pk_id'
        ];
        const cookieValue = cookieStrings[i % cookieStrings.length];

        return (
          <motion.div
            key={node.id}
            className="absolute text-[10px] font-mono"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              color: i % 3 === 0 ? '#6B7F63' : i % 3 === 1 ? '#8B9D83' : '#9CA3AF',
              opacity: node.opacity,
              fontWeight: 'normal',
              letterSpacing: '-0.5px'
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.sin(i) * 8, 0],
              opacity: [node.opacity, node.opacity * 0.6, node.opacity],
            }}
            transition={{
              duration: node.speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            🍪 {cookieValue}
          </motion.div>
        );
      })}

      {/* LICHTSTRAHL - Vom Saimôr Logo (Zentrum oben) nach unten */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{ opacity: isHovered ? 0.15 : 0.08 }}
      >
        <defs>
          {/* Gradient für Lichtstrahl */}
          <linearGradient id="lightBeam" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#D4B483" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#D4B483" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4B483" stopOpacity="0" />
          </linearGradient>

          {/* Radial Gradient für Lichtquelle */}
          <radialGradient id="lightSource" cx="50%" cy="20%">
            <stop offset="0%" stopColor="#D4B483" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#D4B483" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Lichtquelle (Saimôr = Leuchtturm) */}
        <motion.circle
          cx="500"
          cy="200"
          r="100"
          fill="url(#lightSource)"
          animate={{
            r: [100, 120, 100],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Hauptlichtstrahl nach unten */}
        <motion.path
          d="M 400,200 L 450,1000 L 550,1000 L 600,200 Z"
          fill="url(#lightBeam)"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.2 : 0.1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Seitenstrahlen */}
        <motion.path
          d="M 350,200 L 200,1000 L 250,1000 L 380,200 Z"
          fill="url(#lightBeam)"
          opacity="0.5"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.path
          d="M 650,200 L 800,1000 L 750,1000 L 620,200 Z"
          fill="url(#lightBeam)"
          opacity="0.5"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, delay: 3 }}
        />
      </svg>

      {/* BRÜCKE - Path durch den Datendschungel */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        style={{ opacity: 0.12 }}
      >
        <defs>
          <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A6741" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#D4B483" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4A6741" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Haupt-Brückenpfad - elegant geschwungen */}
        <motion.path
          d="M 0,700 Q 250,650 500,600 T 1000,550"
          stroke="url(#bridgeGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: isHovered ? 0.4 : 0.25
          }}
          transition={{
            pathLength: { duration: 3, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          }}
        />

        {/* Parallele Brückenwege */}
        <motion.path
          d="M 0,720 Q 250,670 500,620 T 1000,570"
          stroke="url(#bridgeGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="5 3"
          opacity="0.15"
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 4, delay: 0.5 }}
        />

        <motion.path
          d="M 0,680 Q 250,630 500,580 T 1000,530"
          stroke="url(#bridgeGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="5 3"
          opacity="0.15"
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 4, delay: 1 }}
        />

        {/* Brücken-Partikel die den Pfad entlang wandern - LANGSAM! */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`bridge-particle-${i}`}
            r="4"
            fill="#D4B483"
            filter="url(#glow)"
            style={{ opacity: 0.6 }}
          >
            <animateMotion
              dur={`${40 + i * 10}s`}  // LANGSAM: 40-60s
              repeatCount="indefinite"
              path="M 0,700 Q 250,650 500,600 T 1000,550"
            />
          </motion.circle>
        ))}

        {/* Glow Filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* KLARHEITS-PARTIKEL - Folgen der Brücke */}
      {isHovered && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`clarity-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${60 + Math.sin(i) * 10}%`,
                background: 'radial-gradient(circle, #D4B483 0%, #4A6741 100%)',
                boxShadow: '0 0 15px rgba(212, 180, 131, 0.6)'
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Text-Hint (nur bei Hover) */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <p
            className="text-xs font-mono text-saimor-green text-center"
            style={{ textShadow: '0 0 10px rgba(74, 103, 65, 0.5)' }}
          >
            Daten → Klarheit → Wandel
          </p>
        </motion.div>
      )}

      {/* Saimôr Logo Glow (zentral, subtle) */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div
          className="w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.3) 0%, rgba(74, 103, 65, 0.2) 50%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
      </motion.div>
    </div>
  );
}
