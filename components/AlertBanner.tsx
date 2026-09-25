interface AlertBannerProps {
    type?: 'error' | 'success';
    message: string;
    onClose?: () => void;
}

export default function AlertBanner({ type = 'error', message, onClose }: AlertBannerProps) {
    const isError = type === 'error';

    return (
        <div className={`flex items-center justify-between p-4 mb-4 rounded-xl border transition-all ${isError
                ? 'bg-red-950/40 border-red-800/60 text-red-200'
                : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
            }`}>
            <div className="flex items-center space-x-3">
                <span className="text-lg">{isError ? '⚠️' : '✅'}</span>
                <p className="text-sm font-medium">{message}</p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-white text-sm font-bold px-2 py-1 transition-colors"
                >
                    ✕
                </button>
            )}
        </div>
    );
}