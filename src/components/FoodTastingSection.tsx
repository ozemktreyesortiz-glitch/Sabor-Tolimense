import React, { useState } from 'react';
import { Sparkles, Users, ShoppingBag, Check, Wine, Utensils } from 'lucide-react';
import { TastingOption, CartItem } from '../types';
import { TASTING_PACKAGES, RABBIT_MESSAGES } from '../data/menuData';
import { RabbitAvatar } from './RabbitAvatar';
import { formatCOP } from '../utils/formatters';

interface FoodTastingSectionProps {
  onAddTastingToCart: (
    tasting: TastingOption,
    peopleCount: number,
    selectedDrink: string,
    totalPrice: number
  ) => void;
}

export const FoodTastingSection: React.FC<FoodTastingSectionProps> = ({
  onAddTastingToCart,
}) => {
  const [selectedTastingId, setSelectedTastingId] = useState<string>(TASTING_PACKAGES[0].id);
  const [peopleCount, setPeopleCount] = useState<number>(2);
  const [selectedDrink, setSelectedDrink] = useState<string>('Chicha de Maíz tradicional');
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const activeTasting =
    TASTING_PACKAGES.find((t) => t.id === selectedTastingId) || TASTING_PACKAGES[0];

  // Calculate pricing with slight party discount on 4+ people
  const basePrice = activeTasting.basePricePerPerson * peopleCount;
  // If 4 or more people, 5% group loyalty perk included
  const calculatedTotal = peopleCount >= 4 ? Math.round(basePrice * 0.95) : basePrice;

  const handleAdd = () => {
    onAddTastingToCart(activeTasting, peopleCount, selectedDrink, calculatedTotal);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const drinkChoices = [
    'Chicha de Maíz tradicional (ancestral)',
    'Agua de Panela fría con limón mandarino',
    'Agua de Panela caliente con queso tolimense (+ $3.000)',
    'Sorbete natural de frutas tolimenses',
  ];

  return (
    <section id="tasting-section" className="py-14 bg-gradient-to-b from-[#F2E7DC] via-[#EBDDCE] to-[#F5EDE4] border-y border-[#DFCBB9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Special Banner Host: Rabbit Mascot */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#FAF4ED]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-[#DFCBB9] shadow-lg mb-10">
          <div className="flex items-center gap-4">
            <RabbitAvatar size="lg" isCelebrating />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Experiencia Exclusiva Sabor Tolimense</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-extrabold text-[#4A2810]">
                Tolima Food Tasting Experience
              </h2>
              <p className="text-sm sm:text-base text-[#E85D04] font-serif-display font-semibold italic">
                {RABBIT_MESSAGES.foodTasting}
              </p>
            </div>
          </div>

          <div className="text-center md:text-right shrink-0 bg-[#EFE4D8] px-5 py-3 rounded-2xl border border-[#DFCBB9]">
            <span className="text-xs uppercase font-bold text-[#78350F] block">
              Precio por persona
            </span>
            <span className="font-serif-display text-2xl font-black text-[#4A2810]">
              {formatCOP(activeTasting.basePricePerPerson)}
            </span>
            <span className="block text-[11px] text-amber-800">
              Incluye menú degustación completo
            </span>
          </div>
        </div>

        {/* Tasting Package Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {TASTING_PACKAGES.map((pkg) => {
            const isSelected = selectedTastingId === pkg.id;
            return (
              <button
                key={pkg.id}
                id={`tasting-pkg-btn-${pkg.id}`}
                onClick={() => setSelectedTastingId(pkg.id)}
                className={`p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                  isSelected
                    ? 'bg-white border-[#E85D04] shadow-md ring-2 ring-[#E85D04]/20'
                    : 'bg-[#FAF4ED]/80 border-[#DFCBB9] hover:bg-white hover:border-[#CDB39E]'
                }`}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-[#DFCBB9]">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif-display font-bold text-lg text-[#4A2810]">
                      {pkg.name}
                    </h3>
                    <span className="text-xs font-black text-[#E85D04] shrink-0">
                      {formatCOP(pkg.basePricePerPerson)} / pers.
                    </span>
                  </div>
                  <p className="text-xs text-[#78350F] mt-1 line-clamp-2">
                    {pkg.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tasting Showcase & Customizer Card */}
        <div className="bg-white rounded-3xl border border-[#DFCBB9] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Banquet Photograph & Highlights */}
            <div className="lg:col-span-5 relative min-h-[280px] bg-amber-950">
              <img
                src={activeTasting.image}
                alt={activeTasting.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block bg-[#E85D04] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                  Banquet Degustación
                </span>
                <h3 className="font-serif-display text-2xl font-bold">
                  {activeTasting.name}
                </h3>
                <p className="text-xs text-amber-100/90 mt-1">
                  Una selección magistral de los sabores más queridos del Tolima en un solo servicio.
                </p>
              </div>
            </div>

            {/* Right: Interactive Configuration Controls */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between text-[#4A2810]">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-2 flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-[#E85D04]" />
                    <span>Included in this experience:</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A2810]">
                    {activeTasting.includedDishes.map((dish, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 p-2 rounded-lg bg-[#FAF4ED] border border-[#DFCBB9]"
                      >
                        <span className="text-[#E85D04] font-bold">✔</span>
                        <span>{dish}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Number of People Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#78350F] flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#E85D04]" />
                      <span>Number of People:</span>
                    </label>
                    <span className="text-xs text-amber-900 font-bold">
                      {peopleCount} {peopleCount === 1 ? 'Persona' : 'Personas'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 4, 6].map((count) => {
                      const isSelected = peopleCount === count;
                      return (
                        <button
                          key={count}
                          id={`tasting-people-btn-${count}`}
                          type="button"
                          onClick={() => setPeopleCount(count)}
                          className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition-all ${
                            isSelected
                              ? 'bg-[#E85D04] border-[#E85D04] text-white shadow-xs'
                              : 'bg-[#FAF4ED] border-[#DFCBB9] text-[#4A2810] hover:bg-white'
                          }`}
                        >
                          {count} {count === 1 ? 'Persona' : 'Personas'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Traditional Beverage Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F] mb-2 flex items-center gap-1.5">
                    <Wine className="w-4 h-4 text-[#E85D04]" />
                    <span>Select Traditional Drink Pairing:</span>
                  </label>
                  <select
                    id="tasting-drink-select"
                    value={selectedDrink}
                    onChange={(e) => setSelectedDrink(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-[#DFCBB9] bg-[#FAF4ED] font-medium focus:ring-2 focus:ring-[#E85D04] outline-hidden"
                  >
                    {drinkChoices.map((drink) => (
                      <option key={drink} value={drink}>
                        {drink}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Total & Add Button */}
              <div className="pt-4 border-t border-[#DFCBB9] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#78350F] block">
                    Total Tasting Experience
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif-display text-3xl font-black text-[#4A2810]">
                      {formatCOP(calculatedTotal)}
                    </span>
                    <span className="text-xs text-[#78350F]">
                      COP ({peopleCount} comensales)
                    </span>
                  </div>
                </div>

                <button
                  id="add-tasting-experience-btn"
                  onClick={handleAdd}
                  className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#E85D04] hover:bg-[#D9480F] text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Experience Added to Order!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Tasting Experience to Order</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
