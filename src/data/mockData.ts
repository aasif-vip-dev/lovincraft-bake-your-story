import productImage from "@/assets/product-kit.jpg";

export const products = [
  {
    id: 1,
    name: "The First Kiss Kit",
    description: "Where our love story began. Premium vanilla, Madagascar bourbon, and our secret ingredient.",
    longDescription: "This kit recreates the magic of Mila and Aasif's first date cake. Each ingredient is carefully measured and includes our signature secret ingredient that adds an indescribable warmth to every bite. Perfect for anniversaries, date nights, or whenever you want to bake something truly special.",
    price: 34.99,
    category: "Secret Ingredient Kits",
    image: productImage,
    ingredients: ["Premium Vanilla Extract", "Madagascar Bourbon", "Cake Flour", "Cane Sugar", "Secret Love Ingredient"],
    instructions: "Step-by-step recipe card included. Bake at 350°F for 30-35 minutes.",
    rating: 4.9,
    reviewCount: 127,
    inStock: true
  },
  {
    id: 2,
    name: "Anniversary Blend",
    description: "Celebrate every milestone. Rich chocolate, premium cocoa, and love's secret touch.",
    longDescription: "Created to commemorate special moments, this rich chocolate blend combines the finest Dutch cocoa with our secret ingredient. The result is a cake that's not just delicious, but memorable.",
    price: 39.99,
    category: "Secret Ingredient Kits",
    image: productImage,
    ingredients: ["Dutch Cocoa Powder", "Dark Chocolate Chips", "Cake Flour", "Brown Sugar", "Secret Love Ingredient"],
    instructions: "Complete baking guide included with special mixing techniques.",
    rating: 4.8,
    reviewCount: 98,
    inStock: true
  },
  {
    id: 3,
    name: "Starter Love Kit",
    description: "Begin your baking journey. All essentials plus our signature secret ingredient.",
    longDescription: "Perfect for first-time bakers or those starting their love story. This kit has everything you need to create a beautiful, heartfelt cake.",
    price: 29.99,
    category: "Secret Ingredient Kits",
    image: productImage,
    ingredients: ["Vanilla Extract", "Cake Flour", "Baking Powder", "Sugar", "Secret Love Ingredient"],
    instructions: "Beginner-friendly instructions with helpful tips and tricks.",
    rating: 4.9,
    reviewCount: 203,
    inStock: true
  },
  {
    id: 4,
    name: "Premium Vanilla Extract",
    description: "Madagascar bourbon vanilla, the foundation of every great cake.",
    longDescription: "Pure Madagascar bourbon vanilla extract, aged to perfection. This is the foundation of countless love stories.",
    price: 18.99,
    category: "Basic Ingredients",
    image: productImage,
    ingredients: ["Pure Madagascar Vanilla Beans", "Bourbon"],
    rating: 4.7,
    reviewCount: 156,
    inStock: true
  },
  {
    id: 5,
    name: "Dutch Cocoa Powder",
    description: "Rich, dark cocoa powder for the chocolate lover in your life.",
    longDescription: "Premium Dutch-processed cocoa powder with a deep, rich flavor that makes every chocolate cake extraordinary.",
    price: 22.99,
    category: "Basic Ingredients",
    image: productImage,
    ingredients: ["100% Dutch-Processed Cocoa"],
    rating: 4.8,
    reviewCount: 89,
    inStock: true
  },
  {
    id: 6,
    name: "Artisan Cake Flour",
    description: "Silky smooth flour for the perfect texture every time.",
    longDescription: "Specially milled cake flour that creates the lightest, most tender cakes. A must-have for any serious baker.",
    price: 14.99,
    category: "Basic Ingredients",
    image: productImage,
    ingredients: ["Bleached Wheat Flour"],
    rating: 4.6,
    reviewCount: 134,
    inStock: true
  }
];

export const reviews = [
  {
    id: 1,
    productId: 1,
    userName: "Emma & James",
    rating: 5,
    date: "2024-11-10",
    comment: "We made this for our first anniversary and it was absolutely perfect! The secret ingredient really does make a difference. We could taste the love in every bite.",
    verified: true
  },
  {
    id: 2,
    productId: 1,
    userName: "Lisa M.",
    rating: 5,
    date: "2024-11-05",
    comment: "Best baking kit I've ever purchased. The instructions were clear and the result was amazing!",
    verified: true
  },
  {
    id: 3,
    productId: 2,
    userName: "Michael & Sarah",
    rating: 4,
    date: "2024-10-28",
    comment: "Delicious chocolate flavor. Made our anniversary extra special!",
    verified: true
  },
  {
    id: 4,
    productId: 3,
    userName: "First-time Baker",
    rating: 5,
    date: "2024-11-12",
    comment: "I've never baked before and this kit made it so easy! The cake turned out beautifully and my partner was so impressed.",
    verified: true
  }
];

export const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-11-15",
    status: "delivered",
    items: [
      { name: "The First Kiss Kit", quantity: 1, price: 34.99 }
    ],
    total: 34.99,
    shippingAddress: "123 Love Street, Romance City, RC 12345",
    trackingNumber: "TRK123456789"
  },
  {
    id: "ORD-2024-002",
    date: "2024-11-18",
    status: "shipped",
    items: [
      { name: "Anniversary Blend", quantity: 2, price: 39.99 },
      { name: "Premium Vanilla Extract", quantity: 1, price: 18.99 }
    ],
    total: 98.97,
    shippingAddress: "123 Love Street, Romance City, RC 12345",
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2024-11-22"
  },
  {
    id: "ORD-2024-003",
    date: "2024-11-20",
    status: "processing",
    items: [
      { name: "Starter Love Kit", quantity: 1, price: 29.99 }
    ],
    total: 29.99,
    shippingAddress: "123 Love Street, Romance City, RC 12345"
  }
];

export const availableIngredients = [
  { id: 1, name: "Vanilla Extract", category: "Extracts", price: 5.99 },
  { id: 2, name: "Cocoa Powder", category: "Baking", price: 4.99 },
  { id: 3, name: "Cake Flour", category: "Flour", price: 3.99 },
  { id: 4, name: "Brown Sugar", category: "Sweeteners", price: 2.99 },
  { id: 5, name: "Baking Powder", category: "Leavening", price: 2.49 },
  { id: 6, name: "Butter Powder", category: "Dairy", price: 6.99 },
  { id: 7, name: "Almond Extract", category: "Extracts", price: 5.49 },
  { id: 8, name: "Cinnamon", category: "Spices", price: 3.49 }
];

export const secretIngredients = [
  { id: 1, name: "Rose Water", description: "Delicate floral notes", price: 8.99 },
  { id: 2, name: "Lavender Essence", description: "Calming aromatic blend", price: 9.99 },
  { id: 3, name: "Orange Blossom", description: "Citrus floral fusion", price: 8.49 },
  { id: 4, name: "Cardamom Magic", description: "Warm spice mystery", price: 7.99 }
];
