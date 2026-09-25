'use client';

import Link from 'next/link';
import { useTheme } from '@/app/providers';
import { Sun, Moon, Menu, X, Sparkles, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        router.push('/login');
        router.refresh();
    };


    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo / Brand (Redirects to Home '/') */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 text-white shadow-lg shadow-indigo-500/25"
                        >
                            <Sparkles className="w-5 h-5 animate-pulse" />
                        </motion.div>
                        <span className="font-black text-lg tracking-tight bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 dark:from-white dark:via-indigo-200 dark:to-zinc-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                            PoliticAI Studio
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-7">
                        <motion.div whileHover={{ y: -1 }}>
                            <Link href="/generate" className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                Dashboard
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ y: -1 }}>
                            <Link href="/login" className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                Login
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ y: -1 }}>
                            <Link href="/register" className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                Register
                            </Link>
                        </motion.div>

                        {/* Theme Toggle Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            aria-label="Toggle Theme"
                            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all shadow-sm border border-zinc-200 dark:border-zinc-800"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-amber-400 rotate-90 transition-transform" />
                            ) : (
                                <Moon className="w-4 h-4 text-indigo-600 -rotate-12 transition-transform" />
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition border border-red-500/20 shadow-sm"
                        >
                            <LogOut className="w-4 h-4" /> Logout
                        </motion.button>
                    </div>

                    {/* Mobile Menu & Theme Button Controls */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                        >
                            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-2xl"
                    >
                        <div className="px-4 py-4 space-y-2">
                            <Link
                                href="/generate"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 transition"
                            >
                                Register
                            </Link>
                            <button
                                onClick={() => { handleLogout(); setIsOpen(false); }}
                                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}