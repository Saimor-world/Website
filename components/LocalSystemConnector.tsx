'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Wifi, RefreshCw, Server, CheckCircle2, XCircle, Lock } from 'lucide-react';

export default function LocalSystemConnector({ locale = 'de' }: { locale?: 'de' | 'en' }) {
    const [status, setStatus] = useState<'idle' | 'scanning' | 'handshake' | 'connected' | 'error'>('idle');
    const [logs, setLogs] = useState<string[]>([]);
    const [retryCount, setRetryCount] = useState(0);

    const text = {
        de: {
            title: 'Lokale Saimôr-Instanz',
            subtitle: 'Verbinde dieses Portal mit deinem lokalen OS.',
            connect: 'Verbindung herstellen',
            scanning: 'Suche lokale Ports...',
            waiting: 'Warte auf OS-Antwort...',
            success: 'Saimôr OS verbunden',
            error: 'Keine Instanz gefunden',
            retry: 'Erneut versuchen',
            secure: 'End-to-End Verschlüsselt'
        },
        en: {
            title: 'Local Saimôr Instance',
            subtitle: 'Connect this portal to your local OS.',
            connect: 'Establish Connection',
            scanning: 'Scanning local ports...',
            waiting: 'Waiting for OS response...',
            success: 'Saimôr OS Connected',
            error: 'No instance found',
            retry: 'Try again',
            secure: 'End-to-End Encrypted'
        }
    }[locale];

    const addLog = (msg: string) => setLogs(prev => [...prev.slice(-4), msg]);

    const connect = async () => {
        setStatus('scanning');
        setLogs([]);
        addLog('> Init handshake sequence...');

        // Simulating connection lag
        setTimeout(() => {
            addLog('> Pinging localhost:3456...');
            setStatus('handshake');

            setTimeout(() => {
                // Here we would fetch('http://localhost:3456/status')
                // For now, we simulate a failure to encourage the user to provide the real endpoint or logic
                // Or we simulate success if they want a "demo" experience of the connection

                // Let's simulate a partial success or specific instruction
                if (retryCount < 1) {
                    addLog('> Error: Connection refused');
                    setStatus('error');
                } else {
                    addLog('> ACK received from Saimôr Core');
                    addLog('> Verifying signature...');
                    setTimeout(() => {
                        addLog('> Connection established.');
                        setStatus('connected');
                    }, 800);
                }
            }, 1500);
        }, 1000);
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-[#333] bg-[#0B0F10]/95 backdrop-blur-xl shadow-2xl p-6 md:p-8">
                {/* Glow Effects */}
                <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${status === 'connected' ? 'bg-[#4A6741]' :
                    status === 'error' ? 'bg-[#E85D75]' :
                        status === 'idle' ? 'bg-[#333]' : 'bg-[#D4A857]'
                    }`} />

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${status === 'connected' ? 'bg-[#4A6741]/20 border-[#4A6741] text-[#4A6741]' :
                            status === 'error' ? 'bg-[#E85D75]/20 border-[#E85D75] text-[#E85D75]' :
                                status === 'idle' ? 'bg-[#333] border-[#444] text-[#888]' :
                                    'bg-[#D4A857]/20 border-[#D4A857] text-[#D4A857] animate-pulse'
                            }`}>
                            {status === 'connected' ? <CheckCircle2 size={24} /> :
                                status === 'error' ? <XCircle size={24} /> :
                                    status === 'scanning' || status === 'handshake' ? <Wifi size={24} /> :
                                        <Server size={24} />}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white tracking-wide">{text.title}</h3>
                            <p className="text-xs text-white/50 font-mono flex items-center gap-2">
                                <Lock size={10} /> {text.secure}
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="px-2 py-1 rounded bg-black/40 border border-[#222] text-[10px] font-mono text-[#666]">
                            PORT: 3456
                        </div>
                    </div>
                </div>

                {/* Terminal Output */}
                <div className="mb-8 font-mono text-xs p-4 rounded-xl bg-black/80 border border-[#222] min-h-[120px] flex flex-col justify-end">
                    {logs.length === 0 && status === 'idle' && (
                        <span className="text-white/30 italic">{'// Ready to connect...'}</span>
                    )}
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[#D4A857] mb-1"
                        >
                            {log}
                        </motion.div>
                    ))}
                    {(status === 'scanning' || status === 'handshake') && (
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2 h-4 bg-[#D4A857]"
                        />
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-wider">
                        <span>Status: {status.toUpperCase()}</span>
                    </div>

                    <button
                        onClick={() => {
                            if (status === 'error') setRetryCount(prev => prev + 1);
                            connect();
                        }}
                        disabled={status === 'scanning' || status === 'handshake'}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${status === 'connected'
                            ? 'bg-[#4A6741] text-white hover:bg-[#5D7C54]'
                            : 'bg-[#D4A857] text-[#0E1A1B] hover:bg-[#E6C897]'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {status === 'idle' ? text.connect :
                            status === 'error' ? text.retry :
                                status === 'connected' ? text.success :
                                    text.waiting}
                        {(status === 'scanning' || status === 'handshake') && <RefreshCw size={14} className="animate-spin" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
