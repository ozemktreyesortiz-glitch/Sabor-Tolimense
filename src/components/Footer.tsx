import React from 'react';
import { Phone, Clock, MapPin, Heart, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO, getGeneralWhatsAppUrl } from '../utils/formatters';
import { RabbitAvatar } from './RabbitAvatar';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenOrder }) => {
  return (
    <footer id="contact-section" className="bg-[#361E0E] text-[#FFE8D6] pt-12 pb-8 border-t-4 border-[#E85D04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-amber-900/60">
          {/* Col 1: Brand & Rabbit Mascot */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <RabbitAvatar size="sm" />
              <div>
                <span className="font-serif-display text-2xl font-bold tracking-tight text-white block">
                  Sabor Tolimense
                </span>
                <span className="text-xs text-[#E85D04] font-semibold tracking-wider uppercase">
                  Auténtica Comida Tradicional
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed max-w-sm">
              “Traditional flavors from the heart of Tolima.”
            </p>
            <p className="text-xs text-amber-200/60 leading-relaxed max-w-sm">
              We specialize in ancestral Tolimense recipes: whole firewood roasted lechona, bijao-steamed tamales, viudo de pescado, and homemade artisanal treats.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-menu"
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors"
                >
                  Traditional Menu
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-promotions"
                  onClick={() => onNavigate('promotions')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Promotions (15% OFF)</span>
                  <span className="bg-[#E85D04] text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                    15%
                  </span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-tasting"
                  onClick={() => onNavigate('tasting')}
                  className="hover:text-white transition-colors"
                >
                  Food Tasting Experience
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-order"
                  onClick={onOpenOrder}
                  className="hover:text-white transition-colors"
                >
                  My Order
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Restaurant Information */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E85D04]">
              Restaurant Information
            </h4>
            <div className="space-y-2.5 text-xs text-amber-200/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Address:</strong>
                  <span>{RESTAURANT_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E85D04] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Opening Hours:</strong>
                  <span>{RESTAURANT_INFO.openingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">WhatsApp Orders:</strong>
                  <a
                    href={getGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#25D366] underline font-bold"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & mascot tribute */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-300/60 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Sabor Tolimense. All rights reserved. Colombian Pesos (COP).</p>
          <div className="flex items-center gap-2">
            <span>Official Mascot: El Conejito Tolimense</span>
            <span>•</span>
            <span className="text-[#E85D04] font-semibold">“Bienvenidos al sabor del Tolima”</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
