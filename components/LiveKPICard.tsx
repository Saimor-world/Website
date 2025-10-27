'use client';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Brain, DollarSign, Phone, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { dashboardAuth } from '@/lib/dashboardAuth';

interface KPIData {
  memory: { facts: number };
  voice: { calls_today: number };
  costs: { today_usd: number };
  isDemo?: boolean;
}

export default function LiveKPICard() {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = dashboardAuth.getAuthHeaders();

        const response = await fetch('/api/dashboard/overview', { headers });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const result = await response.json();
        setData(result);
        setError(false);
      } catch (err) {
        console.error('KPI fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Update every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 animate-pulse"
          >
            <div className="h-16 bg-slate-200 rounded-lg mb-3" />
            <div className="h-8 bg-slate-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center">
        <p className="text-red-600">Dashboard-Daten konnten nicht geladen werden</p>
      </div>
    );
  }

  const kpis = [
    {
      icon: Brain,
      label: 'Memory Facts',
      value: data.memory.facts,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50'
    },
    {
      icon: Phone,
      label: 'Voice Calls Today',
      value: data.voice.calls_today,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: DollarSign,
      label: 'Costs Today',
      value: `$${data.costs.today_usd.toFixed(2)}`,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      trend: data.costs.today_usd < 3 ? 'good' : 'high'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Demo Badge */}
      {data.isDemo && (
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 border border-yellow-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Sparkles className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-semibold text-yellow-800">
            Demo-Daten (Login für Live-Daten)
          </span>
        </motion.div>
      )}

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            className={`relative p-6 rounded-2xl bg-gradient-to-br ${kpi.bgColor} border-2 border-white shadow-lg overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 opacity-10">
              <kpi.icon className="w-32 h-32 text-gray-400" strokeWidth={1} />
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-4 shadow-lg`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <kpi.icon className="w-7 h-7 text-white" />
              </motion.div>

              {/* Label */}
              <p className="text-sm font-medium text-gray-600 mb-2">{kpi.label}</p>

              {/* Value */}
              <div className="flex items-end justify-between">
                <motion.p
                  className="text-4xl font-bold text-gray-900"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                >
                  {kpi.value}
                </motion.p>

                {/* Trend indicator */}
                {kpi.trend && (
                  <motion.div
                    className={`flex items-center gap-1 ${
                      kpi.trend === 'good' ? 'text-green-600' : 'text-amber-600'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {kpi.trend === 'good' ? (
                      <TrendingDown className="w-5 h-5" />
                    ) : (
                      <TrendingUp className="w-5 h-5" />
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live indicator */}
      <motion.div
        className="flex items-center justify-center gap-2 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-green-500"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span>Live-Daten · Update alle 30s</span>
      </motion.div>
    </div>
  );
}
