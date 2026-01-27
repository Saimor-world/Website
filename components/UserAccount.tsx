'use client';

import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ShieldCheck, Zap, LogIn, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function UserAccount({ locale }: { locale: 'de' | 'en' }) {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const t = {
        de: {
            login: 'Anmelden',
            logout: 'Abmelden',
            pro: 'Pro Plan',
            owner: 'Besitzer',
            free: 'Konto',
            dashboard: 'Owner Dashboard',
            upgrade: 'Upgrade auf Pro'
        },
        en: {
            login: 'Login',
            logout: 'Logout',
            pro: 'Pro Plan',
            owner: 'Owner',
            free: 'Account',
            dashboard: 'Owner Dashboard',
            upgrade: 'Upgrade to Pro'
        }
    }[locale];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (status === 'loading') return <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />;

    if (!session) {
        return (
            <Link
                href="/login"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-emerald-500/30 transition-all hover:bg-white/5"
                title={t.login}
            >
                <LogIn className="w-4 h-4" />
            </Link>
        );
    }

    const role = session.user?.role || 'free';
    const isOwner = role === 'owner';
    const isPro = role === 'pro';

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border transition-all ${isOpen ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="hidden sm:flex flex-col items-start leading-none text-left mr-1">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                        {role === 'owner' ? t.owner : role === 'pro' ? 'Pro' : 'Free'}
                    </span>
                    <span className="text-[11px] text-white/90 font-medium max-w-[80px] truncate">
                        {session.user?.email?.split('@')[0]}
                    </span>
                </div>
                <ChevronDown className={`w-3 h-3 text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#081410] border border-white/10 shadow-2xl p-2 z-[60] backdrop-blur-xl"
                    >
                        <div className="px-3 py-2 border-b border-white/5 mb-2">
                            <p className="text-[10px] text-white/30 truncate">{session.user?.email}</p>
                        </div>

                        {isOwner && (
                            <Link
                                href="/owner"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <ShieldCheck className="w-4 h-4 text-saimor-gold" />
                                <span className="text-xs font-medium">{t.dashboard}</span>
                            </Link>
                        )}

                        {!isPro && !isOwner && (
                            <Link
                                href="/pricing"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-emerald-400 hover:text-white hover:bg-emerald-500/10 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <Zap className="w-4 h-4" />
                                <span className="text-xs font-medium">{t.upgrade}</span>
                            </Link>
                        )}

                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-colors mt-1"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-xs font-medium">{t.logout}</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
