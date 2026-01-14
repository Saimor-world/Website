'use client';

/**
 * PlanetsNavigation - Orbital Department Navigation
 * Adapted from SAIMÔR Universe OS for Website
 * 
 * Features:
 * - 6 Planets in 150° arc above Môra Orb
 * - Hover effects with planet details
 * - Click navigation to metric details
 * - Smooth orbital animations
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Activity 
} from 'lucide-react';

interface Planet {
  id: string;
  label: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
  category: 'people' | 'process' | 'resources';
  icon: React.ElementType;
  color: string;
}

interface PlanetsNavigationProps {
  metrics: Planet[];
  onPlanetClick?: (planetId: string) => void;
}

export function PlanetsNavigation({ 
  metrics, 
  onPlanetClick 
}: PlanetsNavigationProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Calculate positions in 150° arc above orb
  const calculatePosition = (index: number, total: number) => {
    const arcDegrees = 150;
    const startAngle = 180 + (180 - arcDegrees) / 2; // Center the arc above
    const angleStep = arcDegrees / (total - 1);
    const angle = startAngle + (index * angleStep);
    const angleRad = (angle * Math.PI) / 180;
    
    // Distance from orb (responsive)
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 
      ? 120 // Mobile
      : 180; // Desktop
    
    // Calculate position relative to orb (bottom-right: 48px from edges)
    const orbX = typeof window !== 'undefined' 
      ? window.innerWidth - 48 - 46 // 46 = half orb size (92/2)
      : 0;
    const orbY = typeof window !== 'undefined'
      ? window.innerHeight - 48 - 46
      : 0;

    return {
      x: orbX + Math.cos(angleRad) * radius,
      y: orbY + Math.sin(angleRad) * radius
    };
  };

  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#10B981'; // Emerald
      case 'warning': return '#D4A857'; // Gold
      case 'critical': return '#EF4444'; // Red
      default: return '#4A6741';
    }
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Orbital Path Visualization (subtle) */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-10"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <radialGradient id="orbitalGlow">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>
        {typeof window !== 'undefined' && (
          <ellipse
            cx={window.innerWidth - 48 - 46}
            cy={window.innerHeight - 48 - 46}
            rx={window.innerWidth < 768 ? 120 : 180}
            ry={window.innerWidth < 768 ? 120 : 180}
            fill="none"
            stroke="url(#orbitalGlow)"
            strokeWidth="1"
            strokeDasharray="4,8"
          />
        )}
      </svg>

      {/* Planets */}
      {metrics.map((planet, index) => {
        const position = calculatePosition(index, metrics.length);
        const isHovered = hoveredPlanet === planet.id;
        const statusColor = getStatusColor(planet.status);
        const Icon = planet.icon;

        return (
          <motion.div
            key={planet.id}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: [0, 360]
            }}
            transition={{
              opacity: { duration: 0.5, delay: index * 0.1 },
              scale: { duration: 0.5, delay: index * 0.1 },
              rotate: { duration: 60, repeat: Infinity, ease: "linear" }
            }}
            onMouseEnter={() => setHoveredPlanet(planet.id)}
            onMouseLeave={() => setHoveredPlanet(null)}
            onClick={() => onPlanetClick?.(planet.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Planet Glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${statusColor}60 0%, transparent 70%)`,
                filter: 'blur(12px)',
                width: 60,
                height: 60,
                marginLeft: -10,
                marginTop: -10
              }}
              animate={{
                scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
                opacity: isHovered ? [0.6, 0.9, 0.6] : [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Planet Body */}
            <motion.div
              className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${statusColor}FF 0%, ${statusColor}CC 50%, ${statusColor}88 100%)`,
                boxShadow: `
                  0 4px 12px ${statusColor}60,
                  0 0 20px ${statusColor}40,
                  inset 0 1px 2px rgba(255,255,255,0.2)
                `,
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
              animate={{
                rotate: [0, -360] // Counter-rotate to keep icon upright
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Icon className="w-5 h-5 text-white drop-shadow-lg" />
            </motion.div>

            {/* Planet Label on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -50, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg whitespace-nowrap"
                  style={{
                    background: 'rgba(0, 0, 0, 0.95)',
                    border: `1px solid ${statusColor}`,
                    boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6)`
                  }}
                >
                  <p className="text-sm font-semibold text-white">{planet.label}</p>
                  <p className="text-xs text-white/60 mt-1">{planet.value}% Health</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: statusColor }}
                    />
                    <span className="text-[10px] text-white/50 uppercase">{planet.status}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

