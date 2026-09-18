import React, { useState } from 'react';
import { X, Utensils, ShoppingBag, Truck, Tag, CreditCard, Banknote, Phone, MapPin, User, Check } from 'lucide-react';
import { CartItem, OrderType, CustomerDetails, Promotion } from '../types';
import { formatCOP } from '../utils/formatters';
import { PROMOTIONS } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromotion: Promotion | null;
  onSelectPromotion: (promo: Promotion | null) => void;
  onConfirmOrder: (
    orderType: OrderType,
    customer: CustomerDetails,
    paymentMethod: string,
    subtotal: number,
    discount: number,
    deliveryFee: number,
    finalTotal: number
  ) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromotion,
  onSelectPromotion,
  onConfirmOrder,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('3150487434');
  const [tableNumber, setTableNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [pickupTime, setPickupTime] = useState('12:30 PM');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo al recibir');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = appliedPromotion
    ? Math.round(subtotal * (appliedPromotion.discountPercentage / 100))
    : 0;
  const deliveryFee = orderType === 'delivery' ? 4000 : 0;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!customerName.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre';
    }
    if (!customerPhone.trim() || customerPhone.length < 7) {
      newErrors.phone = 'Por favor ingresa un número de WhatsApp o teléfono válido';
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      newErrors.address = 'Por favor ingresa la dirección completa de entrega en Ibagué';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const customerData: CustomerDetails = {
      name: customerName.trim(),
      phone: customerPhone.trim(),
      address: orderType === 'delivery' ? deliveryAddress.trim() : undefined,
      deliveryNotes: orderType === 'delivery' ? deliveryNotes.trim() : undefined,
      tableNumber: orderType === 'dine-in' ? tableNumber.trim() : undefined,
      pickupTime: orderType === 'takeaway' ? pickupTime : undefined,
    };

    onConfirmOrder(
      orderType,
      customerData,
      paymentMethod,
      subtotal,
      discount,
      deliveryFee,
      finalTotal
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF4ED] rounded-3xl shadow-2xl border border-[#DFCBB9] overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#4A2810] to-[#78350F] text-white flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif-display text-2xl font-bold">Checkout & Confirm</h2>
            <p className="text-xs text-amber-200">
              Sabor Tolimense • Picaleña Avenue, 145th Street
            </p>
          </div>
          <button
            id="close-checkout-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Cerrar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-6 text-[#4A2810]">
          {/* Step 1: Order Type Selector */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
              1. Choose Order Type
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                type="button"
                id="order-type-dine-in-btn"
                onClick={() => setOrderType('dine-in')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  orderType === 'dine-in'
                    ? 'border-[#E85D04] bg-[#FBE8DC] text-[#E85D04] font-bold shadow-xs'
                    : 'border-amber-200 bg-white hover:bg-amber-50 text-[#4A2810]'
                }`}
              >
                <Utensils className="w-5 h-5" />
                <span className="text-xs font-bold">Dine-in</span>
                <span className="text-[10px] text-[#78350F]/70">En restaurante</span>
              </button>

              <button
                type="button"
                id="order-type-takeaway-btn"
                onClick={() => setOrderType('takeaway')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  orderType === 'takeaway'
                    ? 'border-[#E85D04] bg-[#FBE8DC] text-[#E85D04] font-bold shadow-xs'
                    : 'border-amber-200 bg-white hover:bg-amber-50 text-[#4A2810]'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-xs font-bold">Takeaway</span>
                <span className="text-[10px] text-[#78350F]/70">Para llevar</span>
              </button>

              <button
                type="button"
                id="order-type-delivery-btn"
                onClick={() => setOrderType('delivery')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  orderType === 'delivery'
                    ? 'border-[#E85D04] bg-[#FBE8DC] text-[#E85D04] font-bold shadow-xs'
                    : 'border-amber-200 bg-white hover:bg-amber-50 text-[#4A2810]'
                }`}
              >
                <Truck className="w-5 h-5" />
                <span className="text-xs font-bold">Delivery</span>
                <span className="text-[10px] text-[#78350F]/70">Domicilio (+4k)</span>
              </button>
            </div>
          </div>

          {/* Step 2: Customer Contact & Location Information */}
          <div className="space-y-3.5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
              2. Customer Information
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#78350F] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-700/60 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="checkout-name-input"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej: Carlos Gómez"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm text-[#4A2810] focus:ring-2 focus:ring-[#E85D04] outline-hidden"
                  />
                </div>
                {errors.name && (
                  <span className="text-[11px] text-rose-600 font-semibold">{errors.name}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#78350F] mb-1">
                  Phone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amber-700/60 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="checkout-phone-input"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="3150487434"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm text-[#4A2810] focus:ring-2 focus:ring-[#E85D04] outline-hidden"
                  />
                </div>
                {errors.phone && (
                  <span className="text-[11px] text-rose-600 font-semibold">{errors.phone}</span>
                )}
              </div>
            </div>

            {/* Conditional Fields based on Order Type */}
            {orderType === 'dine-in' && (
              <div>
                <label className="block text-xs font-semibold text-[#78350F] mb-1">
                  Table Number (Optional)
                </label>
                <input
                  id="checkout-table-input"
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Ej: Mesa 4 (o asignada al llegar)"
                  className="w-full px-3 py-2.5 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm text-[#4A2810] focus:ring-2 focus:ring-[#E85D04] outline-hidden"
                />
              </div>
            )}

            {orderType === 'takeaway' && (
              <div>
                <label className="block text-xs font-semibold text-[#78350F] mb-1">
                  Estimated Pickup Time
                </label>
                <input
                  id="checkout-pickup-time-input"
                  type="text"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  placeholder="Ej: 12:45 PM (Entre 7:00 AM y 3:00 PM)"
                  className="w-full px-3 py-2.5 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm text-[#4A2810] focus:ring-2 focus:ring-[#E85D04] outline-hidden"
                />
              </div>
            )}

            {orderType === 'delivery' && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#78350F] mb-1">
                    Delivery Address in Colombia *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-amber-700/60 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="checkout-address-input"
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Ej: Carrera 5 # 38-20, Conjunto Los Ocobos Torre 2 Apto 401"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm text-[#4A2810] focus:ring-2 focus:ring-[#E85D04] outline-hidden"
                    />
                  </div>
                  {errors.address && (
                    <span className="text-[11px] text-rose-600 font-semibold">{errors.address}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#78350F] mb-1">
                    Additional Delivery Instructions (Optional)
                  </label>
                  <textarea
                    id="checkout-delivery-notes-input"
                    rows={2}
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Ej: Timbre 401, dejar en portería si es necesario..."
                    className="w-full p-2.5 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm text-[#4A2810] focus:ring-2 focus:ring-[#E85D04] outline-hidden resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Available Promotion Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F] flex items-center justify-between">
              <span>3. Apply Special Promotion</span>
              {appliedPromotion && (
                <span className="text-[#E85D04] font-black lowercase text-[11px]">
                  15% off activo
                </span>
              )}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PROMOTIONS.map((promo) => {
                const isSelected = appliedPromotion?.id === promo.id;
                return (
                  <button
                    key={promo.id}
                    type="button"
                    onClick={() =>
                      isSelected ? onSelectPromotion(null) : onSelectPromotion(promo)
                    }
                    className={`p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#E85D04] bg-[#FBE8DC] text-[#E85D04] font-bold shadow-xs'
                        : 'border-amber-200 bg-white text-[#4A2810] hover:bg-amber-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{promo.title}</span>
                    </div>
                    <span>{isSelected ? '✓ 15% OFF' : '15% OFF'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Payment Method */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
              4. Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'Efectivo al recibir', icon: Banknote },
                { name: 'Nequi / Daviplata', icon: Phone },
                { name: 'Datáfono (Tarjeta)', icon: CreditCard },
              ].map((method) => {
                const isSelected = paymentMethod === method.name;
                const Icon = method.icon;
                return (
                  <button
                    key={method.name}
                    type="button"
                    onClick={() => setPaymentMethod(method.name)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-[#E85D04] bg-[#FBE8DC]/80 text-[#E85D04] shadow-xs font-bold'
                        : 'border-amber-200 bg-white text-[#4A2810] hover:bg-amber-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="truncate">{method.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Summary & Automatic Calculations Box */}
          <div className="p-4 rounded-2xl bg-[#EFE4D8] border border-[#DFCBB9] space-y-2 text-xs text-[#78350F]">
            <h4 className="font-serif-display text-sm font-bold text-[#4A2810] uppercase tracking-wider border-b border-[#DFCBB9] pb-1">
              Order Summary
            </h4>

            <div className="flex justify-between">
              <span>Subtotal ({items.length} items):</span>
              <span className="font-semibold text-[#4A2810]">{formatCOP(subtotal)}</span>
            </div>

            {appliedPromotion && discount > 0 && (
              <div className="flex justify-between text-[#E85D04] font-bold">
                <span>{appliedPromotion.title} (15% OFF):</span>
                <span>-{formatCOP(discount)}</span>
              </div>
            )}

            {orderType === 'delivery' && (
              <div className="flex justify-between">
                <span>Domicilio (Tarifa local Ibagué):</span>
                <span className="font-semibold text-[#4A2810]">+{formatCOP(deliveryFee)}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-black text-[#4A2810] pt-2 border-t border-[#DFCBB9]">
              <span>Final Total:</span>
              <span className="font-serif-display text-xl text-[#E85D04]">
                {formatCOP(finalTotal)}
              </span>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3.5 rounded-xl border border-[#4A2810]/30 hover:bg-white text-[#4A2810] font-bold text-sm"
            >
              Back
            </button>
            <button
              id="confirm-order-submit-btn"
              type="submit"
              className="flex-1 bg-[#E85D04] hover:bg-[#D9480F] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Order • {formatCOP(finalTotal)}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
