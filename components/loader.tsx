import React from 'react';
import { Sparkles } from 'lucide-react';

interface LoaderProps {
    text?: string;
}

export default function Loader({ text = 'Loading...' }: LoaderProps) {
    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-3">
            <div className="relative flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 animate-spin" />
                <Sparkles className="absolute w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            </div>
            {text && (
                <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 tracking-wide animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
}