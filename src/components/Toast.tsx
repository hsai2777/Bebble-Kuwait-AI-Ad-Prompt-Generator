import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out animate-bounce-subtle">
      <div className="bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-xl border border-slate-700/50 flex items-center gap-2.5 text-xs sm:text-sm font-bold">
        {type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
        {type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
        {type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
        <span>{message}</span>
      </div>
    </div>
  );
};
