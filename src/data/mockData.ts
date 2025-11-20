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

export const recipes = [
  {
    id: 1,
    productId: 1,
    name: "The First Kiss Vanilla Cake",
    description: "A tender vanilla cake infused with Madagascar bourbon and our secret love ingredient",
    prepTime: "20 minutes",
    bakeTime: "35 minutes",
    totalTime: "55 minutes",
    difficulty: "Easy",
    servings: 12,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ingredients: [
      "2 cups all-purpose flour (included in kit)",
      "1½ cups granulated sugar (included in kit)",
      "3 teaspoons baking powder (included in kit)",
      "1 teaspoon salt",
      "½ cup unsalted butter, softened",
      "1 cup whole milk",
      "2 large eggs",
      "2 tablespoons vanilla extract (included in kit)",
      "1 tablespoon secret love ingredient (included in kit)"
    ],
    steps: [
      {
        number: 1,
        title: "Preheat and Prepare",
        description: "Preheat your oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
        tip: "For extra tender cakes, line the bottom of your pans with parchment paper."
      },
      {
        number: 2,
        title: "Mix Dry Ingredients",
        description: "In a large bowl, whisk together the flour, sugar, baking powder, and salt until well combined.",
        tip: "Sifting the dry ingredients will create an even lighter texture."
      },
      {
        number: 3,
        title: "Cream Butter and Add Wet Ingredients",
        description: "Add the softened butter to the dry ingredients and mix on low speed. In a separate bowl, whisk together milk, eggs, vanilla extract, and the secret love ingredient.",
        tip: "Room temperature ingredients blend more smoothly and create a better texture."
      },
      {
        number: 4,
        title: "Combine and Mix",
        description: "Gradually add the wet ingredients to the dry mixture, beating on medium speed for 2 minutes until smooth and creamy.",
        tip: "Don't overmix! Stop as soon as the batter is smooth to keep the cake tender."
      },
      {
        number: 5,
        title: "Bake with Love",
        description: "Divide the batter evenly between the prepared pans. Bake for 30-35 minutes, or until a toothpick inserted in the center comes out clean.",
        tip: "The secret ingredient releases its magic aroma around the 25-minute mark."
      },
      {
        number: 6,
        title: "Cool and Frost",
        description: "Let cakes cool in pans for 10 minutes, then transfer to a wire rack to cool completely before frosting.",
        tip: "For best results, frost only when completely cool to prevent melting."
      }
    ],
    notes: [
      "The secret love ingredient is what made this cake special on Mila and Aasif's first date.",
      "This recipe can be made as cupcakes - reduce baking time to 18-22 minutes.",
      "Store frosted cake at room temperature for 2 days, or refrigerate for up to 5 days."
    ]
  },
  {
    id: 2,
    productId: 2,
    name: "Anniversary Chocolate Celebration Cake",
    description: "A decadent chocolate cake with rich cocoa and our signature secret ingredient",
    prepTime: "25 minutes",
    bakeTime: "40 minutes",
    totalTime: "65 minutes",
    difficulty: "Medium",
    servings: 14,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ingredients: [
      "2 cups all-purpose flour (included in kit)",
      "2 cups granulated sugar (included in kit)",
      "¾ cup Dutch cocoa powder (included in kit)",
      "2 teaspoons baking powder",
      "1½ teaspoons baking soda",
      "1 teaspoon salt",
      "2 eggs",
      "1 cup whole milk",
      "½ cup vegetable oil",
      "2 teaspoons vanilla extract",
      "1 cup boiling water",
      "2 tablespoons secret love ingredient (included in kit)"
    ],
    steps: [
      {
        number: 1,
        title: "Prepare Your Workspace",
        description: "Preheat oven to 350°F. Grease and flour two 9-inch round pans or one 9x13 pan.",
        tip: "Cocoa powder can be used instead of flour for dusting chocolate cake pans."
      },
      {
        number: 2,
        title: "Combine Dry Ingredients",
        description: "In a large mixing bowl, stir together flour, sugar, cocoa, baking powder, baking soda, and salt.",
        tip: "Make sure there are no cocoa lumps - whisk thoroughly."
      },
      {
        number: 3,
        title: "Add Wet Ingredients",
        description: "Add eggs, milk, oil, and vanilla. Beat on medium speed for 2 minutes. The batter will be thick.",
        tip: "Don't worry if the batter seems thick at this stage - the next step will fix that."
      },
      {
        number: 4,
        title: "Add the Magic",
        description: "Stir in the secret love ingredient, then carefully add boiling water. Batter will be very thin - this is perfect!",
        tip: "The thin batter creates an incredibly moist cake. Don't be alarmed!"
      },
      {
        number: 5,
        title: "Bake",
        description: "Pour batter into prepared pans. Bake for 35-40 minutes (30-35 for 9x13) until toothpick comes out clean.",
        tip: "The secret ingredient enhances the chocolate flavor as it bakes."
      },
      {
        number: 6,
        title: "Cool and Serve",
        description: "Cool in pans for 10 minutes, then remove to wire racks. Cool completely before frosting.",
        tip: "This cake is extra moist - handle gently when moving to cooling racks."
      }
    ],
    notes: [
      "This was the cake Mila and Aasif made for their first anniversary.",
      "Pair with chocolate ganache or cream cheese frosting for the ultimate indulgence.",
      "The secret ingredient brings out the deep chocolate notes beautifully."
    ]
  },
  {
    id: 3,
    productId: 3,
    name: "Starter Love Simple Vanilla Cake",
    description: "A perfect beginner-friendly vanilla cake with our special touch",
    prepTime: "15 minutes",
    bakeTime: "30 minutes",
    totalTime: "45 minutes",
    difficulty: "Beginner",
    servings: 10,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ingredients: [
      "1¾ cups all-purpose flour (included in kit)",
      "1½ cups sugar (included in kit)",
      "2 teaspoons baking powder (included in kit)",
      "½ teaspoon salt",
      "½ cup butter, room temperature",
      "¾ cup milk",
      "2 eggs",
      "1 tablespoon vanilla extract (included in kit)",
      "1 tablespoon secret love ingredient (included in kit)"
    ],
    steps: [
      {
        number: 1,
        title: "Get Ready",
        description: "Preheat your oven to 350°F and grease an 8-inch square pan or 9-inch round pan.",
        tip: "First time baking? Take your time and enjoy the process!"
      },
      {
        number: 2,
        title: "Mix Everything Together",
        description: "In a large bowl, combine all dry ingredients. Add butter, milk, eggs, vanilla, and secret ingredient. Beat for 3 minutes until smooth.",
        tip: "This one-bowl method is super easy for beginners!"
      },
      {
        number: 3,
        title: "Pour and Bake",
        description: "Pour batter into prepared pan. Bake for 28-32 minutes until golden and a toothpick comes out clean.",
        tip: "Your kitchen will smell amazing - that's the secret ingredient working its magic!"
      },
      {
        number: 4,
        title: "Cool and Enjoy",
        description: "Let cool for 10 minutes in the pan, then turn out onto a plate. Can be served warm or cooled.",
        tip: "Perfect with a simple dusting of powdered sugar or vanilla frosting."
      }
    ],
    notes: [
      "Perfect for your first baking adventure together.",
      "This simple recipe is forgiving and almost impossible to mess up.",
      "Great for birthdays, celebrations, or just because."
    ]
  }
];

