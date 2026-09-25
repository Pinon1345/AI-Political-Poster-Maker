'use client';

import React, { useState } from 'react';
import API from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            router.push('/generate');
        } catch (err: unknown) {
            const errorObj = err as { response?: { data?: { error?: string } } };
            setError(errorObj.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-xl shadow-md border dark:border-zinc-800">
                <h2 className="text-2xl font-bold mb-6 text-center text-zinc-900 dark:text-white">Login to Campaign App</h2>
                {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                        required
                    />
                </div>
                <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                    Login
                </button>
            </form>
        </div>
    );
}