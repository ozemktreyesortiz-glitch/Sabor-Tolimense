import React from 'react';
import { X, HeartPulse, AlertTriangle, ShieldCheck } from 'lucide-react';
import { MenuItem } from '../types';

interface NutritionModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NutritionModal: React.FC<NutritionModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  const info = item.nutritionalInfo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF4ED] rounded-3xl shadow-2xl border border-[#DFCBB9] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A2810] to-[#78350F] text-white p-5 pr-12">
          <button
            id="close-nutrition-modal-btn"
            onClick={onClose}
            aria-label="Cerrar modal nutricional"
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>Nutritional Information</span>
          </div>
          <h3 className="font-serif-display text-xl font-bold">{item.name}</h3>
          {item.spanishName && (
            <p className="text-xs font-medium text-amber-200/90 italic">
              Tradicional: {item.spanishName}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-[#4A2810]">
          {info ? (
            <>
              {/* Macro stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-[#EFE4D8] p-3 rounded-2xl border border-[#DFCBB9]">
                  <span className="block text-[11px] font-bold uppercase text-[#78350F]">
                    Calories
                  </span>
                  <span className="font-serif-display text-xl font-black text-[#E85D04]">
                    {info.calories}
                  </span>
                  <span className="text-[10px] text-amber-800">kcal</span>
                </div>

                <div className="bg-[#EFE4D8] p-3 rounded-2xl border border-[#DFCBB9]">
                  <span className="block text-[11px] font-bold uppercase text-[#78350F]">
                    Protein
                  </span>
                  <span className="font-serif-display text-xl font-black text-[#4A2810]">
                    {info.protein}
                  </span>
                  <span className="text-[10px] text-amber-800">porción</span>
                </div>

                <div className="bg-[#EFE4D8] p-3 rounded-2xl border border-[#DFCBB9]">
                  <span className="block text-[11px] font-bold uppercase text-[#78350F]">
                    Carbs
                  </span>
                  <span className="font-serif-display text-xl font-black text-[#4A2810]">
                    {info.carbs}
                  </span>
                  <span className="text-[10px] text-amber-800">hidratos</span>
                </div>

                <div className="bg-[#EFE4D8] p-3 rounded-2xl border border-[#DFCBB9]">
                  <span className="block text-[11px] font-bold uppercase text-[#78350F]">
                    Fat
                  </span>
                  <span className="font-serif-display text-xl font-black text-[#4A2810]">
                    {info.fat}
                  </span>
                  <span className="text-[10px] text-amber-800">grasas</span>
                </div>
              </div>

              {/* Allergens section */}
              <div className="space-y-2 p-3.5 bg-[#EFE4D8]/60 rounded-2xl border border-[#DFCBB9]">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#78350F]">
                  <ShieldCheck className="w-4 h-4 text-[#E85D04]" />
                  <span>Declared Allergens</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {info.allergens.map((alg) => (
                    <span
                      key={alg}
                      className="bg-white border border-[#DFCBB9] text-[#4A2810] text-xs px-2.5 py-1 rounded-lg font-medium"
                    >
                      {alg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Artisan disclaimer note */}
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-100/50 text-[11px] text-[#78350F] leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                <p>
                  <strong>Approximate values:</strong> {info.note || 'Prepared according to traditional artisanal recipes from Tolima. Actual nutritional values may vary slightly based on fresh seasonal ingredients and portion sizes.'}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-6 text-sm text-[#78350F]">
              Nutritional values currently approximate or unavailable for this item.
            </div>
          )}

          <button
            id="close-nutrition-btn"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#E85D04] hover:bg-[#D9480F] text-white font-bold text-sm transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
