import { Recipe } from "@/types";
import { recipeDatabase } from "@/data/recipe-database";
import { searchRecipeByName, searchRecipesByQuery } from "@/lib/utils/recipe-search";

export async function getRecipeById(id: string): Promise<Recipe | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipe = Object.values(recipeDatabase).find(r => r.id === id);
      resolve(recipe || null);
    }, 500);
  });
}

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
    "American": ["North American", "Mexican", "Peruvian"],
    "African": ["Moroccan", "West African", "Ethiopian"],
    "Middle Eastern": ["Lebanese", "Turkish", "Persian"]
  };
}

export interface RecipeRating {
  recipeId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface RecipeStats {
  views: number;
  saves: number;
  ratings: RecipeRating[];
  averageRating: number;
}

// In-memory storage for recipe statistics
const recipeStats: Record<string, RecipeStats> = {};

// Initialize stats for all recipes
Object.keys(recipeDatabase).forEach(recipeId => {
  recipeStats[recipeId] = {
    views: 0,
    saves: 0,
    ratings: [],
    averageRating: 0
  };
});

export async function rateRecipe(recipeId: string, userId: string, rating: number, comment?: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = recipeStats[recipeId];
      if (!stats) return;

      // Remove existing rating from the same user
      stats.ratings = stats.ratings.filter(r => r.userId !== userId);
      
      // Add new rating
      stats.ratings.push({
        recipeId,
        userId,
        rating,
        comment,
        createdAt: new Date().toISOString()
      });

      // Calculate new average rating
      stats.averageRating = stats.ratings.reduce((sum, r) => sum + r.rating, 0) / stats.ratings.length;
      
      resolve();
    }, 300);
  });
}

export async function incrementRecipeViews(recipeId: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = recipeStats[recipeId];
      if (stats) {
        stats.views++;
      }
      resolve();
    }, 200);
  });
}

export async function saveRecipe(recipeId: string, userId: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stats = recipeStats[recipeId];
      if (stats) {
        stats.saves++;
      }
      resolve();
    }, 200);
  });
}

export async function getRecipeStats(recipeId: string): Promise<RecipeStats | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recipeStats[recipeId] || null);
    }, 200);
  });
}

export async function getPopularRecipes(limit: number = 5): Promise<Recipe[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const popularRecipes = Object.entries(recipeStats)
        .sort(([, a], [, b]) => (b.views + b.saves) - (a.views + a.saves))
        .slice(0, limit)
        .map(([id]) => recipeDatabase[id])
        .filter(Boolean);
      
      resolve(popularRecipes);
    }, 500);
  });
}

export async function getRecommendedRecipes(userId: string, limit: number = 5): Promise<Recipe[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple recommendation based on user's previous ratings
      const userRatings = Object.values(recipeStats)
        .flatMap(stats => stats.ratings)
        .filter(rating => rating.userId === userId);

      if (userRatings.length === 0) {
        // If no ratings, return popular recipes
        resolve(getPopularRecipes(limit));
        return;
      }

      // Get user's preferred tags based on their ratings
      const preferredTags = new Set<string>();
      userRatings.forEach(rating => {
        const recipe = recipeDatabase[rating.recipeId];
        if (recipe) {
          recipe.tags.forEach(tag => preferredTags.add(tag));
        }
      });

      // Find recipes with matching tags
      const recommendedRecipes = Object.values(recipeDatabase)
        .filter(recipe => recipe.tags.some(tag => preferredTags.has(tag)))
        .sort((a, b) => {
          const aStats = recipeStats[a.id];
          const bStats = recipeStats[b.id];
          return (bStats?.averageRating || 0) - (aStats?.averageRating || 0);
        })
        .slice(0, limit);

      resolve(recommendedRecipes);
    }, 800);
  });
}

export function calculateRecipeDifficulty(recipe: Recipe): 'easy' | 'medium' | 'hard' {
  const totalSteps = recipe.instructions.length;
  const totalIngredients = recipe.ingredients.length;
  const totalTime = parseInt(recipe.prepTime) + parseInt(recipe.cookTime);

  let difficultyScore = 0;

  // Score based on number of steps
  if (totalSteps <= 5) difficultyScore += 1;
  else if (totalSteps <= 10) difficultyScore += 2;
  else difficultyScore += 3;

  // Score based on number of ingredients
  if (totalIngredients <= 5) difficultyScore += 1;
  else if (totalIngredients <= 10) difficultyScore += 2;
  else difficultyScore += 3;

  // Score based on total time
  if (totalTime <= 30) difficultyScore += 1;
  else if (totalTime <= 60) difficultyScore += 2;
  else difficultyScore += 3;

  // Determine difficulty level
  if (difficultyScore <= 4) return 'easy';
  if (difficultyScore <= 7) return 'medium';
  return 'hard';
}
