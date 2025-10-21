'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, Users, Activity, Zap } from 'lucide-react';

interface KPI {
  label: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  icon: typeof TrendingUp;
  color: string;
}

export default function DataDashboard() {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  const kpis: KPI[] = [
    {
      label: 'Klarheitsindex',
      value: 87,
      target: 100,
      trend: 'up',
      icon: Activity,
      color: '#4A6741'
    },
    {
      label: 'Team-Resonanz',
      value: 92,
      target: 100,
      trend: 'up',
      icon: Users,
      color: '#D4B483'
    },
    {
      label: 'Entscheidungsgeschwindigkeit',
      value: 78,
      target: 100,
      trend: 'up',
      icon: Zap,
      color: '#5D7C54'
    },
    {
      label: 'Wandel-Momentum',
      value: 85,
      target: 100,
      trend: 'up',
      icon: TrendingUp,
      color: '#669966'
    }
  ];

  useEffect(() => {
    // Animate values on mount
    const timers = kpis.map((kpi, index) => {
      return setTimeout(() => {
        let current = 0;
        const increment = kpi.value / 50;
        const interval = setInterval(() => {
          current += increment;
          if (current >= kpi.value) {
            current = kpi.value;
            clearInterval(interval);
          }
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[index] = Math.round(current);
            return newValues;
          });
        }, 20);
      }, index * 200);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative p-8 rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.05) 0%, rgba(212, 180, 131, 0.08) 100%)',
        border: '1px solid rgba(212, 180, 131, 0.3)',
        boxShadow: '0 20px 40px rgba(74, 103, 65, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#4A6741"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mb-8"
      >
        <h3
          className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Live Dashboard Preview
        </h3>
        <p className="text-slate-600 text-sm">
          Echtzeit-Einblicke in organisationale Klarheit
        </p>
      </motion.div>

      {/* KPI Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const progress = (animatedValues[index] / kpi.target) * 100;

          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="relative p-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 245, 240, 0.8) 100%)',
                border: `1px solid ${kpi.color}40`,
                boxShadow: `0 4px 15px ${kpi.color}20`
              }}
            >
              {/* Icon */}
              <div className="flex items-center justify-between mb-3">
                <Icon size={24} style={{ color: kpi.color }} />
                <motion.span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{
                    background: `${kpi.color}20`,
                    color: kpi.color
                  }}
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                >
                  ↗ +{Math.round(progress - 70)}%
                </motion.span>
              </div>

              {/* Value */}
              <div className="mb-2">
                <motion.div
                  className="text-3xl font-bold"
                  style={{ color: kpi.color }}
                  animate={{
                    scale: isHovered ? [1, 1.05, 1] : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {animatedValues[index]}
                  <span className="text-lg text-slate-500">/{kpi.target}</span>
                </motion.div>
              </div>

              {/* Label */}
              <div className="text-xs text-slate-600 font-medium mb-3">
                {kpi.label}
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${kpi.color} 0%, ${kpi.color}cc 100%)`,
                    boxShadow: `0 0 10px ${kpi.color}60`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Chart Simulation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 h-32 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 245, 240, 0.9) 100%)',
          border: '1px solid rgba(212, 180, 131, 0.3)'
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 800 120" preserveAspectRatio="none">
          {/* Chart Line */}
          <motion.path
            d="M0,80 Q100,60 200,70 T400,50 Q500,40 600,55 T800,45"
            fill="none"
            stroke="#4A6741"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Gradient Fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A6741" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4A6741" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,80 Q100,60 200,70 T400,50 Q500,40 600,55 T800,45 L800,120 L0,120 Z"
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* Data Points */}
          {[0, 200, 400, 600, 800].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={[80, 70, 50, 55, 45][i]}
              r="4"
              fill="#D4B483"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1] }}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating Data Particles */}
      {isHovered && (
        <motion.div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                background: i % 2 === 0 ? '#D4B483' : '#4A6741',
                boxShadow: `0 0 10px ${i % 2 === 0 ? '#D4B483' : '#4A6741'}`
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Interactive Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="relative z-10 mt-6 text-center"
      >
        <p className="text-xs text-slate-500 italic">
          {isHovered
            ? '✨ Live-Daten fließen durch das System...'
            : 'Hover für interaktive Einblicke'
          }
        </p>
      </motion.div>
    </motion.div>
  );
}
