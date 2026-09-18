import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { RabbitAvatar } from './RabbitAvatar';

interface RabbitToastProps {
  message: string | null;
  onDismiss: () => void;
  isCelebrating?: boolean;
}

export const RabbitToast: React.FC<RabbitToastProps> = ({
  message,
  onDismiss,
  isCelebrating = false,
}) => {
  if (!message) return null;

  return (
    <div
      id="rabbit-interactive-toast"
      className="fixed bottom-5 right-5 z-40 max-w-sm animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border-2 border-[#E85D04]/30 shadow-xl flex items-start gap-3 relative">
        <button
          onClick={onDismiss}
          className="absolute -top-2 -right-2 bg-[#4A2810] text-white hover:bg-[#E85D04] rounded-full p-1 shadow-md transition-colors"
          aria-label="Cerrar mensaje"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <RabbitAvatar size="sm" isCelebrating={isCelebrating} />

        <div className="pr-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E85D04] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Conejito Sabor Tolimense</span>
          </span>
          <p className="text-xs sm:text-sm font-semibold text-[#4A2810] mt-0.5 leading-snug">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
