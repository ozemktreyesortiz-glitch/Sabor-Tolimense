import React, { useState, useMemo } from 'react';
import { X, Plus, Minus, Check, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { MenuItem, CustomizationAddon, SelectedCustomization } from '../types';
import { formatCOP } from '../utils/formatters';

interface ProductCustomizationModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmCustomization: (
    item: MenuItem,
    quantity: number,
    customization: SelectedCustomization,
    finalUnitPrice: number
  ) => void;
  initialCustomization?: SelectedCustomization;
  initialQuantity?: number;
}

export const ProductCustomizationModal: React.FC<ProductCustomizationModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirmCustomization,
  initialCustomization,
  initialQuantity = 1,
}) => {
  if (!isOpen || !item) return null;

  const config = item.customizationConfig;

  // Local states
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedSize, setSelectedSize] = useState<string>(
    initialCustomization?.selectedSize || (config?.sizes?.[0]?.name || '')
  );
  const [removedIngredients, setRemovedIngredients] = useState<string[]>(
    initialCustomization?.removedIngredients || []
  );
  const [selectedSauces, setSelectedSauces] = useState<CustomizationAddon[]>(
    initialCustomization?.selectedSauces || []
  );
  const [selectedExtras, setSelectedExtras] = useState<CustomizationAddon[]>(
    initialCustomization?.selectedExtras || []
  );
  const [cookingPreference, setCookingPreference] = useState<string>(
    initialCustomization?.cookingPreference || (config?.cookingPreferences?.[0] || '')
  );
  const [specialInstructions, setSpecialInstructions] = useState<string>(
    initialCustomization?.specialInstructions || ''
  );

  // Dynamic price calculation
  const { unitPrice, extraCost, totalPrice } = useMemo(() => {
    let base = item.price;

    // Apply size multiplier if present
    if (config?.sizes && selectedSize) {
      const sizeObj = config.sizes.find((s) => s.name === selectedSize);
      if (sizeObj) {
        base = Math.round(item.price * sizeObj.priceMultiplier);
      }
    }

    // Sum sauces
    const saucesTotal = selectedSauces.reduce((acc, sauce) => acc + sauce.price, 0);

    // Sum extras
    const extrasTotal = selectedExtras.reduce((acc, extra) => acc + extra.price, 0);

    const calculatedExtraCost = saucesTotal + extrasTotal;
    const finalUnit = base + calculatedExtraCost;
    const total = finalUnit * quantity;

    return {
      unitPrice: finalUnit,
      extraCost: calculatedExtraCost,
      totalPrice: total,
    };
  }, [item, config, selectedSize, selectedSauces, selectedExtras, quantity]);

  const handleToggleRemoveIngredient = (ingredient: string) => {
    if (removedIngredients.includes(ingredient)) {
      setRemovedIngredients(removedIngredients.filter((i) => i !== ingredient));
    } else {
      setRemovedIngredients([...removedIngredients, ingredient]);
    }
  };

  const handleToggleSauce = (sauce: CustomizationAddon) => {
    if (selectedSauces.some((s) => s.id === sauce.id)) {
      setSelectedSauces(selectedSauces.filter((s) => s.id !== sauce.id));
    } else {
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  const handleToggleExtra = (extra: CustomizationAddon) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customizationData: SelectedCustomization = {
      selectedSize: selectedSize || undefined,
      removedIngredients,
      selectedSauces,
      selectedExtras,
      cookingPreference: cookingPreference || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      extraCost,
    };

    onConfirmCustomization(item, quantity, customizationData, unitPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF4ED] rounded-3xl shadow-2xl border border-[#DFCBB9] overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#4A2810] to-[#78350F] text-white p-5 pr-14 shrink-0">
          <button
            id="close-customize-modal-btn"
            onClick={onClose}
            aria-label="Cerrar personalización"
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize your Tolimense meal</span>
          </div>

          <h2 className="font-serif-display text-2xl font-bold">{item.name}</h2>
          {item.spanishName && (
            <p className="text-xs font-medium text-amber-200/90 italic">
              Tradicional: {item.spanishName}
            </p>
          )}
          <p className="text-xs sm:text-sm text-amber-100/90 line-clamp-1 mt-0.5">
            Base: {formatCOP(item.price)} • Adjust ingredients, sauces and artisan extras
          </p>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-[#4A2810]">
          {/* Size selection if present */}
          {config?.sizes && config.sizes.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-wide text-[#78350F]">
                1. Select Portion Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {config.sizes.map((size) => {
                  const isSelected = selectedSize === size.name;
                  const calculatedPrice = Math.round(item.price * size.priceMultiplier);
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSize(size.name)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'border-[#E85D04] bg-[#FBE8DC]/60 ring-2 ring-[#E85D04]/30'
                          : 'border-amber-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-sm text-[#4A2810]">{size.name}</span>
                        <span className="font-serif-display font-extrabold text-xs text-[#E85D04]">
                          {formatCOP(calculatedPrice)}
                        </span>
                      </div>
                      {size.description && (
                        <span className="text-[11px] text-[#78350F]/80 mt-1">
                          {size.description}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cooking preference if present */}
          {config?.cookingPreferences && config.cookingPreferences.length > 0 && (
            <div className="space-y-2.5">
              <label className="block text-sm font-bold uppercase tracking-wide text-[#78350F]">
                2. Cooking & Meat Style
              </label>
              <div className="space-y-2">
                {config.cookingPreferences.map((pref) => {
                  const isSelected = cookingPreference === pref;
                  return (
                    <label
                      key={pref}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#E85D04] bg-[#FBE8DC]/40'
                          : 'border-amber-200/80 bg-white hover:bg-amber-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="cookingPref"
                        checked={isSelected}
                        onChange={() => setCookingPreference(pref)}
                        className="text-[#E85D04] focus:ring-[#E85D04]"
                      />
                      <span className="text-xs sm:text-sm font-medium text-[#4A2810]">{pref}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Removable Ingredients */}
          {config?.removableIngredients && config.removableIngredients.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-bold uppercase tracking-wide text-[#78350F]">
                  3. Remove Ingredients (No charge)
                </label>
                <span className="text-[11px] text-amber-700">Check to omit</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {config.removableIngredients.map((ing) => {
                  const isRemoved = removedIngredients.includes(ing);
                  return (
                    <button
                      key={ing}
                      type="button"
                      onClick={() => handleToggleRemoveIngredient(ing)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                        isRemoved
                          ? 'bg-rose-50 border-rose-300 text-rose-800'
                          : 'bg-white border-amber-200 text-[#4A2810] hover:bg-amber-50/60'
                      }`}
                    >
                      <span>{isRemoved ? `Omitir ${ing}` : `Incluir ${ing}`}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          isRemoved ? 'bg-rose-200 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isRemoved ? 'Omitido' : 'Incluido'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sauces */}
          {config?.sauces && config.sauces.length > 0 && (
            <div className="space-y-2.5">
              <label className="block text-sm font-bold uppercase tracking-wide text-[#78350F]">
                4. Artisanal Sauces & Ajíes
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {config.sauces.map((sauce) => {
                  const isSelected = selectedSauces.some((s) => s.id === sauce.id);
                  return (
                    <button
                      key={sauce.id}
                      type="button"
                      onClick={() => handleToggleSauce(sauce)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-[#E85D04] bg-[#FBE8DC]/60'
                          : 'border-amber-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#4A2810]">
                          {sauce.name}
                        </div>
                        <div className="text-xs font-extrabold text-[#E85D04]">
                          {sauce.price > 0 ? `+${formatCOP(sauce.price)}` : 'Gratis'}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-[#E85D04] border-[#E85D04] text-white'
                            : 'border-amber-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extras / Toppings */}
          {config?.extraIngredients && config.extraIngredients.length > 0 && (
            <div className="space-y-2.5">
              <label className="block text-sm font-bold uppercase tracking-wide text-[#78350F]">
                5. Traditional Extras & Add-ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {config.extraIngredients.map((extra) => {
                  const isSelected = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => handleToggleExtra(extra)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-[#E85D04] bg-[#FBE8DC]/60'
                          : 'border-amber-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#4A2810]">
                          {extra.name}
                        </div>
                        <div className="text-xs font-extrabold text-[#E85D04]">
                          +{formatCOP(extra.price)}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-[#E85D04] border-[#E85D04] text-white'
                            : 'border-amber-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special instructions */}
          <div className="space-y-2">
            <label className="block text-sm font-bold uppercase tracking-wide text-[#78350F]">
              6. Special Kitchen Instructions
            </label>
            <textarea
              id="customize-instructions-input"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Ej: Ají en recipiente aparte, cuerona bien tostada, servir muy caliente..."
              rows={2}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-amber-200 bg-white focus:ring-2 focus:ring-[#E85D04] focus:border-[#E85D04] outline-hidden resize-none"
            />
          </div>
        </div>

        {/* Footer with Real-time automatic price calculation */}
        <div className="p-4 sm:p-5 bg-[#EFE4D8] border-t border-[#DFCBB9] shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#78350F]">
                Automated Price Breakdown
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif-display text-2xl font-black text-[#4A2810]">
                  {formatCOP(totalPrice)}
                </span>
                <span className="text-xs text-[#78350F]">
                  ({formatCOP(unitPrice)} c/u {extraCost > 0 ? `• Extras +${formatCOP(extraCost)}` : ''})
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2 bg-[#FAF4ED] border border-[#DFCBB9] p-1.5 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-[#78350F] pl-2">Cantidad:</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-100 hover:bg-amber-200 text-[#4A2810]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-[#4A2810]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-amber-100 hover:bg-amber-200 text-[#4A2810]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-[#4A2810]/30 hover:bg-white text-[#4A2810] font-bold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              id="confirm-customization-btn"
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-[#E85D04] hover:bg-[#D9480F] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order • {formatCOP(totalPrice)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
