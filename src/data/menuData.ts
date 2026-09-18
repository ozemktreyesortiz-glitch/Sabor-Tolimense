import { MenuItem, Promotion, TastingOption } from '../types';

// Asset paths for generated authentic Colombian images
import rabbitMascotImg from '../assets/images/rabbit_mascot_1789761879073.jpg';
import lechonaImg from '../assets/images/lechona_tolimense_dish_1789763292741.jpg';
import tamalImg from '../assets/images/tamal_tolimense_dish_1789763309873.jpg';
import viudoImg from '../assets/images/viudo_pescado_dish_1789763321092.jpg';
import ajiacoImg from '../assets/images/ajiaco_tolimense_dish_1789763333984.jpg';
import aguaPanelaImg from '../assets/images/agua_de_panela_1789763267892.jpg';
import chichaMaizImg from '../assets/images/chicha_de_maiz_1789763279120.jpg';
import brevasArequipeImg from '../assets/images/brevas_con_arequipe_1789763237914.jpg';
import guayabaQuesilloImg from '../assets/images/guayaba_con_quesillo_1789763254518.jpg';
import tastingImg from '../assets/images/tolima_tasting_1789761920431.jpg';

export const RABBIT_MASCOT_IMAGE = rabbitMascotImg;
export const TASTING_EXPERIENCE_IMAGE = tastingImg;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'lechona-tolimense',
    name: 'Tolima Roasted Pork',
    spanishName: 'Lechona Tolimense',
    category: 'main',
    price: 18000,
    description: 'Traditional Tolimense roasted pork and rice dish. Slow-roasted whole pig stuffed with yellow rice, tender shredded seasoned pork, yellow peas, served with crispy pork skin (cuerona) and arepa.',
    image: lechonaImg,
    badge: 'Signature Dish',
    isPopular: true,
    nutritionalInfo: {
      calories: 680,
      protein: '42g',
      carbs: '54g',
      fat: '28g',
      allergens: ['None declared (Traditionally gluten-free)'],
      note: 'Approximate nutritional values for a standard 350g serving.'
    },
    customizationConfig: {
      sizes: [
        { name: 'Personal Serving (350g)', priceMultiplier: 1, description: 'Classic traditional portion with arepa and crispy crackling' },
        { name: 'Generous Family Serving (650g)', priceMultiplier: 1.8, description: 'Double portion with extra crispy crackling' },
      ],
      removableIngredients: ['Green scallion sofrito', 'Toasted yellow peas', 'Crispy pork skin (Cuerona)'],
      sauces: [
        { id: 's-aji-lechona', name: 'Tolima spicy house ají sauce', price: 1000 },
        { id: 's-hogao-lechona', name: 'Warm homemade creole hogao', price: 1500 },
        { id: 's-limon-lechona', name: 'Fresh sliced lime', price: 0 },
      ],
      extraIngredients: [
        { id: 'e-cuerona', name: 'Extra crispy pork crackling portion', price: 4000 },
        { id: 'e-arepa', name: 'Artisanal white corn arepa', price: 1500 },
        { id: 'e-aguacate', name: 'Fresh avocado slices', price: 2500 },
        { id: 'e-platano', name: 'Sweet caramelized ripe plantain', price: 2000 },
      ],
      cookingPreferences: [
        'Extra crispy golden crackling skin',
        'Extra juicy and tender pulled meat',
        'Traditional balanced recipe (Recommended)',
      ],
    },
  },
  {
    id: 'tamal-tolimense',
    name: 'Tolimense Steamed Tamale',
    spanishName: 'Tamal Tolimense',
    category: 'main',
    price: 12000,
    description: 'Traditional Colombian tamal prepared in the Tolima style. Steamed in fragrant bijao banana leaves with seasoned corn dough, pork rib, chicken, hard-boiled egg, carrots, and yellow peas.',
    image: tamalImg,
    badge: 'Traditional Breakfast',
    isPopular: true,
    nutritionalInfo: {
      calories: 540,
      protein: '34g',
      carbs: '48g',
      fat: '22g',
      allergens: ['Egg'],
      note: 'Steamed for 4 hours in indigenous bijao banana leaves.'
    },
    customizationConfig: {
      removableIngredients: ['Hard-boiled egg', 'Fresh carrot slices', 'Yellow peas'],
      sauces: [
        { id: 's-aji-tamal', name: 'Tolima cilantro ají sauce', price: 1000 },
        { id: 's-hogao-tamal', name: 'Traditional farmhouse hogao sauce', price: 1500 },
      ],
      extraIngredients: [
        { id: 'e-costilla', name: 'Extra tender pork rib piece', price: 4000 },
        { id: 'e-pollo', name: 'Extra farmhouse chicken piece', price: 3500 },
        { id: 'e-arepa-tamal', name: 'Warm freshly roasted arepa', price: 1500 },
        { id: 'e-quesillo-tamal', name: 'Fresh Tolima quesillo cheese slice', price: 3000 },
      ],
    },
  },
  {
    id: 'viudo-de-pescado',
    name: 'Steamed River Fish Platter',
    spanishName: 'Viudo de Pescado',
    category: 'main',
    price: 20000,
    description: 'Traditional Colombian fish dish served with regional accompaniments. Fresh river fish cooked over a bed of steamed yuca, plantain, and potatoes, smothered in rich artisanal hogao sauce.',
    image: viudoImg,
    badge: 'River Heritage',
    nutritionalInfo: {
      calories: 510,
      protein: '40g',
      carbs: '58g',
      fat: '14g',
      allergens: ['Fish'],
      note: 'Fresh catch of the day seasoned with Magdalena river herbs.'
    },
    customizationConfig: {
      removableIngredients: ['Steamed cassava (yuca)', 'Green plantain', 'Chopped cilantro'],
      sauces: [
        { id: 's-hogao-viudo', name: 'Generous warm creole hogao', price: 1500 },
        { id: 's-aji-viudo', name: 'Artisanal house spicy ají', price: 1000 },
      ],
      extraIngredients: [
        { id: 'e-caldo', name: 'Bowl of rich fish broth reduction', price: 2500 },
        { id: 'e-arroz-coco', name: 'Traditional white rice portion', price: 2000 },
        { id: 'e-aguacate-viudo', name: 'Half fresh ripe avocado', price: 2500 },
      ],
      cookingPreferences: [
        'Traditional steaming with fresh herbs',
        'Generously smothered in warm sautéed hogao',
      ],
    },
  },
  {
    id: 'ajiaco-tolimense',
    name: 'Tolima Chicken & Potato Soup',
    spanishName: 'Ajiaco Tolimense',
    category: 'main',
    price: 18000,
    description: 'Traditional regional soup prepared with Colombian ingredients. Savory chicken broth thickened with three varieties of native potatoes, shredded chicken breast, tender sweet corn, capers, and cream.',
    image: ajiacoImg,
    badge: 'Comfort Stew',
    nutritionalInfo: {
      calories: 590,
      protein: '38g',
      carbs: '62g',
      fat: '19g',
      allergens: ['Dairy (Heavy cream)'],
      note: 'Served in traditional black clay bowl from La Chamba, Tolima.'
    },
    customizationConfig: {
      removableIngredients: ['Thick heavy cream', 'Pickled capers', 'Wild guasca herbs'],
      sauces: [
        { id: 's-aji-ajiaco', name: 'Homemade Tolima spicy ají', price: 1000 },
      ],
      extraIngredients: [
        { id: 'e-pollo-ajiaco', name: 'Extra shredded chicken breast', price: 4000 },
        { id: 'e-mazorca', name: 'Tender sweet corn cob round', price: 2000 },
        { id: 'e-aguacate-ajiaco', name: 'Creamy avocado portion', price: 2500 },
        { id: 'e-arroz-ajiaco', name: 'Freshly steamed white rice', price: 2000 },
      ],
    },
  },
  {
    id: 'agua-de-panela',
    name: 'Hot Sugarcane Tea with Lime',
    spanishName: 'Agua de Panela con Queso',
    category: 'beverage',
    price: 6000,
    description: 'Traditional Colombian pure unrefined cane sugar beverage. Served steaming hot with fresh lime or icy cold with fresh citrus slices.',
    image: aguaPanelaImg,
    badge: 'House Beverage',
    nutritionalInfo: {
      calories: 140,
      protein: '0g',
      carbs: '35g',
      fat: '0g',
      allergens: ['None'],
      note: '100% natural raw unrefined cane sugar from the Tolima region.'
    },
    customizationConfig: {
      sizes: [
        { name: 'Personal Glass (300ml)', priceMultiplier: 1 },
        { name: 'Rustic Farm Pitcher (600ml)', priceMultiplier: 1.6 },
      ],
      cookingPreferences: [
        'Steaming hot farmhouse style',
        'Chilled on ice with refreshing lime',
      ],
      extraIngredients: [
        { id: 'e-queso-aguapanela', name: 'Fresh farmer cheese slice for dipping', price: 3000 },
        { id: 'e-canela', name: 'Infused with aromatic cinnamon bark', price: 500 },
      ],
    },
  },
  {
    id: 'chicha-de-maiz',
    name: 'Ancestral Fermented Corn Drink',
    spanishName: 'Chicha de Maíz Tolimense',
    category: 'beverage',
    price: 6000,
    description: 'Authentic ancestral Colombian fermented corn drink sweetened with unrefined panela and scented with sweet cloves and cinnamon.',
    image: chichaMaizImg,
    badge: 'Ancestral Tolima',
    nutritionalInfo: {
      calories: 180,
      protein: '3g',
      carbs: '38g',
      fat: '1.5g',
      allergens: ['Corn'],
      note: 'Gently fermented artisanal recipe handed down through Tolimense generations.'
    },
    customizationConfig: {
      sizes: [
        { name: 'Traditional Clay Cup (300ml)', priceMultiplier: 1 },
        { name: 'Shared Clay Pitcher (750ml)', priceMultiplier: 1.8 },
      ],
      cookingPreferences: [
        'House chilled (Traditional)',
        'With a sweet touch of panela syrup',
      ],
      extraIngredients: [
        { id: 'e-panela-molida', name: 'Extra dusting of aromatic cinnamon & sweet clove', price: 500 },
      ],
    },
  },
  {
    id: 'brevas-con-arequipe',
    name: 'Candied Figs with Dulce de Leche',
    spanishName: 'Brevas con Arequipe',
    category: 'dessert',
    price: 8000,
    description: 'Tender candied green figs slowly simmered in raw sugar syrup, served generously filled with smooth artisanal Colombian arequipe (dulce de leche).',
    image: brevasArequipeImg,
    badge: 'Traditional Sweet',
    nutritionalInfo: {
      calories: 320,
      protein: '4g',
      carbs: '68g',
      fat: '5g',
      allergens: ['Dairy (Arequipe caramel)'],
      note: 'Selected green figs gently candied in copper pots.'
    },
    customizationConfig: {
      extraIngredients: [
        { id: 'e-quesillo-brevas', name: 'Fresh Tolima quesillo cheese slice pairing', price: 2500 },
        { id: 'e-arequipe-extra', name: 'Extra serving of artisanal arequipe (caramel)', price: 1500 },
      ],
    },
  },
  {
    id: 'dulce-guayaba-quesillo',
    name: 'Guava Jelly with Fresh Cheese',
    spanishName: 'Dulce de Guayaba con Quesillo (El Matrimonio)',
    category: 'dessert',
    price: 6000,
    description: 'Iconic Colombian pairing of sweet artisan red guava jelly paste (veleño) accompanied by rich fresh Colombian quesillo cheese.',
    image: guayabaQuesilloImg,
    badge: 'Tolima Classic Pairing',
    nutritionalInfo: {
      calories: 260,
      protein: '8g',
      carbs: '42g',
      fat: '7g',
      allergens: ['Dairy (Fresh Quesillo)'],
      note: 'The iconic contrast between rich guava sweetness and fresh farmer cheese.'
    },
    customizationConfig: {
      extraIngredients: [
        { id: 'e-quesillo-doble', name: 'Double slice of fresh Tolima quesillo cheese', price: 2500 },
        { id: 'e-melao', name: 'Drizzle of warm spiced panela syrup', price: 1000 },
      ],
    },
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'fathers-day-15',
    title: "Father's Day Promotion",
    code: 'PADRETOLIMA15',
    discountPercentage: 15,
    description: 'Celebrate Papá with the authentic heritage and feast of Tolima! Get 15% OFF across your entire order.',
    badge: '15% OFF',
    tagline: '¡Celebremos a Papá con el auténtico sabor de nuestra tierra!',
    isActive: true,
    expiryNote: 'Válido para consumo en restaurante, para llevar y domicilio.',
  },
  {
    id: 'mothers-day-15',
    title: "Mother's Day Promotion",
    code: 'MADRETOLIMA15',
    discountPercentage: 15,
    description: 'Honoring Mamá with pure love and authentic Tolimense home flavors. Enjoy 15% OFF your full restaurant order.',
    badge: '15% OFF',
    tagline: '¡El amor de Mamá merece la mejor sazón tolimense!',
    isActive: true,
    expiryNote: 'Válido aplicando el cupón en carrito o al ordenar.',
  },
];

export const TASTING_PACKAGES: TastingOption[] = [
  {
    id: 'banquete-tolimense',
    name: 'Grand Tolima Tasting Feast',
    description: 'The ultimate signature sampling journey: mini portions of crispy Tolima roasted pork (Lechona), steamed tamalito in bijao leaf, golden crispy empanadas, warm sweet corn arepitas with fresh quesillo, and traditional beverage.',
    basePricePerPerson: 32000,
    includedDishes: [
      'Tasting portion of Tolima Roasted Pork with crispy crackling',
      'Tolimense Steamed Tamale in fragrant bijao banana leaves',
      'Crispy artisanal Colombian empanaditas with homemade ají',
      'Sweet corn arepitas topped with fresh quesillo cheese',
      'Traditional beverage of choice (Ancestral Chicha or Hot Sugarcane Drink)',
      'Mini dessert of Candied Figs with Dulce de Leche'
    ],
    image: tastingImg,
  },
  {
    id: 'ruta-magdalena',
    name: 'Magdalena River & Valley Tasting',
    description: 'A tribute to the Magdalena river and Tolima valleys: tasting size Steamed River Fish (Viudo de Pescado) with rich creole hogao, Tolima Chicken & Potato Soup (Ajiaco) in artisanal black clay bowl, and Guava Jelly with Fresh Cheese.',
    basePricePerPerson: 36000,
    includedDishes: [
      'Tasting serving of Steamed River Fish with cassava & plantains',
      'Artisanal clay bowl of Tolima Chicken & Potato Soup with capers',
      'White rice with sautéed creole hogao',
      'Cold sugarcane drink with fresh mandarin lime',
      'House Guava Jelly with fresh Colombian quesillo cheese'
    ],
    image: viudoImg,
  },
];

export const RABBIT_MESSAGES = {
  welcome: '“Hello! Welcome to Sabor Tolimense. Come and discover the authentic flavors of Tolima!”',
  firstItemAdded: '“Great choice!”',
  anotherItemAdded: '“That looks delicious!”',
  emptyCart: '“Your order is waiting for something delicious!”',
  orderConfirmed: '“Thank you! We are preparing something delicious for you.”',
  foodTasting: '“Let\'s discover the flavors of Tolima together!”',
  promoApplied: '“Enjoy 15% OFF! We love treating you to great savings.”',
};
