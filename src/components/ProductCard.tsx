import React, { useState } from 'react';
import { Plus, Minus, SlidersHorizontal, Info, ShoppingBag, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { formatCOP } from '../utils/formatters';

interface ProductCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onOpenCustomize: (item: MenuItem) => void;
  onOpenNutrition: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onAddToCart,
  onOpenCustomize,
  onOpenNutrition,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    onAddToCart(item, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
    setQuantity(1);
  };

  const hasCustomization = Boolean(
    item.customizationConfig &&
      ((item.customizationConfig.sizes && item.customizationConfig.sizes.length > 0) ||
        (item.customizationConfig.removableIngredients &&
          item.customizationConfig.removableIngredients.length > 0) ||
        (item.customizationConfig.sauces && item.customizationConfig.sauces.length > 0) ||
        (item.customizationConfig.extraIngredients &&
          item.customizationConfig.extraIngredients.length > 0) ||
        (item.customizationConfig.cookingPreferences &&
          item.customizationConfig.cookingPreferences.length > 0))
  );

  return (
    <div
      id={`product-card-${item.id}`}
      className="group bg-white rounded-2xl border border-[#DFCBB9] overflow-hidden shadow-xs hover:shadow-md hover:border-[#CDB39E] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Professional food photo container */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-amber-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Optional Category / Special badge */}
          {item.badge && (
            <div className="absolute top-3 left-3 bg-[#4A2810]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs border border-white/20">
              {item.badge}
            </div>
          )}

          {/* Quick Nutritional Info Button in Corner */}
          {item.nutritionalInfo && (
            <button
              id={`nutrition-btn-${item.id}`}
              onClick={() => onOpenNutrition(item)}
              title="Ver información nutricional"
              aria-label={`Ver información nutricional de ${item.name}`}
              className="absolute top-3 right-3 bg-white/90 hover:bg-white text-[#4A2810] hover:text-[#E85D04] p-1.5 rounded-full shadow-md transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>
          )}

          {/* Price Tag pill */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full shadow-md border border-amber-200/80">
            <span className="font-serif-display font-extrabold text-sm sm:text-base text-[#4A2810]">
              {formatCOP(item.price)}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 sm:p-5">
          <div className="mb-1.5">
            <h3 className="font-serif-display font-bold text-lg sm:text-xl text-[#4A2810] group-hover:text-[#E85D04] transition-colors leading-snug">
              {item.name}
            </h3>
            {item.spanishName && (
              <p className="text-xs font-semibold text-[#B45309] flex items-center gap-1 mt-0.5">
                <span className="opacity-70 font-normal">Tradicional:</span> {item.spanishName}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#78350F]/85 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3">
            {item.description}
          </p>

          {/* Micro nutrition pill link */}
          {item.nutritionalInfo && (
            <button
              onClick={() => onOpenNutrition(item)}
              className="inline-flex items-center gap-1 text-[11px] text-[#E85D04] hover:text-[#D9480F] font-semibold mb-3 hover:underline cursor-pointer"
            >
              <Info className="w-3 h-3" />
              <span>Nutritional Information ({item.nutritionalInfo.calories} kcal)</span>
            </button>
          )}
        </div>
      </div>

      {/* Card Action Controls */}
      <div className="p-4 sm:p-5 pt-0 border-t border-[#DFCBB9]/50 space-y-2.5">
        {/* Quantity selector & Add to order */}
        <div className="flex items-center gap-2">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[#DFCBB9] rounded-xl bg-[#FAF4ED] p-1 shrink-0">
            <button
              id={`qty-minus-${item.id}`}
              onClick={handleDecrease}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-[#4A2810] hover:bg-white disabled:opacity-30 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center font-bold text-xs sm:text-sm text-[#4A2810]">
              {quantity}
            </span>
            <button
              id={`qty-plus-${item.id}`}
              onClick={handleIncrease}
              aria-label="Aumentar cantidad"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-[#4A2810] hover:bg-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            id={`add-to-order-btn-${item.id}`}
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-xs active:scale-95 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#E85D04] hover:bg-[#D9480F] text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order</span>
              </>
            )}
          </button>
        </div>

        {/* Customize button (shown when product has customizable extras/sizes) */}
        {hasCustomization && (
          <button
            id={`customize-btn-${item.id}`}
            onClick={() => onOpenCustomize(item)}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#DFCBB9] hover:border-[#E85D04] bg-[#FAF4ED] hover:bg-white text-[#4A2810] hover:text-[#E85D04] text-xs font-semibold transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize meal (ingredients, extras & sauces)</span>
          </button>
        )}
      </div>
    </div>
  );
};
