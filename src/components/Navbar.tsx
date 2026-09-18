import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, Clock, MapPin, Sparkles } from 'lucide-react';
import { RabbitAvatar } from './RabbitAvatar';
import { RESTAURANT_INFO, getGeneralWhatsAppUrl } from '../utils/formatters';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'tasting', label: 'Food Tasting' },
    { id: 'order', label: 'My Order' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'order') {
      openCart();
    } else {
      setActiveTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7EFE8]/95 backdrop-blur-md border-b border-[#DFCBB9] shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-[#4A2810] text-[#FFE8D6] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 text-[11px] md:text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#F77F00]" />
              <span>{RESTAURANT_INFO.openingHours}</span>
            </span>
            <span className="hidden sm:inline text-amber-200/40">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F77F00]" />
              <span className="truncate">{RESTAURANT_INFO.address}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#FFE8D6] hover:text-[#F77F00] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#25D366]" />
              <span className="font-semibold">WhatsApp: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Rabbit Mascot Branding */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <RabbitAvatar size="sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#4A2810] group-hover:text-[#E85D04] transition-colors">
                  Sabor Tolimense
                </span>
                <span className="hidden sm:inline-block bg-[#E85D04]/10 text-[#E85D04] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#E85D04]/20">
                  Tolima
                </span>
              </div>
              <p className="text-[11px] text-[#78350F] font-medium tracking-wide hidden sm:block">
                “Welcome to the flavor of Tolima”
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#E85D04] text-white shadow-xs'
                      : 'text-[#4A2810] hover:bg-[#FBE8DC] hover:text-[#E85D04]'
                  }`}
                >
                  {item.label}
                  {item.id === 'promotions' && (
                    <span className="ml-1.5 inline-block bg-amber-200 text-[#4A2810] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                      15%
                    </span>
                  )}
                  {item.id === 'tasting' && (
                    <span className="ml-1 inline-block text-[10px] text-amber-500">
                      ★
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action buttons & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              id="nav-whatsapp-cta"
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border border-[#25D366]/40 text-[#128C7E] bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <button
              id="nav-cart-btn"
              onClick={openCart}
              aria-label="Ver carrito de pedidos"
              className="relative flex items-center gap-2 bg-[#E85D04] hover:bg-[#D9480F] text-white px-3.5 py-2.5 rounded-xl shadow-sm transition-all duration-200 hover:shadow active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-bold text-sm">My Order</span>
              {cartCount > 0 && (
                <span className="bg-white text-[#E85D04] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#4A2810] hover:bg-amber-100/50"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7EFE8] border-b border-[#DFCBB9] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100 pt-1">
            <div className="flex items-center gap-2">
              <RabbitAvatar size="xs" />
              <span className="text-xs font-bold text-[#4A2810]">
                Sabor Tolimense Digital Menu
              </span>
            </div>
            <span className="text-[11px] text-amber-800 font-medium">
              Horario: 7 AM - 3 PM
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-2.5 rounded-xl text-left text-sm font-semibold flex items-center justify-between ${
                    isActive
                      ? 'bg-[#E85D04] text-white'
                      : 'bg-amber-50/70 text-[#4A2810] hover:bg-amber-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'promotions' && (
                    <span className="bg-amber-200 text-[#4A2810] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      15%
                    </span>
                  )}
                  {item.id === 'tasting' && (
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 flex gap-2">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-50 text-[#128C7E] font-bold text-xs flex items-center justify-center gap-2 border border-[#25D366]/30"
            >
              <Phone className="w-4 h-4 text-[#25D366]" />
              WhatsApp {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
