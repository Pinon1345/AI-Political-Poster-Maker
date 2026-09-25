import React from 'react';
import Loader from './loader';
 // If you want to use the Loader here

interface CampaignPreviewProps {
    loading: boolean;
    error: string | null;
    content: string | null;
    candidateName: string;
    slogan: string;
    posterRef: React.RefObject<HTMLDivElement | null>; // Allows null safely
    onExportPng: () => void;
    onCopyClipboard: () => void;
    onClearError: () => void;
}

export default function CampaignPreview({
    loading,
    content,
    candidateName,
    slogan,
    posterRef,
    onExportPng,
    onCopyClipboard,
}: CampaignPreviewProps) {
    return (
        <div className="w-full flex flex-col items-center">
            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader text="Synthesizing your campaign assets..." />
                </div>
            ) : (
                <div
                    ref={posterRef}
                    className="w-full bg-gradient-to-br from-indigo-900 via-slate-900 to-zinc-900 p-8 rounded-2xl text-white shadow-2xl border border-indigo-500/30"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-wide uppercase text-indigo-300">
                            {candidateName || 'Candidate Name'}
                        </h2>
                        <p className="text-xl italic text-zinc-300">
                            &quot;{slogan || 'Your Campaign Slogan Here'}&quot;
                        </p>
                        <div className="mt-6 pt-6 border-t border-white/10 text-left text-sm text-zinc-200 whitespace-pre-wrap">
                            {content || 'Your AI-generated campaign strategies and breakdowns will appear here once synthesized.'}
                        </div>
                    </div>
                </div>
            )}

            {content && !loading && (
                <div className="flex gap-4 mt-6 w-full justify-end">
                    <button
                        onClick={onCopyClipboard}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold transition"
                    >
                        Copy Text
                    </button>
                    <button
                        onClick={onExportPng}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition"
                    >
                        Export PNG
                    </button>
                </div>
            )}
        </div>
    );
}