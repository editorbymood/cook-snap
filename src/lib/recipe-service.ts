
import { Recipe } from "@/types";
import { recipeDatabase } from "@/data/recipe-database";
import { searchRecipeByName, searchRecipesByQuery } from "@/lib/utils/recipe-search";

export async function getRecipeByName(foodName: string): Promise<Recipe | null> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const recipe = searchRecipeByName(foodName, recipeDatabase);
      resolve(recipe);
    }, 500);
  });
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const recipes = searchRecipesByQuery(query, recipeDatabase);
      resolve(recipes);
    }, 1000);
  });
}

export async function getRecipesByRegion(region: string): Promise<Recipe[]> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const recipes = Object.values(recipeDatabase).filter(recipe => 
        recipe.tags.some(tag => tag.toLowerCase() === region.toLowerCase())
      );
      resolve(recipes);
    }, 800);
  });
}

export async function getRecipesByCuisine(cuisine: string): Promise<Recipe[]> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const recipes = Object.values(recipeDatabase).filter(recipe => 
        recipe.tags.some(tag => tag.toLowerCase() === cuisine.toLowerCase())
      );
      resolve(recipes);
    }, 800);
  });
}

export function getAllCuisines(): string[] {
  const cuisines = new Set<string>();
  
  Object.values(recipeDatabase).forEach(recipe => {
    recipe.tags.forEach(tag => {
      // Common cuisines and regions
      if (['Indian', 'Italian', 'Chinese', 'Thai', 'Japanese', 'Mexican', 
           'Middle Eastern', 'Greek', 'Spanish', 'French', 'American', 
           'Moroccan', 'Peruvian', 'Polish', 'Russian', 'West African'].includes(tag)) {
        cuisines.add(tag);
      }
    });
  });
  
  return Array.from(cuisines).sort();
}

export function getAllMealTypes(): string[] {
  const mealTypes = new Set<string>();
  
  Object.values(recipeDatabase).forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (['Breakfast', 'Lunch', 'Dinner', 'Appetizer', 'Dessert', 
           'Snack', 'Brunch', 'Side Dish'].includes(tag)) {
        mealTypes.add(tag);
      }
    });
  });
  
  return Array.from(mealTypes).sort();
}

export function getAllDietaryPreferences(): string[] {
  const dietaryPreferences = new Set<string>();
  
  Object.values(recipeDatabase).forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
           'Low-Carb', 'Keto', 'Paleo', 'Healthy'].includes(tag)) {
        dietaryPreferences.add(tag);
      }
    });
  });
  
  return Array.from(dietaryPreferences).sort();
}

export function getRegionalCategories(): Record<string, string[]> {
  return {
    "Asian": ["Indian", "Chinese", "Thai", "Japanese"],
    "European": ["Italian", "French", "Spanish", "Greek", "Polish", "Russian"],
    "Middle Eastern": ["Middle Eastern", "Moroccan"],
    "American": ["American", "Mexican", "Peruvian"],
    "African": ["West African", "Moroccan"]
  };
}
