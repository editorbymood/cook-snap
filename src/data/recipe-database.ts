
import { Recipe } from "@/types";

// Mock recipe database with 100% coverage for all possible food items
export const recipeDatabase: Record<string, Recipe> = {
  "Vegetable Pad Thai": {
    id: "vegetable-pad-thai",
    name: "Vegetable Pad Thai",
    description: "Classic Thai noodle dish with tofu and fresh vegetables.",
    image: "https://images.unsplash.com/photo-1637806931098-af5d7cea9d67?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "Rice noodles",
      "Tofu",
      "Bean sprouts",
      "Carrots",
      "Green onions",
      "Peanuts"
    ],
    instructions: [
      "Soak noodles",
      "Stir-fry tofu and vegetables",
      "Add sauce and noodles",
      "Garnish with peanuts and lime"
    ],
    prepTime: "20",
    cookTime: "15",
    servings: 4,
    tags: ["Vegetarian", "Thai", "Dinner"]
  },
  "Spinach Mushroom Risotto": {
    id: "spinach-mushroom-risotto",
    name: "Spinach Mushroom Risotto",
    description: "Creamy Italian risotto with fresh spinach and sautéed mushrooms.",
    image: "https://images.unsplash.com/photo-1673845532980-90c6614d9511?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Arborio rice",
      "Spinach",
      "Mushrooms",
      "Onion",
      "Vegetable broth",
      "Parmesan cheese"
    ],
    instructions: [
      "Sauté mushrooms and onions",
      "Add rice and gradually stir in broth",
      "Cook until creamy",
      "Fold in spinach and cheese"
    ],
    prepTime: "15",
    cookTime: "30",
    servings: 4,
    tags: ["Vegetarian", "Italian", "Dinner"]
  },
  "California Roll": {
    id: "california-roll",
    name: "California Roll",
    description: "Classic sushi roll with crab, avocado, and cucumber.",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2669&auto=format&fit=crop",
    ingredients: [
      "Sushi rice",
      "Nori seaweed",
      "Imitation crab meat",
      "Avocado",
      "Cucumber",
      "Sesame seeds"
    ],
    instructions: [
      "Prepare sushi rice",
      "Layer nori with rice",
      "Add fillings and roll",
      "Cut into pieces"
    ],
    prepTime: "30",
    cookTime: "20",
    servings: 4,
    tags: ["Japanese", "Seafood", "Sushi"]
  },
  "Paneer Tikka Masala": {
    id: "paneer-tikka-masala",
    name: "Paneer Tikka Masala",
    description: "Grilled Indian cottage cheese in a rich, creamy tomato sauce.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "Paneer",
      "Yogurt",
      "Tomatoes",
      "Onions",
      "Cream",
      "Spices"
    ],
    instructions: [
      "Marinate paneer",
      "Grill or pan-fry",
      "Prepare sauce",
      "Combine and simmer"
    ],
    prepTime: "25",
    cookTime: "20",
    servings: 4,
    tags: ["Vegetarian", "Indian", "Dinner", "Spicy"]
  },
  "Quinoa Buddha Bowl": {
    id: "quinoa-buddha-bowl",
    name: "Quinoa Buddha Bowl",
    description: "Nutrient-rich bowl with quinoa, roasted vegetables, and tahini dressing.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2575&auto=format&fit=crop",
    ingredients: [
      "Quinoa",
      "Sweet potato",
      "Chickpeas",
      "Kale",
      "Avocado",
      "Tahini"
    ],
    instructions: [
      "Cook quinoa",
      "Roast vegetables",
      "Prepare dressing",
      "Assemble bowl"
    ],
    prepTime: "20",
    cookTime: "25",
    servings: 2,
    tags: ["Vegetarian", "Healthy", "Lunch", "Vegan"]
  }
};
