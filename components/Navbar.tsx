'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, Sparkles, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<{ name?: string; email?: string; image?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
            const userStr = localStorage.getItem('user');

            startTransition(() => {
                if (token) {
                    setIsLoggedIn(true);
                    if (userStr) {
                        try {
                            setUserData(JSON.parse(userStr));
                        } catch {
                            setUserData(null);
                        }
                    }
                } else {
                    setIsLoggedIn(false);
                    setUserData(null);
                }
            });
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
        setIsLoggedIn(false);
        setUserData(null);
        router.push('/login');
        router.refresh();
    };

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    // Helper to determine the avatar display source or fallback initial
    const userImage = userData?.image?.trim();
    const fallbackInitial = userData?.name ? userData.name.charAt(0).toUpperCase() : (userData?.email ? userData.email.charAt(0).toUpperCase() : 'U');

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-zinc-950/85 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo / Brand */}
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
                    <div className="hidden md:flex items-center gap-6">
                        <motion.div whileHover={{ y: -1 }}>
                            <Link href="/generate" className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                                <LayoutDashboard className="w-4 h-4" /> Dashboard
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
                            <Sun className="w-4 h-4 text-amber-400 rotate-90 transition-transform dark:hidden" />
                            <Moon className="w-4 h-4 text-indigo-600 -rotate-12 transition-transform hidden dark:block" />
                        </motion.button>

                        {/* Authentication / Avatar Profile Menu */}
                        {isLoggedIn ? (
                            <div className="relative group py-2">
                                <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
                                    {userImage ? (
                                        <Image
                                            width={36}
                                            height={36}
                                            src={userImage}
                                            alt={userData?.name || 'User Avatar'}
                                            className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30"
                                            onError={(e) => {
                                                // Fallback if the image URL fails to load or return network error
                                                (e.currentTarget as HTMLElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-indigo-500/30">
                                            {fallbackInitial}
                                        </div>
                                    )}
                                </div>

                                {/* Hover Dropdown Menu */}
                                <div className="absolute right-0 top-full pt-1 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 ease-out">
                                    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-3 space-y-3">
                                        <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800/80">
                                            <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{userData?.name || 'User Account'}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{userData?.email || 'Active Session'}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition"
                                        >
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu & Theme Controls */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                        >
                            <Sun className="w-4 h-4 text-amber-400 dark:hidden" />
                            <Moon className="w-4 h-4 text-indigo-600 hidden dark:block" />
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

                            {isLoggedIn ? (
                                <>
                                    <div className="flex items-center gap-3 px-4 py-2 border-t border-zinc-100 dark:border-zinc-900 mt-2 pt-2">
                                        {userImage ? (
                                            <Image
                                                width={32}
                                                height={32}
                                                src={userImage}
                                                alt="Avatar"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                                                {fallbackInitial}
                                            </div>
                                        )}
                                        <div className="truncate">
                                            <p className="text-xs text-zinc-500">Signed in as</p>
                                            <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm truncate">{userData?.name || userData?.email || 'User'}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
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
                                        className="block px-4 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition text-center"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}