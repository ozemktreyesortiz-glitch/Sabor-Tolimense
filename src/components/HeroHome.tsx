import React from 'react';
import { ArrowRight, UtensilsCrossed, Phone, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { RabbitAvatar } from './RabbitAvatar';
import { RESTAURANT_INFO, getGeneralWhatsAppUrl } from '../utils/formatters';
import { RABBIT_MESSAGES } from '../data/menuData';

// Authentic hero food image (Lechona Tolimense or Tasting Banquet)
import lechonaHeroImg from '../assets/images/lechona_tolimense_dish_1789763292741.jpg';
import tamalPreviewImg from '../assets/images/tamal_tolimense_dish_1789763309873.jpg';

interface HeroHomeProps {
  onViewMenu: () => void;
  onOrderNow: () => void;
  onExploreTasting: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({
  onViewMenu,
  onOrderNow,
  onExploreTasting,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F7EFE8] via-[#EFE3D5] to-[#F5EDE4] pt-6 pb-14 border-b border-[#DFCBB9]">
      {/* Subtle traditional Colombian textile accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#E85D04] via-[#F77F00] to-[#4A2810]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Friendly Rabbit Mascot Greeting Banner */}
        <div className="mb-6 inline-flex items-center gap-3 bg-[#FAF4ED] border border-[#DFCBB9] shadow-xs rounded-full py-1.5 px-4 max-w-full">
          <RabbitAvatar size="xs" />
          <p className="text-xs sm:text-sm font-medium text-[#4A2810] italic truncate">
            {RABBIT_MESSAGES.welcome}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-extrabold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auténtica Tradición Gastronómica del Tolima</span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#4A2810] tracking-tight leading-[1.15]">
                Welcome to the flavor of Tolima
              </h1>

              <p className="font-serif-display text-xl sm:text-2xl text-[#E85D04] font-bold">
                “Bienvenidos al sabor del Tolima”
              </p>

              <h2 className="text-base sm:text-lg text-[#78350F] font-medium leading-relaxed max-w-2xl">
                Authentic traditional food from the heart of Colombia. Prepared daily from 7:00 AM with ancestral firewood recipes, crispy lechona tolimense, tamales en hoja de bijao, and regional delicacies.
              </h2>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-order-now-btn"
                onClick={onOrderNow}
                className="flex items-center justify-center gap-2 bg-[#E85D04] hover:bg-[#D9480F] text-white text-base font-bold px-7 py-3.5 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-view-menu-btn"
                onClick={onViewMenu}
                className="flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-[#4A2810] border-2 border-[#4A2810]/30 hover:border-[#4A2810] text-base font-bold px-6 py-3.5 rounded-xl shadow-xs transition-all duration-200"
              >
                <span>View Menu</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm sm:text-base font-bold px-5 py-3.5 rounded-xl shadow-xs transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp ({RESTAURANT_INFO.phone})</span>
              </a>
            </div>

            {/* Restaurant Information Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#DFCBB9] text-[#4A2810]">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF4ED]/90 border border-[#DFCBB9]">
                <div className="p-2 rounded-lg bg-[#E85D04]/10 text-[#E85D04] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                    Opening Hours
                  </div>
                  <div className="text-sm font-black text-[#4A2810]">
                    {RESTAURANT_INFO.openingHours}
                  </div>
                  <div className="text-[11px] text-amber-900">
                    Traditional morning & lunch dining
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF4ED]/90 border border-[#DFCBB9]">
                <div className="p-2 rounded-lg bg-[#E85D04]/10 text-[#E85D04] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                    Restaurant Address
                  </div>
                  <div className="text-sm font-black text-[#4A2810]">
                    {RESTAURANT_INFO.address}
                  </div>
                  <div className="text-[11px] text-amber-900">
                    Avenida Picaleña, Calle 145, Colombia
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Food Photography with Mascot Highlight Card */}
          <div className="lg:col-span-5 relative">
            {/* Mascot welcoming badge in top corner */}
            <div className="absolute -top-4 -right-2 sm:right-4 z-20 bg-[#FAF4ED]/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-[#DFCBB9] flex items-center gap-3">
              <RabbitAvatar size="sm" />
              <div>
                <span className="text-[10px] uppercase font-bold text-[#E85D04] tracking-wider block">
                  Official Mascot
                </span>
                <span className="text-xs font-extrabold text-[#4A2810]">
                  Conejito Sabor Tolimense
                </span>
              </div>
            </div>

            {/* Main Food Photo Presentation */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-amber-950 aspect-4/3 sm:aspect-16/11 group">
              <img
                src={lechonaHeroImg}
                alt="Auténtica Lechona Tolimense con cuerona crocante"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

              {/* Plating overlay card */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-block bg-[#E85D04] text-white text-xs font-black px-2.5 py-0.5 rounded-md mb-1.5 uppercase tracking-wide">
                  Signature Dish
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-serif-display drop-shadow-sm">
                      Tolima Roasted Pork
                    </h3>
                    <p className="text-xs text-amber-100 line-clamp-1">
                      Lechona Tolimense • Extra crispy crackling skin & seasoned rice
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-amber-300">
                      $18.000
                    </span>
                    <span className="block text-[10px] text-white/80">
                      COP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating secondary badge for Tamal Tolimense */}
            <div
              onClick={onViewMenu}
              className="hidden sm:flex absolute -bottom-5 -left-4 z-20 bg-[#FAF4ED] rounded-2xl p-2.5 shadow-xl border border-[#DFCBB9] items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-amber-100 shrink-0">
                <img
                  src={tamalPreviewImg}
                  alt="Tamal Tolimense en hoja"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="pr-2">
                <span className="text-[10px] font-bold text-[#E85D04] uppercase">
                  Century Recipe
                </span>
                <div className="text-xs font-bold text-[#4A2810]">
                  Tolimense Steamed Tamale
                </div>
                <div className="text-[10px] text-[#B45309]">
                  Tamal Tolimense al Bijao
                </div>
                <div className="text-xs font-extrabold text-[#78350F]">
                  $12.000 COP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
