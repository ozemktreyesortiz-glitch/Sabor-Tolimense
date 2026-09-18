import React from 'react';
import { CheckCircle2, Clock, Phone, ArrowRight, RotateCcw, MapPin, Utensils, ShoppingBag, Truck } from 'lucide-react';
import { Order } from '../types';
import { formatCOP, generateWhatsAppOrderUrl, RESTAURANT_INFO } from '../utils/formatters';
import { RabbitAvatar } from './RabbitAvatar';
import { RABBIT_MESSAGES } from '../data/menuData';

interface OrderConfirmationModalProps {
  order: Order | null;
  isOpen: boolean;
  onTrackOrder: () => void;
  onReturnToMenu: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onTrackOrder,
  onReturnToMenu,
}) => {
  if (!isOpen || !order) return null;

  const whatsappUrl = generateWhatsAppOrderUrl(order);

  const orderTypeLabels = {
    'dine-in': '🍽️ Consumo en Restaurante',
    'takeaway': '🛍️ Para Llevar (Takeaway)',
    'delivery': '🛵 Domicilio a Casa',
  }[order.orderType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#FAF4ED] rounded-3xl shadow-2xl border border-[#DFCBB9] overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Top celebratory banner */}
        <div className="bg-gradient-to-r from-[#E85D04] via-[#F77F00] to-[#D9480F] text-white p-6 sm:p-8 text-center relative shrink-0">
          <div className="flex justify-center mb-3">
            <RabbitAvatar size="lg" isCelebrating />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Sabor Tolimense</span>
          </div>

          <h2 className="font-serif-display text-2xl sm:text-3xl font-black">
            Order confirmed successfully!
          </h2>

          <p className="text-xs sm:text-sm text-amber-100 italic mt-1 max-w-md mx-auto">
            {RABBIT_MESSAGES.orderConfirmed}
          </p>

          {/* Highlights Card */}
          <div className="mt-4 grid grid-cols-2 gap-3 max-w-md mx-auto bg-black/15 backdrop-blur-xs rounded-2xl p-3 border border-white/20">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-200 block">
                Order Number
              </span>
              <span className="font-mono text-base sm:text-lg font-black text-white">
                {order.orderNumber}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-200 block">
                Estimated Time
              </span>
              <span className="text-base sm:text-lg font-black text-white flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>{order.estimatedMinutes} min</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Order Details */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 text-[#4A2810]">
          {/* Order Mode Details */}
          <div className="flex items-center justify-between p-3.5 bg-[#EFE4D8] rounded-2xl border border-[#DFCBB9] text-xs">
            <div>
              <span className="font-bold text-[#78350F] block">Modalidad de Entrega</span>
              <span className="font-bold text-sm text-[#4A2810]">{orderTypeLabels}</span>
              {order.orderType === 'dine-in' && order.customer.tableNumber && (
                <span className="text-amber-800 ml-1">(Mesa: {order.customer.tableNumber})</span>
              )}
              {order.orderType === 'delivery' && order.customer.address && (
                <p className="text-[11px] text-[#78350F] mt-0.5">
                  📍 {order.customer.address}
                </p>
              )}
            </div>
            <div className="text-right">
              <span className="font-bold text-[#78350F] block">Cliente</span>
              <span className="font-semibold text-[#4A2810]">{order.customer.name}</span>
              <span className="block text-[11px] text-[#78350F]">{order.customer.phone}</span>
            </div>
          </div>

          {/* Products Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Products in this order
            </h4>
            <div className="divide-y divide-[#DFCBB9]/50 border border-[#DFCBB9] rounded-2xl bg-white overflow-hidden">
              {order.items.map((item) => (
                <div key={item.cartItemId} className="p-3.5 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-[#4A2810] text-sm flex items-center gap-2">
                      <span>{item.menuItem.name}</span>
                      <span className="text-[#E85D04] font-extrabold text-xs">
                        x{item.quantity}
                      </span>
                    </div>
                    {item.menuItem.spanishName && (
                      <div className="text-[11px] text-[#B45309] italic">
                        {item.menuItem.spanishName}
                      </div>
                    )}

                    {item.customization && (
                      <div className="text-[11px] text-[#78350F] mt-1 space-y-0.5">
                        {item.customization.selectedSize && (
                          <div>• Tamaño: {item.customization.selectedSize}</div>
                        )}
                        {item.customization.cookingPreference && (
                          <div>• Cocción: {item.customization.cookingPreference}</div>
                        )}
                        {item.customization.removedIngredients.length > 0 && (
                          <div className="text-rose-700">
                            • Sin: {item.customization.removedIngredients.join(', ')}
                          </div>
                        )}
                        {item.customization.selectedSauces.length > 0 && (
                          <div>
                            • Salsas: {item.customization.selectedSauces.map((s) => s.name).join(', ')}
                          </div>
                        )}
                        {item.customization.selectedExtras.length > 0 && (
                          <div>
                            • Extras: {item.customization.selectedExtras.map((e) => e.name).join(', ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <span className="font-serif-display font-bold text-sm text-[#4A2810] shrink-0">
                    {formatCOP(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Breakdown */}
          <div className="p-4 rounded-2xl bg-[#EFE4D8] border border-[#DFCBB9] space-y-1.5 text-xs text-[#78350F]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#4A2810]">{formatCOP(order.subtotal)}</span>
            </div>

            {order.appliedPromotion && order.discount > 0 && (
              <div className="flex justify-between text-[#E85D04] font-bold">
                <span>{order.appliedPromotion.title} (15% OFF):</span>
                <span>-{formatCOP(order.discount)}</span>
              </div>
            )}

            {order.deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Costo Domicilio:</span>
                <span className="font-semibold text-[#4A2810]">{formatCOP(order.deliveryFee)}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-black text-[#4A2810] pt-2 border-t border-amber-200">
              <span>Final Total Paid / Due:</span>
              <span className="font-serif-display text-xl text-[#E85D04]">
                {formatCOP(order.finalTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 bg-white border-t border-amber-200 space-y-2.5 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              id="confirm-track-order-btn"
              onClick={onTrackOrder}
              className="w-full bg-[#E85D04] hover:bg-[#D9480F] text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all active:scale-95"
            >
              <Clock className="w-4 h-4" />
              <span>Track My Order</span>
            </button>

            <a
              id="confirm-whatsapp-order-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </a>
          </div>

          <button
            id="confirm-return-menu-btn"
            onClick={onReturnToMenu}
            className="w-full text-center text-xs font-bold text-[#78350F] hover:text-[#4A2810] py-2 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Return to Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
