import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { MenuSection } from './components/MenuSection';
import { FoodTastingSection } from './components/FoodTastingSection';
import { PromotionsSection } from './components/PromotionsSection';
import { MyOrderDrawer } from './components/MyOrderDrawer';
import { ProductCustomizationModal } from './components/ProductCustomizationModal';
import { NutritionModal } from './components/NutritionModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { RabbitToast } from './components/RabbitToast';
import { Footer } from './components/Footer';

import {
  MenuItem,
  CartItem,
  Promotion,
  SelectedCustomization,
  Order,
  OrderType,
  CustomerDetails,
  OrderStatus,
  TastingOption,
} from './types';
import { RABBIT_MESSAGES } from './data/menuData';

export default function App() {
  // Navigation tabs: 'home' | 'menu' | 'promotions' | 'tasting' | 'contact'
  const [activeTab, setActiveTab] = useState<string>('home');

  // Shopping cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedPromotion, setAppliedPromotion] = useState<Promotion | null>(null);

  // Modals
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [editingCartItem, setEditingCartItem] = useState<CartItem | null>(null);
  const [nutritionItem, setNutritionItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);

  // Rabbit Mascot Toast notification
  const [mascotMessage, setMascotMessage] = useState<string | null>(null);
  const [mascotCelebrating, setMascotCelebrating] = useState<boolean>(false);

  // Trigger initial welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      setMascotMessage(RABBIT_MESSAGES.welcome);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Helper to trigger mascot toast with auto-hide
  const triggerMascotToast = (msg: string, celebrating = false) => {
    setMascotMessage(msg);
    setMascotCelebrating(celebrating);
    const timer = setTimeout(() => {
      setMascotMessage((current) => (current === msg ? null : current));
    }, 4500);
    return () => clearTimeout(timer);
  };

  // Add standard product to cart
  const handleAddToCart = (item: MenuItem, quantity = 1) => {
    const existingIndex = cartItems.findIndex(
      (ci) => ci.menuItem.id === item.id && !ci.customization
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      updated[existingIndex].totalPrice =
        updated[existingIndex].quantity * updated[existingIndex].unitPrice;
      setCartItems(updated);
      triggerMascotToast(RABBIT_MESSAGES.anotherItemAdded);
    } else {
      const newItem: CartItem = {
        cartItemId: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity,
        unitPrice: item.price,
        totalPrice: item.price * quantity,
      };
      setCartItems((prev) => [...prev, newItem]);
      triggerMascotToast(
        cartItems.length === 0 ? RABBIT_MESSAGES.firstItemAdded : RABBIT_MESSAGES.anotherItemAdded
      );
    }
  };

  // Open Customizer for new or existing item
  const handleOpenCustomize = (item: MenuItem) => {
    setEditingCartItem(null);
    setCustomizingItem(item);
  };

  // Edit existing cart item customization
  const handleEditCartItem = (cartItem: CartItem) => {
    setEditingCartItem(cartItem);
    setCustomizingItem(cartItem.menuItem);
    setIsCartOpen(false);
  };

  // Save customization from modal
  const handleConfirmCustomization = (
    item: MenuItem,
    quantity: number,
    customization: SelectedCustomization,
    finalUnitPrice: number
  ) => {
    if (editingCartItem) {
      // Update existing
      setCartItems((prev) =>
        prev.map((ci) =>
          ci.cartItemId === editingCartItem.cartItemId
            ? {
                ...ci,
                quantity,
                customization,
                unitPrice: finalUnitPrice,
                totalPrice: finalUnitPrice * quantity,
              }
            : ci
        )
      );
      triggerMascotToast('“Customization updated to perfection!”');
    } else {
      // Add new customized item
      const newItem: CartItem = {
        cartItemId: `${item.id}-custom-${Date.now()}`,
        menuItem: item,
        quantity,
        customization,
        unitPrice: finalUnitPrice,
        totalPrice: finalUnitPrice * quantity,
      };
      setCartItems((prev) => [...prev, newItem]);
      triggerMascotToast(RABBIT_MESSAGES.firstItemAdded);
    }
    setCustomizingItem(null);
    setEditingCartItem(null);
  };

  // Add Tasting Experience to Cart
  const handleAddTastingToCart = (
    tasting: TastingOption,
    peopleCount: number,
    selectedDrink: string,
    calculatedTotal: number
  ) => {
    const tastingMenuItem: MenuItem = {
      id: `tasting-${tasting.id}`,
      name: `${tasting.name} (${peopleCount} Personas)`,
      category: 'tasting',
      price: calculatedTotal,
      description: tasting.description,
      image: tasting.image,
      badge: 'Experiencia Degustación',
    };

    const tastingCustomization: SelectedCustomization = {
      selectedSize: `${peopleCount} Comensales`,
      removedIngredients: [],
      selectedSauces: [],
      selectedExtras: [{ id: 'drink-pairing', name: selectedDrink, price: 0 }],
      cookingPreference: 'Servicio Degustación en Mesa / Empacado Gourmet',
      specialInstructions: `Bebida de maridaje: ${selectedDrink}. Experiencia gastronómica completa.`,
      extraCost: 0,
    };

    const newCartItem: CartItem = {
      cartItemId: `tasting-${Date.now()}`,
      menuItem: tastingMenuItem,
      quantity: 1,
      customization: tastingCustomization,
      unitPrice: calculatedTotal,
      totalPrice: calculatedTotal,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    triggerMascotToast(RABBIT_MESSAGES.foodTasting, true);
  };

  // Cart operations
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: newQty,
                totalPrice: item.unitPrice * newQty,
              }
            : item
        )
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  // Checkout & Confirmation
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (
    orderType: OrderType,
    customer: CustomerDetails,
    paymentMethod: string,
    subtotal: number,
    discount: number,
    deliveryFee: number,
    finalTotal: number
  ) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ST-${randomSuffix}`;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      createdAt: new Date(),
      items: [...cartItems],
      orderType,
      customer,
      subtotal,
      discount,
      deliveryFee,
      finalTotal,
      appliedPromotion,
      status: 'received',
      estimatedMinutes: orderType === 'delivery' ? 35 : orderType === 'takeaway' ? 20 : 25,
      paymentMethod,
    };

    setConfirmedOrder(newOrder);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
    setCartItems([]); // clear cart
    triggerMascotToast(RABBIT_MESSAGES.orderConfirmed, true);
  };

  const handleTrackOrder = () => {
    setIsConfirmationOpen(false);
    setIsTrackingOpen(true);
  };

  const handleUpdateOrderStatus = (newStatus: OrderStatus) => {
    if (confirmedOrder) {
      setConfirmedOrder({
        ...confirmedOrder,
        status: newStatus,
      });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation handlers
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'menu') {
      scrollToSection('menu-section');
    } else if (tab === 'promotions') {
      scrollToSection('promotions-section');
    } else if (tab === 'tasting') {
      scrollToSection('tasting-section');
    } else if (tab === 'contact') {
      scrollToSection('contact-section');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EDE4] text-[#3D2619] flex flex-col selection:bg-[#E85D04] selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Main App Content */}
      <main className="flex-1">
        {/* Hero Home Page */}
        <HeroHome
          onViewMenu={() => handleNavTab('menu')}
          onOrderNow={() => handleNavTab('menu')}
          onExploreTasting={() => handleNavTab('tasting')}
        />

        {/* Traditional Menu Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenCustomize={handleOpenCustomize}
          onOpenNutrition={(item) => setNutritionItem(item)}
          onScrollToTasting={() => handleNavTab('tasting')}
        />

        {/* Special Promotions Section (Father's Day & Mother's Day 15% OFF) */}
        <PromotionsSection
          appliedPromotion={appliedPromotion}
          onApplyPromotion={(promo) => {
            setAppliedPromotion(promo);
            triggerMascotToast(`“Enjoy 15% OFF with ${promo.title}!”`, true);
          }}
          onRemovePromotion={() => setAppliedPromotion(null)}
        />

        {/* Tolima Food Tasting Experience Section */}
        <FoodTastingSection onAddTastingToCart={handleAddTastingToCart} />
      </main>

      {/* Professional Footer */}
      <Footer onNavigate={handleNavTab} onOpenOrder={() => setIsCartOpen(true)} />

      {/* Interactive Mascot Toast */}
      <RabbitToast
        message={mascotMessage}
        isCelebrating={mascotCelebrating}
        onDismiss={() => setMascotMessage(null)}
      />

      {/* Shopping Cart / My Order Drawer */}
      <MyOrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onEditItem={handleEditCartItem}
        appliedPromotion={appliedPromotion}
        onSelectPromotion={setAppliedPromotion}
        onProceedToCheckout={handleProceedToCheckout}
        onReturnToMenu={() => {
          setIsCartOpen(false);
          handleNavTab('menu');
        }}
      />

      {/* Product Customization Modal */}
      <ProductCustomizationModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => {
          setCustomizingItem(null);
          setEditingCartItem(null);
        }}
        onConfirmCustomization={handleConfirmCustomization}
        initialCustomization={editingCartItem?.customization}
        initialQuantity={editingCartItem?.quantity || 1}
      />

      {/* Nutritional Information Modal */}
      <NutritionModal
        item={nutritionItem}
        isOpen={Boolean(nutritionItem)}
        onClose={() => setNutritionItem(null)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromotion={appliedPromotion}
        onSelectPromotion={setAppliedPromotion}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        isOpen={isConfirmationOpen}
        onTrackOrder={handleTrackOrder}
        onReturnToMenu={() => {
          setIsConfirmationOpen(false);
          handleNavTab('menu');
        }}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        order={confirmedOrder}
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        onUpdateStatus={handleUpdateOrderStatus}
        onReturnToMenu={() => {
          setIsTrackingOpen(false);
          handleNavTab('menu');
        }}
      />
    </div>
  );
}
