import React from 'react';
import { X, CheckCircle2, Clock, ChefHat, PackageCheck, UtensilsCrossed, Phone, ArrowLeft } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { generateWhatsAppOrderUrl } from '../utils/formatters';
import { RabbitAvatar } from './RabbitAvatar';

interface OrderTrackingModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (newStatus: OrderStatus) => void;
  onReturnToMenu: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
  onReturnToMenu,
}) => {
  if (!isOpen || !order) return null;

  const steps: { id: OrderStatus; label: string; description: string; icon: React.FC<{ className?: string }> }[] = [
    {
      id: 'received',
      label: 'Order Received',
      description: 'Your order was received and queued in the kitchen.',
      icon: CheckCircle2,
    },
    {
      id: 'preparing',
      label: 'Preparing',
      description: 'Master cooks are plating your lechona and steaming your tamales.',
      icon: ChefHat,
    },
    {
      id: 'ready',
      label: 'Ready',
      description:
        order.orderType === 'delivery'
          ? 'Packaged in thermal containers for delivery dispatch.'
          : order.orderType === 'takeaway'
          ? 'Ready at counter for pickup.'
          : 'Ready to be served at your table.',
      icon: PackageCheck,
    },
    {
      id: 'completed',
      label: 'Completed',
      description: 'Delivered and enjoyed! ¡Buen provecho con el sabor del Tolima!',
      icon: UtensilsCrossed,
    },
  ];

  const statusOrder: OrderStatus[] = ['received', 'preparing', 'ready', 'completed'];
  const currentIndex = statusOrder.indexOf(order.status);

  const getStepProgressPercentage = () => {
    switch (order.status) {
      case 'received':
        return 20;
      case 'preparing':
        return 50;
      case 'ready':
        return 80;
      case 'completed':
        return 100;
      default:
        return 10;
    }
  };

  const whatsappUrl = generateWhatsAppOrderUrl(order);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FAF4ED] rounded-3xl shadow-2xl border border-[#DFCBB9] overflow-hidden my-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A2810] to-[#78350F] text-white p-5 pr-12 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Clock className="w-4 h-4" />
              <span>Live Order Tracking</span>
            </div>
            <h3 className="font-serif-display text-2xl font-bold">
              Order #{order.orderNumber}
            </h3>
          </div>

          <button
            id="close-tracking-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Cerrar seguimiento"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mascot status message */}
        <div className="p-5 border-b border-[#DFCBB9] bg-[#EFE4D8] flex items-center gap-4">
          <RabbitAvatar size="sm" isCelebrating={order.status === 'ready' || order.status === 'completed'} />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E85D04] block">
              Mascot Kitchen Update
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#4A2810]">
              {order.status === 'received' && '“We received your order and are firing up the firewood stoves!”'}
              {order.status === 'preparing' && '“Mmm, that lechona cuerona and tamal smell incredible right now!”'}
              {order.status === 'ready' && '“Your order is fresh, hot, and ready!”'}
              {order.status === 'completed' && '“¡Buen provecho! Thank you for enjoying Sabor Tolimense!”'}
            </p>
          </div>
        </div>

        {/* Tracking Steps Visual Display */}
        <div className="p-6 space-y-6 text-[#4A2810]">
          {/* Progress Bar Container */}
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-5 left-6 right-6 h-1 bg-[#DFCBB9] -z-0 rounded-full" />
            {/* Active Colored Fill */}
            <div
              className="absolute top-5 left-6 h-1 bg-[#E85D04] -z-0 rounded-full transition-all duration-500"
              style={{ width: `calc(${getStepProgressPercentage()}% - 3rem)` }}
            />

            {/* Steps Row */}
            <div className="relative z-10 flex justify-between">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = currentIndex >= idx;
                const isCurrent = currentIndex === idx;

                return (
                  <div key={step.id} className="flex flex-col items-center text-center max-w-[80px]">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCurrent
                          ? 'bg-[#E85D04] border-[#E85D04] text-white ring-4 ring-[#E85D04]/20 scale-110'
                          : isPassed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'bg-white border-amber-300 text-amber-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-2 leading-tight ${
                        isCurrent
                          ? 'text-[#E85D04] font-black'
                          : isPassed
                          ? 'text-[#4A2810]'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status Highlight Card */}
          <div className="p-4 rounded-2xl bg-[#EFE4D8] border border-[#DFCBB9] flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#78350F] block">
                Current Kitchen Status
              </span>
              <span className="font-serif-display text-lg font-bold text-[#4A2810]">
                {steps[currentIndex]?.label}
              </span>
              <p className="text-xs text-[#78350F] mt-0.5">
                {steps[currentIndex]?.description}
              </p>
            </div>

            <div className="text-right shrink-0 bg-white p-2.5 rounded-xl border border-[#DFCBB9]">
              <span className="text-[10px] uppercase font-bold text-[#78350F] block">
                Estimated Time
              </span>
              <span className="text-sm font-black text-[#E85D04]">
                {order.status === 'completed'
                  ? '0 min'
                  : order.status === 'ready'
                  ? '5 min'
                  : `${order.estimatedMinutes} min`}
              </span>
            </div>
          </div>

          {/* Kitchen Simulation Switch (Allows user/tester to advance through states) */}
          <div className="p-3.5 rounded-xl bg-[#EFE4D8]/60 border border-[#DFCBB9] text-xs text-[#78350F]">
            <span className="font-bold block mb-1 text-[#4A2810]">
              Simulation controls (Test all live tracking steps):
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {statusOrder.map((st) => (
                <button
                  key={st}
                  type="button"
                  id={`simulate-status-${st}`}
                  onClick={() => onUpdateStatus(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                    order.status === st
                      ? 'bg-[#E85D04] text-white border-[#E85D04]'
                      : 'bg-white text-[#4A2810] border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <a
              id="tracking-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Restaurant on WhatsApp</span>
            </a>

            <button
              id="tracking-return-menu-btn"
              onClick={() => {
                onClose();
                onReturnToMenu();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-amber-300 hover:bg-amber-50 text-[#4A2810] font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
