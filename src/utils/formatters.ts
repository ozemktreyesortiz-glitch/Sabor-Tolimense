import { Order, CartItem } from '../types';

/**
 * Format numbers into Colombian Peso notation: e.g. $18.000 or $120.000
 * Never uses USD or decimals.
 */
export function formatCOP(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `$${formatted}`;
}

export const RESTAURANT_INFO = {
  name: 'Sabor Tolimense',
  tagline: '“Welcome to the flavor of Tolima.”',
  secondaryTagline: '“Authentic traditional food from the heart of Colombia.”',
  address: 'Picaleña Avenue, 145th Street, Colombia',
  addressDetail: 'Avenida Picaleña, Calle 145 (Ibagué, Tolima, Colombia)',
  phone: '3150487434',
  whatsappRaw: '573150487434',
  openingHours: '7:00 AM – 3:00 PM',
  currency: 'COP',
};

/**
 * Generates an official WhatsApp order message with full itemized details
 */
export function generateWhatsAppOrderUrl(order: Order): string {
  const lines: string[] = [];

  lines.push(`🇨🇴 *PEDIDO SABOR TOLIMENSE*`);
  lines.push(`*Orden:* ${order.orderNumber}`);
  lines.push(`*Cliente:* ${order.customer.name}`);
  lines.push(`*Teléfono:* ${order.customer.phone}`);
  lines.push(`*Modalidad:* ${
    order.orderType === 'dine-in'
      ? `🍽️ Consumo en Restaurante (Mesa: ${order.customer.tableNumber || 'Por asignar'})`
      : order.orderType === 'takeaway'
      ? '🛍️ Para Llevar (Recogida)'
      : `🛵 Domicilio (Dirección: ${order.customer.address || 'No especificada'})`
  }`);

  if (order.orderType === 'delivery' && order.customer.deliveryNotes) {
    lines.push(`*Instrucciones de Entrega:* ${order.customer.deliveryNotes}`);
  }

  lines.push('');
  lines.push('📋 *DETALLE DEL PEDIDO:*');

  order.items.forEach((item, index) => {
    const dishLabel = item.menuItem.spanishName
      ? `${item.menuItem.name} (${item.menuItem.spanishName})`
      : item.menuItem.name;
    lines.push(`${index + 1}. *${dishLabel}* x${item.quantity} — ${formatCOP(item.totalPrice)}`);
    if (item.customization) {
      const c = item.customization;
      if (c.selectedSize) lines.push(`   • Tamaño: ${c.selectedSize}`);
      if (c.cookingPreference) lines.push(`   • Cocción: ${c.cookingPreference}`);
      if (c.removedIngredients.length > 0) lines.push(`   • Sin: ${c.removedIngredients.join(', ')}`);
      if (c.selectedSauces.length > 0) lines.push(`   • Salsas: ${c.selectedSauces.map(s => s.name).join(', ')}`);
      if (c.selectedExtras.length > 0) lines.push(`   • Extras: ${c.selectedExtras.map(e => e.name).join(', ')}`);
      if (c.specialInstructions) lines.push(`   • Nota: "${c.specialInstructions}"`);
    }
  });

  lines.push('');
  lines.push(`*Subtotal:* ${formatCOP(order.subtotal)}`);
  if (order.appliedPromotion && order.discount > 0) {
    lines.push(`*Descuento (${order.appliedPromotion.title}):* -${formatCOP(order.discount)}`);
  }
  if (order.deliveryFee > 0) {
    lines.push(`*Costo de Domicilio:* +${formatCOP(order.deliveryFee)}`);
  }
  lines.push(`💰 *TOTAL A PAGAR:* ${formatCOP(order.finalTotal)}`);
  lines.push(`*Método de Pago:* ${order.paymentMethod}`);
  lines.push(`*Tiempo Estimado:* ${order.estimatedMinutes} minutos`);
  lines.push('');
  lines.push(`🐰 _¡Gracias por elegir Sabor Tolimense! "Bienvenidos al sabor del Tolima"_`);

  const fullText = lines.join('\n');
  return `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(fullText)}`;
}

/**
 * Direct inquiry link for general WhatsApp contact
 */
export function getGeneralWhatsAppUrl(): string {
  const msg = `¡Hola Sabor Tolimense! 🐰 Me gustaría consultar su menú del día y hacer una reserva.`;
  return `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
}
