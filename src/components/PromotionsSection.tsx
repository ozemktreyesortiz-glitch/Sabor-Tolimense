import React from 'react';
import { Tag, Sparkles, Check, Gift } from 'lucide-react';
import { Promotion } from '../types';
import { PROMOTIONS } from '../data/menuData';
import { RabbitAvatar } from './RabbitAvatar';

interface PromotionsSectionProps {
  appliedPromotion: Promotion | null;
  onApplyPromotion: (promo: Promotion) => void;
  onRemovePromotion: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  appliedPromotion,
  onApplyPromotion,
  onRemovePromotion,
}) => {
  return (
    <section id="promotions-section" className="py-12 bg-[#ECE0D3]/50 border-b border-[#DFCBB9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-extrabold uppercase tracking-wider mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>Special Family Celebrations</span>
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#4A2810]">
            Special Promotions
          </h2>
          <p className="text-sm sm:text-base text-[#78350F] mt-2">
            Celebrate the pillars of our Colombian families with authentic flavors and an exclusive 15% discount.
          </p>
        </div>

        {/* Promotional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PROMOTIONS.map((promo) => {
            const isSelected = appliedPromotion?.id === promo.id;

            return (
              <div
                key={promo.id}
                id={`promo-card-${promo.id}`}
                className={`relative rounded-3xl p-6 transition-all duration-300 border-2 overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#FAF3EC] to-white border-[#E85D04] shadow-xl ring-2 ring-[#E85D04]/30'
                    : 'bg-[#FAF4ED] border-[#DFCBB9] shadow-sm hover:shadow-md hover:border-[#D4BBA5]'
                }`}
              >
                {/* Decorative background accent */}
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#E85D04]/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Top row: Rabbit Mascot holding sign & Discount badge */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <RabbitAvatar
                      size="sm"
                      holdingSignText="Enjoy 15% OFF!"
                      message={promo.tagline}
                    />

                    <div className="text-right shrink-0">
                      <div className="bg-[#E85D04] text-white text-sm sm:text-base font-black px-3.5 py-1 rounded-xl shadow-xs inline-flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{promo.badge}</span>
                      </div>
                      <span className="block text-[10px] text-[#78350F] font-bold mt-1 tracking-wider uppercase">
                        Código: {promo.code}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif-display text-2xl font-bold text-[#4A2810] mb-2">
                    {promo.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed mb-4">
                    {promo.description}
                  </p>

                  <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 mb-5 text-[11px] text-[#78350F]">
                    {promo.isActive ? (
                      <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                        <Sparkles className="w-3.5 h-3.5 text-[#E85D04]" />
                        <span>{promo.expiryNote}</span>
                      </div>
                    ) : (
                      <span className="text-amber-800 font-medium">
                        Próxima temporada festiva
                      </span>
                    )}
                  </div>
                </div>

                {/* Apply / Remove Button */}
                {promo.isActive ? (
                  <div>
                    {isSelected ? (
                      <button
                        id={`remove-promo-btn-${promo.id}`}
                        onClick={onRemovePromotion}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>15% Promotion Applied • Click to Remove</span>
                      </button>
                    ) : (
                      <button
                        id={`apply-promo-btn-${promo.id}`}
                        onClick={() => onApplyPromotion(promo)}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E85D04] hover:bg-[#D9480F] text-white font-bold text-sm shadow-md transition-all active:scale-95"
                      >
                        <Tag className="w-4 h-4" />
                        <span>Apply 15% OFF to Order</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-2.5 px-4 bg-gray-100 text-gray-500 rounded-xl text-xs font-semibold">
                    Seasonal Promotion (Upcoming)
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
