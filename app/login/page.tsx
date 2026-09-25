'use client';

import React, { useState } from 'react';
import API from '@/utils/api';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await API.post('/auth/login', { email, password });
            const data = response.data;

            // Extract token safely across different backend response patterns
            const token = data.token || data.accessToken || data.data?.token;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('accessToken', token);
            }

            // Extract and save user details (handles data.user, data.result, or flat user objects)
            const userObj = data.user || data.result || (data.name ? data : null);
            if (userObj) {
                localStorage.setItem('user', JSON.stringify(userObj));
            } else {
                // Fallback minimal profile if backend only sent token
                localStorage.setItem('user', JSON.stringify({ email }));
            }

            // Dispatch event to notify Navbar / layout state instantly
            window.dispatchEvent(new Event('storage'));

            router.push('/generate');
            router.refresh();
        } catch (err: unknown) {
            const errorObj = err as { response?: { data?: { error?: string; message?: string } } };
            setError(
                errorObj.response?.data?.error ||
                errorObj.response?.data?.message ||
                'Login failed. Please check credentials.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 bg-gradient-to-br from-zinc-50 via-indigo-50/20 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
            <div className="w-full max-w-md p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-300">
                <div className="text-center mb-8">
                    <div className="inline-flex p-3 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 mb-3 shadow-inner">
                        <LogIn className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Welcome Back</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Sign in to your political intelligence studio</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:outline-none transition text-zinc-900 dark:text-white text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-zinc-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:outline-none transition text-zinc-900 dark:text-white text-sm"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : <>Sign In <ArrowRight className="w-4 h-4" /></>}
                    </button>
                </form>

                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}