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

export const blogPosts = [
  {
    id: 1,
    title: "The Secret Ingredient is Love: Mila & Aasif's Journey",
    slug: "secret-ingredient-love-story",
    excerpt: "Discover how a simple vanilla cake on a rainy afternoon transformed into a lifetime of baking memories and the birth of LovinCraft.",
    category: "Love Stories",
    author: "Mila & Aasif",
    date: "2024-11-15",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop",
    content: `
      <p>It was a rainy Tuesday afternoon when everything changed. Aasif had just moved into the apartment next door, and I could smell something burning through the walls. Being the concerned neighbor (and maybe a bit nosy), I knocked on his door.</p>
      
      <p>"I'm trying to bake a cake," he said sheepishly, opening the door to reveal a smoke-filled kitchen. "It's my mom's birthday tomorrow, and I wanted to surprise her."</p>
      
      <p>That's when I noticed it - a recipe card in his hand, worn and stained from years of use. His grandmother's vanilla cake recipe. The same recipe my grandmother used to make.</p>
      
      <h2>A Shared Memory</h2>
      
      <p>We spent the next three hours in my kitchen, recreating that cake. As we mixed, measured, and laughed over flour-covered counters, we discovered we shared more than just a recipe. We both grew up with grandmothers who believed that the secret to great baking wasn't just in the ingredients - it was in the love you put into it.</p>
      
      <p>"My grandmother always added something special," Aasif confessed as we waited for the cake to bake. "She never told anyone what it was, but every cake she made had this indescribable warmth to it."</p>
      
      <p>I smiled. My grandmother had the same secret.</p>
      
      <h2>The Discovery</h2>
      
      <p>Over the following months, we experimented with countless recipes, trying to recreate that magical quality our grandmothers' cakes had. We tested different vanilla extracts, adjusted sugar ratios, and tried every baking technique in the books.</p>
      
      <p>Then one evening, while going through my grandmother's old recipe box, I found it - a small envelope labeled "For when you find the one." Inside was her secret ingredient, along with a note: "Love isn't just a feeling, it's something you can taste."</p>
      
      <h2>Building LovinCraft</h2>
      
      <p>That discovery led to our first anniversary, where we decided to share this secret with the world. Every kit we create at LovinCraft contains not just premium ingredients, but the same secret ingredient our grandmothers used - the one that makes every bite taste like home, like memories, like love.</p>
      
      <p>Because we believe everyone deserves to bake something that makes their loved ones feel special. Everyone deserves to create memories in the kitchen, one cake at a time.</p>
    `,
    tags: ["Love Story", "Our Journey", "Inspiration"]
  },
  {
    id: 2,
    title: "10 Baking Tips Every Beginner Should Know",
    slug: "baking-tips-for-beginners",
    excerpt: "Master the fundamentals of baking with these essential tips that will transform your cakes from good to extraordinary.",
    category: "Baking Tips",
    author: "Mila",
    date: "2024-11-10",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
    content: `
      <p>Whether you're baking your first cake or your hundredth, these fundamental tips will help you achieve perfect results every time.</p>
      
      <h2>1. Room Temperature Ingredients</h2>
      <p>This is the golden rule of baking. Butter, eggs, and milk should all be at room temperature before you start. Cold ingredients don't blend as smoothly, which can result in a dense, uneven cake. Take your ingredients out of the fridge 30-60 minutes before baking.</p>
      
      <h2>2. Measure Accurately</h2>
      <p>Baking is science. Unlike cooking, where you can eyeball measurements, baking requires precision. Use proper measuring cups for dry ingredients and liquid measuring cups for wet ingredients. For best results, weigh your ingredients with a kitchen scale.</p>
      
      <h2>3. Don't Overmix</h2>
      <p>Once you add flour to wet ingredients, mix just until combined. Overmixing develops gluten, which makes cakes tough and chewy instead of light and tender. Mix until you no longer see streaks of flour, then stop!</p>
      
      <h2>4. Preheat Your Oven</h2>
      <p>Always preheat your oven for at least 15-20 minutes before baking. An oven that's not fully heated will affect rising and browning. Consider using an oven thermometer - many ovens run hotter or cooler than their display suggests.</p>
      
      <h2>5. Use Quality Ingredients</h2>
      <p>Your cake is only as good as its ingredients. Real vanilla extract tastes noticeably better than imitation. Fresh baking powder (replace every 6 months) ensures proper rise. Quality ingredients make a real difference in the final result.</p>
      
      <h2>6. The Toothpick Test</h2>
      <p>Insert a toothpick into the center of your cake about 5 minutes before the recipe's suggested time. If it comes out with wet batter, bake longer. A few moist crumbs are perfect - that means your cake is done but still moist.</p>
      
      <h2>7. Cool Completely Before Frosting</h2>
      <p>This one requires patience, but it's crucial. Frosting a warm cake will cause the frosting to melt and slide off. Let cakes cool in the pan for 10 minutes, then on a wire rack until completely cool - usually about an hour.</p>
      
      <h2>8. Line Your Pans</h2>
      <p>Grease your pans, then line the bottom with parchment paper, and grease again. This ensures your cake releases perfectly every time. No more cakes stuck to the pan!</p>
      
      <h2>9. Rotate Halfway Through</h2>
      <p>Most ovens have hot spots. Rotating your cake pan 180 degrees halfway through baking ensures even browning and rising. Do this quickly to avoid temperature loss.</p>
      
      <h2>10. Trust the Process</h2>
      <p>Baking takes practice. Your first cake might not be perfect, and that's okay! Each cake teaches you something new. The most important ingredient is the love you put into it - and that makes any cake special.</p>
      
      <p>Remember, every expert baker started exactly where you are now. Happy baking! 🎂</p>
    `,
    tags: ["Baking Tips", "Beginners", "Tutorial"]
  },
  {
    id: 3,
    title: "Anniversary Gift Ideas: Beyond the Traditional",
    slug: "creative-anniversary-gift-ideas",
    excerpt: "Move beyond flowers and chocolates with these heartfelt anniversary gift ideas that celebrate your unique love story.",
    category: "Gift Ideas",
    author: "Aasif",
    date: "2024-11-05",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=600&fit=crop",
    content: `
      <p>Anniversaries are special milestones that deserve celebration. While traditional gifts like flowers and chocolates are lovely, here are some creative ideas that will create lasting memories.</p>
      
      <h2>1. Bake Together</h2>
      <p>Instead of buying a cake, bake one together! Our Secret Ingredient Kits are designed for couples to create something meaningful together. The time spent measuring, mixing, and decorating becomes a memory in itself. Plus, you get a delicious cake at the end!</p>
      
      <h2>2. Create a Recipe Book of Your Memories</h2>
      <p>Compile recipes that represent your relationship journey. The dish from your first date, the dessert from your wedding, Sunday breakfast favorites. Add photos and notes about why each recipe is special. This becomes a treasured keepsake that grows with your relationship.</p>
      
      <h2>3. Recreate Your First Date</h2>
      <p>Return to where it all began. Visit the same restaurant, watch the same movie, or cook the same meal you had on your first date. If distance or circumstances make this impossible, recreate it at home. The effort shows how much you cherish those early memories.</p>
      
      <h2>4. A Jar of Love Notes</h2>
      <p>Write 365 love notes - one for each day of the year ahead. Include memories, reasons you love them, inside jokes, or simple compliments. Present them in a beautiful jar they can draw from whenever they need a smile.</p>
      
      <h2>5. Experience Over Things</h2>
      <p>Book a couples cooking class, pottery workshop, or dance lessons. Experiences create memories and give you something to look forward to together. Learning something new as a couple strengthens your bond.</p>
      
      <h2>6. A Time Capsule</h2>
      <p>Create a time capsule to open on your next milestone anniversary. Include current photos, a letter to your future selves, ticket stubs, a current newspaper, and small mementos from the past year. Seal it with plans to open it together in 5, 10, or 25 years.</p>
      
      <h2>7. Cook Their Comfort Food</h2>
      <p>Make their favorite childhood dish or the meal that reminds them of home. The effort to learn and prepare something meaningful to them shows deep care and attention to what matters to your partner.</p>
      
      <h2>8. A Photo Book or Album</h2>
      <p>In our digital age, printed photos are increasingly rare and precious. Create a photo book of your year together, or compile highlights from your entire relationship. Add captions with inside jokes and special memories.</p>
      
      <h2>9. Plan a Surprise Day</h2>
      <p>Take charge of the entire day. Plan breakfast in bed, a favorite activity, a special dinner - all their favorites. The gift isn't just the activities, but the thought and effort you put into making the day perfect for them.</p>
      
      <h2>10. A Custom Celebration Cake</h2>
      <p>Use our I2Card feature to create a completely custom cake kit with their favorite flavors and a secret ingredient. Include a handwritten recipe card with notes about why you chose each ingredient. It's personal, delicious, and creates a new tradition.</p>
      
      <h2>The Most Important Ingredient</h2>
      <p>Remember, the best gifts come from knowing your partner deeply. Pay attention to what they mention throughout the year, their dreams, their favorite memories. The most meaningful gifts show that you listen, you care, and you remember.</p>
      
      <p>What makes your anniversary special isn't the price tag - it's the thought, the love, and the time you invest in celebrating your unique story together.</p>
    `,
    tags: ["Anniversary", "Gift Ideas", "Relationships"]
  },
  {
    id: 4,
    title: "The Art of Vanilla: Choosing the Perfect Extract",
    slug: "choosing-vanilla-extract",
    excerpt: "Not all vanilla is created equal. Learn how to select the best vanilla extract for your baking projects.",
    category: "Baking Tips",
    author: "Mila",
    date: "2024-10-28",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=800&h=600&fit=crop",
    content: `
      <p>Vanilla is one of the most essential ingredients in baking, yet it's often overlooked. Let's explore how to choose and use vanilla to elevate your baking.</p>
      
      <h2>Pure vs. Imitation</h2>
      <p>Pure vanilla extract is made from real vanilla beans and alcohol. Imitation vanilla is synthetic vanillin. While imitation vanilla costs less, pure vanilla extract has a complex, rich flavor that's worth the investment for special cakes.</p>
      
      <h2>Madagascar Bourbon Vanilla</h2>
      <p>Despite the name, there's no whiskey involved! "Bourbon" refers to the Bourbon Islands where these vanilla beans grow. Madagascar vanilla is creamy and sweet - it's what most people think of as classic vanilla flavor. Perfect for buttercream, vanilla cakes, and cookies.</p>
      
      <h2>Tahitian Vanilla</h2>
      <p>Tahitian vanilla has floral, fruity notes. It's more delicate and aromatic than Madagascar vanilla. Use it in recipes where vanilla is the star, like vanilla bean ice cream or panna cotta. It's heat-sensitive, so add it after cooking when possible.</p>
      
      <h2>Mexican Vanilla</h2>
      <p>Mexican vanilla has a bold, spicy flavor with hints of clove. It's wonderful in chocolate desserts and spice cakes. Be cautious when buying Mexican vanilla - ensure it's from a reputable source, as some cheaper versions contain harmful coumarin.</p>
      
      <h2>Vanilla Bean Paste</h2>
      <p>This is vanilla extract's fancy cousin. It contains vanilla bean seeds (those beautiful black specks) suspended in a thick paste. Use it when you want visual appeal and intense vanilla flavor. One tablespoon of paste equals one vanilla bean or one tablespoon of extract.</p>
      
      <h2>Storage Tips</h2>
      <p>Store vanilla extract in a cool, dark place. Unlike most ingredients, vanilla extract doesn't really expire - it gets better with age! Keep the bottle tightly sealed to prevent alcohol evaporation.</p>
      
      <h2>Make Your Own</h2>
      <p>It's easy! Split 3-5 vanilla beans lengthwise and place in 8 ounces of vodka (or bourbon for deeper flavor). Store in a dark place for at least 2 months, shaking occasionally. The longer it sits, the stronger it gets. You can keep adding vodka and beans indefinitely!</p>
      
      <h2>How Much to Use</h2>
      <p>Most recipes call for 1-2 teaspoons per cake. But here's a secret: you can usually add a bit more vanilla than the recipe calls for. It's hard to overdo vanilla - it just makes everything taste better!</p>
      
      <p>The vanilla we include in our Secret Ingredient Kits is premium Madagascar Bourbon vanilla - chosen because it provides the perfect foundation for our secret ingredient to shine through.</p>
    `,
    tags: ["Ingredients", "Baking Tips", "Vanilla"]
  },
  {
    id: 5,
    title: "Celebrating Small Moments: Why You Don't Need a Special Occasion",
    slug: "celebrating-small-moments",
    excerpt: "The best memories aren't always on calendars. Learn to celebrate the everyday magic in your relationship.",
    category: "Love Stories",
    author: "Mila & Aasif",
    date: "2024-10-20",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop",
    content: `
      <p>We live in a world of big celebrations - birthdays, anniversaries, holidays. But what about Tuesday? What about the moment they finally figured out that recipe they'd been trying to perfect? What about surviving a particularly tough week?</p>
      
      <h2>The Tuesday Night Cake</h2>
      <p>Last Tuesday, Aasif came home exhausted after a long day. No special occasion, no reason to celebrate. I pulled out our Anniversary Blend kit and suggested we bake together.</p>
      
      <p>"But it's just Tuesday," he said.</p>
      
      <p>"Exactly," I replied. "When did we decide we only deserved cake on special days?"</p>
      
      <p>That Tuesday night cake, eaten at our kitchen counter while sharing stories about our day, became one of my favorite memories. Not because of the occasion, but because we chose to make it special.</p>
      
      <h2>Small Victories Deserve Celebration</h2>
      <p>Your partner landed a new client? Bake a cake. Your kid finally mastered their multiplication tables? Bake a cake. You both survived Monday? You guessed it - bake a cake!</p>
      
      <p>Celebrations don't need to be grand. A simple homemade dessert says "I noticed. I'm proud of you. This matters to me because you matter to me."</p>
      
      <h2>The Power of "Just Because"</h2>
      <p>Some of our happiest memories have no date on the calendar. They're the impromptu dance in the kitchen while the cake bakes. The flour fight that started accidentally and ended in laughter. The quiet Sunday morning when you decided to surprise them with their favorite cake.</p>
      
      <p>"Just because" might be the best reason of all.</p>
      
      <h2>Creating Traditions</h2>
      <p>You don't have to wait for holidays to create traditions. Maybe Friday nights are for trying new recipes together. Maybe the first day of each month deserves a celebration. Maybe rainy Sundays call for comfort baking.</p>
      
      <p>The traditions you create together become the fabric of your relationship. They're the things you'll look back on and smile about.</p>
      
      <h2>It's About Time, Not Timing</h2>
      <p>The best gift you can give someone isn't on their birthday or anniversary - it's your time and attention on a random Thursday. It's saying "Let's spend the next hour creating something together" when there's no reason except that you want to.</p>
      
      <h2>Make Today Special</h2>
      <p>Don't wait for the perfect occasion. Today, right now, is worthy of celebration. You're here. They're here. You have each other. That's everything.</p>
      
      <p>So bake that cake on a Wednesday. Celebrate finishing that project at work. Mark the day you both survived a terrible cold. Light a candle for absolutely no reason.</p>
      
      <p>Because life isn't just about the big moments on the calendar. It's about all the beautiful, ordinary, extraordinary days in between. And those days? They deserve cake too.</p>
    `,
    tags: ["Love Story", "Inspiration", "Relationships"]
  },
  {
    id: 6,
    title: "Troubleshooting Common Baking Problems",
    slug: "troubleshooting-baking-problems",
    excerpt: "Cake didn't rise? Too dense? Dry? Here's how to fix the most common baking issues and ensure success every time.",
    category: "Baking Tips",
    author: "Mila",
    date: "2024-10-15",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop",
    content: `
      <p>Even experienced bakers run into problems. Here's your guide to diagnosing and fixing common baking issues.</p>
      
      <h2>Problem: Cake Didn't Rise</h2>
      <p><strong>Possible causes:</strong></p>
      <ul>
        <li>Old baking powder or baking soda (check expiration dates!)</li>
        <li>Oven temperature too low</li>
        <li>Opening the oven door too early</li>
        <li>Not enough leavening agent</li>
      </ul>
      <p><strong>Solution:</strong> Always use fresh leavening agents, invest in an oven thermometer, and resist peeking until at least 2/3 through baking time.</p>
      
      <h2>Problem: Dense, Heavy Cake</h2>
      <p><strong>Possible causes:</strong></p>
      <ul>
        <li>Overmixing the batter</li>
        <li>Too much flour (measure by weight or spoon-and-level method)</li>
        <li>Not enough leavening</li>
        <li>Ingredients too cold</li>
      </ul>
      <p><strong>Solution:</strong> Mix just until combined, measure flour accurately, and use room temperature ingredients.</p>
      
      <h2>Problem: Dry Cake</h2>
      <p><strong>Possible causes:</strong></p>
      <ul>
        <li>Overbaking</li>
        <li>Too much flour</li>
        <li>Not enough fat or liquid</li>
        <li>Oven temperature too high</li>
      </ul>
      <p><strong>Solution:</strong> Start checking for doneness 5 minutes before the recipe suggests. Remember, a few moist crumbs on the toothpick is perfect!</p>
      
      <h2>Problem: Cake Stuck to Pan</h2>
      <p><strong>Possible causes:</strong></p>
      <ul>
        <li>Inadequate greasing</li>
        <li>Didn't line pan with parchment</li>
        <li>Removed from pan too soon</li>
      </ul>
      <p><strong>Solution:</strong> Grease pan, line bottom with parchment, grease again. Let cool 10 minutes before removing.</p>
      
      <h2>Problem: Sunken Center</h2>
      <p><strong>Possible causes:</strong></p>
      <ul>
        <li>Opening oven door too early</li>
        <li>Too much leavening agent</li>
        <li>Underbaking</li>
        <li>Incorrect oven temperature</li>
      </ul>
      <p><strong>Solution:</strong> Don't open the oven until cake is almost done, verify oven temperature with thermometer, bake until fully set.</p>
      
      <h2>Problem: Cracked Top</h2>
      <p><strong>Possible causes:</strong></p>
      <ul>
        <li>Oven too hot</li>
        <li>Pan too small</li>
        <li>Too much leavening</li>
      </ul>
      <p><strong>Solution:</strong> Use correct pan size, check oven temperature, measure leavening accurately. Note: Some cracking is normal and can be covered with frosting!</p>
      
      <h2>Pro Tips for Success</h2>
      <p>Keep a baking journal. Note what worked, what didn't, and any adjustments you made. Every oven is different, and over time you'll learn how yours bakes.</p>
      
      <p>Remember: Baking is both science and art. If a cake doesn't turn out perfectly, it's still edible and made with love. Some of our favorite memories come from "imperfect" cakes!</p>
    `,
    tags: ["Baking Tips", "Troubleshooting", "Tutorial"]
  }
];


