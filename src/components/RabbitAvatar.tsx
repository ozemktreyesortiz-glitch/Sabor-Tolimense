import React from 'react';
import { RABBIT_MASCOT_IMAGE } from '../data/menuData';

interface RabbitAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  isCelebrating?: boolean;
  holdingSignText?: string;
  className?: string;
}

export const RabbitAvatar: React.FC<RabbitAvatarProps> = ({
  size = 'md',
  message,
  isCelebrating = false,
  holdingSignText,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }[size];

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      <div className="relative group">
        {/* Subtle warm decorative aura */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#E85D04] to-[#F77F00] rounded-full blur-[2px] opacity-40 group-hover:opacity-75 transition duration-300"></div>

        <div className={`relative ${sizeClasses} rounded-full overflow-hidden border-2 border-white shadow-md bg-amber-50 shrink-0`}>
          <img
            src={RABBIT_MASCOT_IMAGE}
            alt="Mascota Conejito Sabor Tolimense"
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isCelebrating ? 'scale-110 rotate-3' : 'group-hover:scale-105'
            }`}
            referrerPolicy="no-referrer"
          />

          {isCelebrating && (
            <span className="absolute top-0 right-0 text-xs bg-[#E85D04] text-white px-1 rounded-full animate-bounce">
              ✨
            </span>
          )}
        </div>

        {holdingSignText && (
          <div className="absolute -bottom-2 -right-2 bg-[#E85D04] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-white whitespace-nowrap animate-pulse">
            {holdingSignText}
          </div>
        )}
      </div>

      {message && (
        <div className="relative bg-white/95 backdrop-blur-xs text-[#3D2619] text-xs md:text-sm px-3.5 py-2 rounded-2xl border border-[#E85D04]/20 shadow-sm max-w-xs">
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-b border-[#E85D04]/20 rotate-45"></div>
          <span className="font-medium">{message}</span>
        </div>
      )}
    </div>
  );
};
