export type ProductCategory = 'main' | 'beverage' | 'dessert' | 'tasting';

export interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  allergens: string[];
  note?: string;
}

export interface CustomizationAddon {
  id: string;
  name: string;
  price: number;
}

export interface ProductCustomizationConfig {
  sizes?: { name: string; priceMultiplier: number; description?: string }[];
  removableIngredients?: string[];
  sauces?: CustomizationAddon[];
  extraIngredients?: CustomizationAddon[];
  cookingPreferences?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  spanishName?: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  badge?: string;
  isPopular?: boolean;
  nutritionalInfo?: NutritionalInfo;
  customizationConfig?: ProductCustomizationConfig;
}

export interface SelectedCustomization {
  selectedSize?: string;
  removedIngredients: string[];
  selectedSauces: CustomizationAddon[];
  selectedExtras: CustomizationAddon[];
  cookingPreference?: string;
  specialInstructions?: string;
  extraCost: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  customization?: SelectedCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface Promotion {
  id: string;
  title: string;
  code: string;
  discountPercentage: number;
  description: string;
  badge: string;
  tagline: string;
  isActive: boolean;
  expiryNote: string;
}

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';

export interface CustomerDetails {
  name: string;
  phone: string;
  address?: string;
  deliveryNotes?: string;
  tableNumber?: string;
  pickupTime?: string;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'completed';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: Date;
  items: CartItem[];
  orderType: OrderType;
  customer: CustomerDetails;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  finalTotal: number;
  appliedPromotion?: Promotion | null;
  status: OrderStatus;
  estimatedMinutes: number;
  paymentMethod: string;
}

export interface TastingOption {
  id: string;
  name: string;
  description: string;
  basePricePerPerson: number;
  includedDishes: string[];
  image: string;
}
