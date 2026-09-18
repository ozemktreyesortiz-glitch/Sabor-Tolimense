import React, { useState, useMemo } from 'react';
import { Search, Utensils, Coffee, Cake, Sparkles, X } from 'lucide-react';
import { MenuItem, ProductCategory } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { ProductCard } from './ProductCard';
import { RabbitAvatar } from './RabbitAvatar';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onOpenCustomize: (item: MenuItem) => void;
  onOpenNutrition: (item: MenuItem) => void;
  onScrollToTasting: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenCustomize,
  onOpenNutrition,
  onScrollToTasting,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Dishes', icon: Utensils },
    { id: 'main', label: 'Main Dishes', icon: Utensils },
    { id: 'beverage', label: 'Beverages', icon: Coffee },
    { id: 'dessert', label: 'Desserts', icon: Cake },
    { id: 'tasting-link', label: 'Food Tasting', icon: Sparkles },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Boolean(item.spanishName && item.spanishName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (catId: string) => {
    if (catId === 'tasting-link') {
      onScrollToTasting();
    } else {
      setSelectedCategory(catId);
    }
  };

  return (
    <section id="menu-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title and Mascot hint */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Carta Tradicional</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#4A2810]">
            Our Traditional Menu
          </h2>
          <p className="text-sm sm:text-base text-[#78350F] mt-1">
            Authentic Tolimense culinary heritage prepared fresh every morning.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-[#FAF4ED] px-4 py-2 rounded-2xl border border-[#DFCBB9]">
          <RabbitAvatar size="xs" />
          <span className="text-xs text-[#4A2810] font-medium">
            “Each dish can be customized to your taste!”
          </span>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4 mb-10">
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78350F]/50" />
          <input
            id="menu-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What would you like to eat today?"
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-[#DFCBB9] bg-[#FAF4ED] text-sm sm:text-base text-[#4A2810] placeholder:text-[#78350F]/50 focus:ring-2 focus:ring-[#E85D04] focus:border-[#E85D04] shadow-xs outline-hidden transition-all"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#78350F]/60 hover:text-[#4A2810]"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                id={`cat-filter-btn-${cat.id}`}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-150 ${
                  isSelected
                    ? 'bg-[#E85D04] text-white shadow-xs'
                    : 'bg-[#FAF4ED] border border-[#DFCBB9] text-[#4A2810] hover:bg-white hover:border-[#D4BBA5]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
                {cat.id === 'tasting-link' && (
                  <span className="text-[10px] bg-amber-200 text-[#4A2810] px-1.5 py-0.2 rounded-full font-black">
                    ★
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onAddToCart={onAddToCart}
              onOpenCustomize={onOpenCustomize}
              onOpenNutrition={onOpenNutrition}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FAF4ED] rounded-3xl border border-[#DFCBB9] max-w-md mx-auto p-8 shadow-xs">
          <RabbitAvatar size="lg" className="mx-auto mb-4" />
          <h3 className="font-serif-display text-xl font-bold text-[#4A2810] mb-2">
            No dishes found for "{searchQuery}"
          </h3>
          <p className="text-xs text-[#78350F] mb-6">
            Try searching for "Pork", "Lechona", "Tamale", "Fish", "Ajiaco", or explore all categories.
          </p>
          <button
            id="reset-search-btn"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#E85D04] text-white font-bold text-xs shadow-xs hover:bg-[#D9480F]"
          >
            Show All Dishes
          </button>
        </div>
      )}
    </section>
  );
};
