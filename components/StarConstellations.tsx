'use client';

/**
 * StarConstellations - Semantic Connection Lines
 * Visualizes relationships between metrics as constellations
 * 
 * Features:
 * - SVG lines between related metrics
 * - Animated flow particles
 * - Responsive to hover states
 * - Performance optimized (no WebGL)
 */

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Metric {
  id: string;
  position?: { x: number; y: number };
}

interface Connection {
  from: string;
  to: string;
  strength: number; // 0.3-1.0
  type?: 'strong' | 'medium' | 'weak';
}

interface StarConstellationsProps {
  metrics: Metric[];
  connections: Connection[];
  hoveredMetricId?: string | null;
}

export function StarConstellations({ 
  metrics, 
  connections,
  hoveredMetricId 
}: StarConstellationsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate particle positions along paths
  const particles = useMemo(() => {
    if (!mounted) return [];
    
    return connections.map((conn, i) => ({
      connectionId: `${conn.from}-${conn.to}`,
      delay: i * 0.5,
      duration: 4 + Math.random() * 2
    }));
  }, [connections, mounted]);

  if (!mounted) return null;

  // Find metric positions
  const getMetricPosition = (id: string) => {
    const metric = metrics.find(m => m.id === id);
    return metric?.position || { x: 0, y: 0 };
  };

  return (
    <svg 
      className="fixed inset-0 w-full h-full pointer-events-none z-30"
      style={{ opacity: 0.6 }}
    >
      <defs>
        {/* Gradient for constellation lines */}
        <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
          <stop offset="50%" stopColor="rgba(16, 185, 129, 0.6)" />
          <stop offset="100%" stopColor="rgba(16, 185, 129, 0.2)" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="constellationGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Connection Lines */}
      {connections.map((connection, index) => {
        const fromPos = getMetricPosition(connection.from);
        const toPos = getMetricPosition(connection.to);

        // Check if this connection is related to hovered metric
        const isActive = hoveredMetricId === connection.from || hoveredMetricId === connection.to;
        const opacity = connection.strength * (isActive ? 1.0 : 0.4);
        const strokeWidth = connection.strength * (isActive ? 3 : 1.5);

        // If positions are not set, skip
        if (!fromPos.x || !toPos.x) return null;

        // Create organic curve (not straight line)
        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;
        const offset = Math.sin(index * 2.3) * 20; // Organic variation
        const cpX = midX + offset;
        const cpY = midY + offset * 0.7;

        const pathD = `M ${fromPos.x},${fromPos.y} Q ${cpX},${cpY} ${toPos.x},${toPos.y}`;

        return (
          <g key={`${connection.from}-${connection.to}`}>
            {/* Main constellation line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#constellationGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={connection.strength < 0.5 ? "4,6" : "none"}
              filter="url(#constellationGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: opacity
              }}
              transition={{
                pathLength: { duration: 1.5, delay: index * 0.1, ease: "easeOut" },
                opacity: { duration: 0.3 }
              }}
            />

            {/* Traveling particles (when active) */}
            {isActive && (
              <motion.circle
                r="3"
                fill="#10B981"
                filter="url(#constellationGlow)"
                initial={{ opacity: 0 }}
                animate={{
                  offsetDistance: ['0%', '100%'],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.1, 0.9, 1]
                }}
                style={{
                  offsetPath: `path('${pathD}')`,
                  offsetRotate: '0deg'
                }}
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path={pathD}
                />
              </motion.circle>
            )}
          </g>
        );
      })}

      {/* Node Stars at metric positions */}
      {metrics.map((metric, index) => {
        if (!metric.position?.x) return null;

        const isHovered = hoveredMetricId === metric.id;

        return (
          <motion.g key={metric.id}>
            {/* Outer glow */}
            {isHovered && (
              <motion.circle
                cx={metric.position.x}
                cy={metric.position.y}
                r="20"
                fill="url(#constellationGradient)"
                opacity="0.3"
                filter="url(#constellationGlow)"
                animate={{
                  r: [20, 30, 20],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

            {/* Star point */}
            <motion.circle
              cx={metric.position.x}
              cy={metric.position.y}
              r={isHovered ? "6" : "4"}
              fill="#10B981"
              filter="url(#constellationGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: isHovered ? 1 : 0.7
              }}
              transition={{
                scale: { duration: 0.5, delay: index * 0.1 },
                opacity: { duration: 0.3 }
              }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

