
import { Recipe } from "@/types";

// Mock recipe database
const recipeDatabase: Record<string, Recipe> = {
  "Spaghetti Carbonara": {
    id: "spaghetti-carbonara",
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    image: "https://images.unsplash.com/photo-1600803907087-f56ffa57d4d5?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale, diced",
      "4 large eggs",
      "100g Pecorino Romano cheese, grated",
      "50g Parmesan cheese, grated",
      "2 cloves garlic, minced (optional)",
      "Freshly ground black pepper",
      "Salt, to taste"
    ],
    instructions: [
      "Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente.",
      "While the pasta is cooking, heat a large pan over medium heat. Add the pancetta and cook until crispy, about 5-7 minutes.",
      "In a bowl, whisk together the eggs, grated cheeses, and a generous amount of black pepper.",
      "When the pasta is done, reserve 1 cup of the pasta water, then drain.",
      "Working quickly, add the hot pasta to the pan with the pancetta. Toss to combine.",
      "Remove the pan from the heat and pour in the egg and cheese mixture, stirring constantly to create a creamy sauce. If needed, add a splash of the reserved pasta water to loosen the sauce.",
      "Serve immediately with additional grated cheese and black pepper on top."
    ],
    prepTime: "15 minutes",
    cookTime: "15 minutes",
    servings: 4,
    tags: ["Italian", "Pasta", "Quick Meals"]
  },
  "Chicken Curry": {
    id: "chicken-curry",
    name: "Chicken Curry",
    description: "A flavorful and aromatic curry with tender chicken pieces in a rich sauce.",
    image: "https://images.unsplash.com/photo-1604652013239-3e0237ba661f?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "800g chicken thighs, cut into chunks",
      "2 onions, finely chopped",
      "3 cloves garlic, minced",
      "1 thumb-sized piece of ginger, grated",
      "2 tbsp curry powder",
      "1 tsp ground turmeric",
      "1 tsp ground cumin",
      "1 tsp ground coriander",
      "1 can (400ml) coconut milk",
      "2 tbsp vegetable oil",
      "1 cinnamon stick",
      "2 cardamom pods",
      "1 tbsp tomato paste",
      "Salt and pepper to taste",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil in a large pan over medium heat. Add cinnamon and cardamom and fry for 30 seconds.",
      "Add onions and cook until soft and translucent, about 5 minutes.",
      "Add garlic and ginger and cook for another 2 minutes.",
      "Add all the ground spices and cook for 1 minute until fragrant.",
      "Add chicken pieces and cook until they start to color, about 5 minutes.",
      "Stir in tomato paste and cook for another minute.",
      "Pour in coconut milk, bring to a simmer, then reduce heat and cook for 15-20 minutes until chicken is cooked through and sauce has thickened.",
      "Season with salt and pepper to taste.",
      "Garnish with fresh coriander leaves and serve with rice."
    ],
    prepTime: "20 minutes",
    cookTime: "30 minutes",
    servings: 4,
    tags: ["Indian", "Spicy", "Dinner"]
  },
  "Caesar Salad": {
    id: "caesar-salad",
    name: "Caesar Salad",
    description: "A classic salad with crisp romaine lettuce, garlic croutons, and a creamy dressing.",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "2 heads romaine lettuce, chopped",
      "1 cup croutons",
      "1/2 cup Parmesan cheese, grated",
      "2 cloves garlic, minced",
      "1 tsp Dijon mustard",
      "2 anchovy fillets, mashed (optional)",
      "1 large egg yolk",
      "2 tbsp lemon juice",
      "1/3 cup olive oil",
      "Salt and black pepper to taste"
    ],
    instructions: [
      "For the dressing, combine garlic, anchovies (if using), egg yolk, Dijon, and lemon juice in a bowl.",
      "Slowly whisk in olive oil until the dressing is creamy and emulsified. Season with salt and pepper.",
      "In a large salad bowl, toss the romaine lettuce with the dressing until well coated.",
      "Add the croutons and grated Parmesan cheese, toss lightly.",
      "Serve immediately with additional Parmesan cheese on top."
    ],
    prepTime: "15 minutes",
    cookTime: "0 minutes",
    servings: 4,
    tags: ["Salad", "Healthy", "Quick"]
  },
  "Chocolate Chip Cookies": {
    id: "chocolate-chip-cookies",
    name: "Chocolate Chip Cookies",
    description: "Classic homemade cookies with chocolate chips, perfect for a sweet treat.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=2564&auto=format&fit=crop",
    ingredients: [
      "250g all-purpose flour",
      "1/2 tsp baking soda",
      "1/2 tsp salt",
      "170g unsalted butter, melted",
      "200g brown sugar",
      "100g white sugar",
      "1 tbsp vanilla extract",
      "1 egg",
      "1 egg yolk",
      "300g chocolate chips"
    ],
    instructions: [
      "Preheat oven to 325°F (165°C). Line baking sheets with parchment paper.",
      "In a medium bowl, whisk together the flour, baking soda, and salt.",
      "In a large bowl, beat together the melted butter, brown sugar, and white sugar until well blended.",
      "Beat in the vanilla, egg, and egg yolk until light and creamy.",
      "Stir in the flour mixture until just combined. Fold in the chocolate chips.",
      "Drop cookie dough by large spoonfuls onto the prepared baking sheets. Keep cookies about 2 inches apart.",
      "Bake for 15-17 minutes, or until the edges are lightly toasted.",
      "Cool on baking sheets for a few minutes before transferring to wire racks to cool completely."
    ],
    prepTime: "20 minutes",
    cookTime: "15 minutes",
    servings: 24,
    tags: ["Dessert", "Baking", "Snack"]
  },
  "Beef Stir Fry": {
    id: "beef-stir-fry",
    name: "Beef Stir Fry",
    description: "A quick and flavorful stir fry with tender beef strips and colorful vegetables.",
    image: "https://images.unsplash.com/photo-1569058634581-cb826bf1c2b5?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "500g beef sirloin, thinly sliced",
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "1 onion, sliced",
      "2 carrots, julienned",
      "2 cloves garlic, minced",
      "1 thumb-sized piece ginger, grated",
      "3 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp sesame oil",
      "1 tbsp vegetable oil",
      "1 tsp cornstarch mixed with 2 tbsp water",
      "Green onions for garnish"
    ],
    instructions: [
      "In a bowl, mix soy sauce, oyster sauce, and sesame oil. Add beef slices and marinate for 15 minutes.",
      "Heat vegetable oil in a wok or large frying pan over high heat.",
      "Add garlic and ginger, stir-fry for 30 seconds until fragrant.",
      "Add beef and stir-fry for 2-3 minutes until browned.",
      "Add all vegetables and stir-fry for another 3-4 minutes until crisp-tender.",
      "Pour in the cornstarch slurry and cook for 1 minute until sauce thickens.",
      "Garnish with green onions and serve hot with rice."
    ],
    prepTime: "20 minutes",
    cookTime: "10 minutes",
    servings: 4,
    tags: ["Asian", "Quick Meals", "Dinner"]
  },
  "Vegetable Lasagna": {
    id: "vegetable-lasagna",
    name: "Vegetable Lasagna",
    description: "A hearty vegetarian lasagna loaded with fresh vegetables and creamy cheese.",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=2535&auto=format&fit=crop",
    ingredients: [
      "9 lasagna noodles",
      "2 zucchini, diced",
      "1 bell pepper, diced",
      "1 onion, chopped",
      "2 cups fresh spinach",
      "3 cloves garlic, minced",
      "2 cups ricotta cheese",
      "2 cups shredded mozzarella cheese",
      "1/2 cup grated Parmesan cheese",
      "1 egg",
      "2 cups marinara sauce",
      "2 tbsp olive oil",
      "1 tsp dried basil",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Cook lasagna noodles according to package directions. Drain and set aside.",
      "Heat olive oil in a large pan over medium heat. Add onion and garlic, cook until soft.",
      "Add zucchini and bell pepper, cook for 5 minutes. Add spinach and cook until wilted.",
      "In a bowl, mix ricotta cheese, egg, half of the mozzarella, and seasonings.",
      "In a 9x13 inch baking dish, spread a thin layer of marinara sauce.",
      "Layer 3 lasagna noodles, 1/3 of the ricotta mixture, 1/3 of the vegetables, and 1/3 of the remaining sauce.",
      "Repeat layers twice more, ending with sauce. Top with remaining mozzarella and Parmesan.",
      "Cover with foil and bake for 25 minutes. Remove foil and bake for another 15 minutes until bubbly and golden.",
      "Let stand for 10 minutes before serving."
    ],
    prepTime: "30 minutes",
    cookTime: "40 minutes",
    servings: 8,
    tags: ["Italian", "Vegetarian", "Baking"]
  },
  "Apple Pie": {
    id: "apple-pie",
    name: "Apple Pie",
    description: "A classic American dessert with a flaky crust and sweet cinnamon apple filling.",
    image: "https://images.unsplash.com/photo-1621743478914-cc8a68d76208?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "For the crust:",
      "2 1/2 cups all-purpose flour",
      "1 tsp salt",
      "1 tbsp sugar",
      "1 cup cold unsalted butter, cubed",
      "1/4 to 1/2 cup ice water",
      "For the filling:",
      "6-7 large apples, peeled, cored and sliced",
      "3/4 cup sugar",
      "2 tbsp all-purpose flour",
      "1 tsp cinnamon",
      "1/4 tsp nutmeg",
      "1/4 tsp salt",
      "1 tbsp lemon juice",
      "1 egg (for egg wash)",
      "1 tbsp sugar (for sprinkling)"
    ],
    instructions: [
      "For the crust: In a large bowl, mix flour, salt, and sugar. Cut in butter until mixture resembles coarse crumbs.",
      "Gradually add ice water, stirring until dough forms a ball. Divide in half, wrap in plastic, and refrigerate for at least 1 hour.",
      "Preheat oven to 425°F (220°C).",
      "For the filling: In a large bowl, toss apples with sugar, flour, cinnamon, nutmeg, salt, and lemon juice.",
      "Roll out one half of the dough on a floured surface and place in a 9-inch pie dish.",
      "Fill with apple mixture and dot with small pieces of butter.",
      "Roll out the remaining dough and place over filling. Trim, seal, and flute the edges.",
      "Cut slits in the top crust, brush with beaten egg, and sprinkle with sugar.",
      "Bake for 45-50 minutes until crust is golden and filling is bubbly.",
      "Cool on a wire rack before serving."
    ],
    prepTime: "40 minutes",
    cookTime: "50 minutes",
    servings: 8,
    tags: ["Dessert", "Baking", "American"]
  },
  "Grilled Salmon": {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    description: "Tender, flaky salmon fillets seasoned and grilled to perfection.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "4 salmon fillets (about 6 oz each)",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 tbsp lemon juice",
      "1 tsp lemon zest",
      "1 tsp dried dill",
      "1/2 tsp paprika",
      "Salt and pepper to taste",
      "Lemon wedges for serving"
    ],
    instructions: [
      "Preheat grill to medium-high heat (about 375°F to 400°F).",
      "In a small bowl, mix olive oil, garlic, lemon juice, lemon zest, dill, paprika, salt, and pepper.",
      "Pat salmon fillets dry with paper towels and place on a plate.",
      "Brush the marinade on both sides of the salmon fillets.",
      "Oil the grill grates well to prevent sticking.",
      "Place salmon on the grill, skin-side down if skin is still on.",
      "Grill for 4-6 minutes per side, or until the salmon flakes easily with a fork.",
      "Remove from grill and let rest for a few minutes.",
      "Serve with lemon wedges and your favorite sides."
    ],
    prepTime: "10 minutes",
    cookTime: "10 minutes",
    servings: 4,
    tags: ["Seafood", "Healthy", "Quick Meals"]
  }
};

export async function getRecipeByName(foodName: string): Promise<Recipe | null> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const recipe = recipeDatabase[foodName] || null;
      resolve(recipe);
    }, 1000); // 1 second delay to simulate API call
  });
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const recipes = Object.values(recipeDatabase).filter(recipe => 
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      resolve(recipes);
    }, 1000);
  });
}
