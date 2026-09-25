'use client';

import React, { useState, useRef } from 'react';
import API from '@/utils/api';
import { Sparkles, Megaphone, UserCheck, FileText, Download, Copy, History, Trash2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { toPng } from 'html-to-image';

interface PosterResult {
    candidateName: string;
    slogan: string;
    generatedContent: string;
    createdAt?: string;
}

export default function GeneratePage() {
    const [candidateName, setCandidateName] = useState('');
    const [slogan, setSlogan] = useState('');
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<PosterResult | null>(null);

    // Initialize state lazily from localStorage to avoid useEffect setState warnings
    const [history, setHistory] = useState<PosterResult[]>(() => {
        if (typeof window === 'undefined') return [];
        const saved = localStorage.getItem('campaign_history');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error(e);
            }
        }
        return [];
    });

    const posterRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const { data } = await API.post('/posters/generate', {
                candidateName,
                slogan,
                prompt,
            });

            const newPoster: PosterResult = {
                ...data.poster,
                createdAt: new Date().toLocaleDateString()
            };

            setResult(newPoster);

            // Update history
            const updatedHistory = [newPoster, ...history.slice(0, 9)];
            setHistory(updatedHistory);
            localStorage.setItem('campaign_history', JSON.stringify(updatedHistory));

            toast.success('Campaign asset successfully synthesized!');
        } catch (err: unknown) {
            const errorObj = err as { response?: { data?: { details?: string; error?: string } } };
            const errMsg = errorObj.response?.data?.details || errorObj.response?.data?.error || 'Failed to generate poster.';
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPNG = async () => {
        if (!posterRef.current) return;
        try {
            const dataUrl = await toPng(posterRef.current, { cacheBust: true });
            const link = document.createElement('a');
            link.download = `${result?.candidateName.replace(/\s+/g, '_')}_campaign.png`;
            link.href = dataUrl;
            link.click();
            toast.success('Poster downloaded successfully as PNG!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to download image.');
        }
    };

    const handleCopyText = () => {
        if (!result) return;
        const text = `Candidate: ${result.candidateName}\nSlogan: "${result.slogan}"\n\nStrategy & Breakdown:\n${result.generatedContent}`;
        navigator.clipboard.writeText(text);
        toast.success('Copied full campaign details to clipboard!');
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('campaign_history');
        toast.success('Campaign history cleared.');
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-zinc-50 via-zinc-100 to-indigo-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 p-4 sm:p-8 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-3 border border-indigo-500/20">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" /> Production Studio Engine
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                        AI Political Campaign Dashboard
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl text-sm sm:text-base">
                        Build, customize, download high-resolution poster artwork, and maintain full archives of past political messaging.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controls Form */}
                    <form onSubmit={handleGenerate} className="lg:col-span-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-zinc-200/80 dark:border-zinc-800 space-y-5">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">
                            Campaign Inputs
                        </h2>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Candidate Name
                            </label>
                            <input
                                type="text"
                                value={candidateName}
                                onChange={(e) => setCandidateName(e.target.value)}
                                placeholder="e.g. Elena Vance"
                                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none transition text-sm text-zinc-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                <Megaphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Campaign Slogan
                            </label>
                            <input
                                type="text"
                                value={slogan}
                                onChange={(e) => setSlogan(e.target.value)}
                                placeholder="e.g. A Brighter Tomorrow, Today"
                                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none transition text-sm text-zinc-900 dark:text-white"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Policy Goals & Focus
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Green parks, tech education reform..."
                                rows={4}
                                className="w-full p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none transition text-sm text-zinc-900 dark:text-white resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Sparkles className="w-5 h-5 animate-spin" /> Synthesizing Asset...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" /> Generate Campaign Asset
                                </>
                            )}
                        </button>
                    </form>

                    {/* Preview & Output Section */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between">
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
                                <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-indigo-500" /> Live Interactive Preview
                                </h2>
                                {result && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleCopyText}
                                            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-indigo-500/10 hover:text-indigo-600 transition"
                                            title="Copy Details"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={handleDownloadPNG}
                                            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
                                        >
                                            <Download className="w-4 h-4" /> Download PNG
                                        </button>
                                    </div>
                                )}
                            </div>

                            {loading ? (
                                <div className="space-y-4 py-12 animate-pulse">
                                    <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
                                    <div className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full"></div>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-fadeIn">
                                    {/* Poster Card Container targeted for PNG Export */}
                                    <div ref={posterRef} className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-zinc-900 to-zinc-950 text-white shadow-2xl relative overflow-hidden border border-indigo-500/40">
                                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-2">Official Campaign Master</span>
                                        <h3 className="text-3xl font-black tracking-tight">{result.candidateName}</h3>
                                        <p className="text-base font-medium italic text-indigo-200/90 mt-1 mb-6">&quot;{result.slogan}&quot;</p>

                                        <div className="pt-4 border-t border-indigo-500/20">
                                            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300 block mb-1">Strategic Breakdown</span>
                                            <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 whitespace-pre-line font-mono bg-zinc-950/60 p-4 rounded-xl border border-indigo-500/20">
                                                {result.generatedContent}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                                    <Sparkles className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mb-3 animate-pulse" />
                                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Fill out your platform inputs and click generate to render your poster studio artwork.</p>
                                </div>
                            )}
                        </div>

                        {/* Campaign History Section */}
                        {history.length > 0 && (
                            <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-zinc-200/80 dark:border-zinc-800">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                        <History className="w-4 h-4 text-indigo-500" /> Recent Campaign Archive
                                    </h3>
                                    <button
                                        onClick={clearHistory}
                                        className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Clear Archive
                                    </button>
                                </div>
                                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                                    {history.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setResult(item)}
                                            className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition flex items-center justify-between group"
                                        >
                                            <div>
                                                <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                                                    {item.candidateName}
                                                </h4>
                                                <p className="text-xs text-zinc-500 truncate max-w-xs">&quot;{item.slogan}&quot;</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-zinc-400">{item.createdAt}</span>
                                                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}