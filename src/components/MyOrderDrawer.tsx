import React from 'react';
import { X, Plus, Minus, Trash2, Edit3, ShoppingBag, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { CartItem, Promotion } from '../types';
import { formatCOP } from '../utils/formatters';
import { PROMOTIONS, RABBIT_MESSAGES } from '../data/menuData';
import { RabbitAvatar } from './RabbitAvatar';

interface MyOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onEditItem: (item: CartItem) => void;
  appliedPromotion: Promotion | null;
  onSelectPromotion: (promo: Promotion | null) => void;
  onProceedToCheckout: () => void;
  onReturnToMenu: () => void;
}

export const MyOrderDrawer: React.FC<MyOrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onEditItem,
  appliedPromotion,
  onSelectPromotion,
  onProceedToCheckout,
  onReturnToMenu,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = appliedPromotion ? Math.round(subtotal * (appliedPromotion.discountPercentage / 100)) : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF4ED] shadow-2xl border-l border-[#DFCBB9] flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-[#4A2810] to-[#78350F] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <div>
                <h2 className="font-serif-display text-xl font-bold">My Order</h2>
                <span className="text-xs text-amber-200">
                  {items.length} {items.length === 1 ? 'producto' : 'productos'} seleccionados
                </span>
              </div>
            </div>

            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10"
              aria-label="Cerrar pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List or Empty State */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <RabbitAvatar size="xl" />
                <div className="space-y-1">
                  <h3 className="font-serif-display text-xl font-bold text-[#4A2810]">
                    Your cart is empty
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78350F] italic max-w-xs">
                    {RABBIT_MESSAGES.emptyCart}
                  </p>
                </div>
                <button
                  id="empty-cart-return-menu-btn"
                  onClick={() => {
                    onClose();
                    onReturnToMenu();
                  }}
                  className="mt-2 bg-[#E85D04] hover:bg-[#D9480F] text-white font-bold text-xs py-3 px-6 rounded-xl shadow-xs transition-colors"
                >
                  Explore Traditional Menu
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.cartItemId}
                      id={`cart-item-${item.cartItemId}`}
                      className="p-3.5 rounded-2xl bg-white border border-[#DFCBB9] shadow-xs flex flex-col gap-2.5 text-[#4A2810]"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-16 h-16 rounded-xl object-cover border border-[#DFCBB9] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <h4 className="font-serif-display font-bold text-sm text-[#4A2810] truncate">
                                {item.menuItem.name}
                              </h4>
                              {item.menuItem.spanishName && (
                                <p className="text-[10px] text-[#B45309] truncate">
                                  {item.menuItem.spanishName}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.cartItemId)}
                              className="text-gray-400 hover:text-rose-600 p-1"
                              title="Eliminar producto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-baseline justify-between mt-1">
                            <span className="text-xs text-[#78350F]">
                              {formatCOP(item.unitPrice)} c/u
                            </span>
                            <span className="font-serif-display font-black text-sm text-[#E85D04]">
                              {formatCOP(item.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Customization specifications breakdown */}
                      {item.customization && (
                        <div className="text-[11px] bg-[#F5EDE4] p-2.5 rounded-xl space-y-1 text-[#78350F] border border-[#DFCBB9]">
                          {item.customization.selectedSize && (
                            <div>
                              <strong>Tamaño:</strong> {item.customization.selectedSize}
                            </div>
                          )}
                          {item.customization.cookingPreference && (
                            <div>
                              <strong>Cocción:</strong> {item.customization.cookingPreference}
                            </div>
                          )}
                          {item.customization.removedIngredients.length > 0 && (
                            <div className="text-rose-700">
                              <strong>Sin:</strong> {item.customization.removedIngredients.join(', ')}
                            </div>
                          )}
                          {item.customization.selectedSauces.length > 0 && (
                            <div>
                              <strong>Salsas:</strong>{' '}
                              {item.customization.selectedSauces.map((s) => s.name).join(', ')}
                            </div>
                          )}
                          {item.customization.selectedExtras.length > 0 && (
                            <div>
                              <strong>Extras:</strong>{' '}
                              {item.customization.selectedExtras.map((e) => e.name).join(', ')}
                            </div>
                          )}
                          {item.customization.specialInstructions && (
                            <div className="italic text-[#4A2810]">
                              "{item.customization.specialInstructions}"
                            </div>
                          )}
                        </div>
                      )}

                      {/* Item Bottom: Edit and Quantity controls */}
                      <div className="flex items-center justify-between pt-1 border-t border-amber-100">
                        <button
                          onClick={() => onEditItem(item)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E85D04] hover:underline"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit customization</span>
                        </button>

                        <div className="flex items-center border border-amber-200 rounded-lg bg-amber-50/50 p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#4A2810] hover:bg-white rounded"
                            aria-label="Disminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-bold text-xs text-[#4A2810]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#4A2810] hover:bg-white rounded"
                            aria-label="Aumentar"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Available Promotions Selector */}
                <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#78350F] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#E85D04]" />
                      <span>Special Promotions (15% OFF)</span>
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {PROMOTIONS.map((promo) => {
                      const isApplied = appliedPromotion?.id === promo.id;
                      return (
                        <button
                          key={promo.id}
                          id={`drawer-promo-btn-${promo.id}`}
                          onClick={() =>
                            isApplied ? onSelectPromotion(null) : onSelectPromotion(promo)
                          }
                          className={`w-full p-2 rounded-xl text-left text-xs flex items-center justify-between border transition-all ${
                            isApplied
                              ? 'bg-white border-[#E85D04] text-[#E85D04] font-bold shadow-2xs'
                              : 'bg-white/60 border-amber-200 text-[#4A2810] hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E85D04]"></span>
                            <span>{promo.title}</span>
                          </div>
                          <span className="font-black">
                            {isApplied ? '✓ 15% Aplicado' : 'Aplicar'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer with Calculations & Checkout Button */}
          {items.length > 0 && (
            <div className="p-5 bg-[#EFE4D8] border-t border-[#DFCBB9] shrink-0 space-y-3">
              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-[#78350F]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#4A2810]">{formatCOP(subtotal)}</span>
                </div>

                {appliedPromotion && discount > 0 && (
                  <div className="flex justify-between text-[#E85D04] font-bold">
                    <span>{appliedPromotion.title} (-15%):</span>
                    <span>-{formatCOP(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-[#4A2810] pt-2 border-t border-[#DFCBB9]">
                  <span>Final Total:</span>
                  <span className="font-serif-display text-xl text-[#E85D04]">
                    {formatCOP(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  id="drawer-proceed-checkout-btn"
                  onClick={onProceedToCheckout}
                  className="w-full bg-[#E85D04] hover:bg-[#D9480F] text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="drawer-return-menu-btn"
                  onClick={() => {
                    onClose();
                    onReturnToMenu();
                  }}
                  className="w-full text-center text-xs font-semibold text-[#78350F] hover:text-[#4A2810] py-1"
                >
                  Return to Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
