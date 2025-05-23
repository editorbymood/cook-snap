export interface Recipe {
  id: string;
  name: string;
  description: string;
  image?: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  tags: string[];
  nutritionalInfo?: NutritionalInfo;
  difficulty?: 'easy' | 'medium' | 'hard';
  cuisineType?: string;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface RecognitionResult {
  foodName: string;
  confidence: number;
  possibleAlternatives?: string[];
  imageAnalysis?: {
    dominantColors?: string[];
    estimatedPortionSize?: 'small' | 'medium' | 'large';
    detectedIngredients?: string[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
  shoppingList: ShoppingListItem[];
  mealPlan: MealPlanEntry[];
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  recipeId?: string;
}

export interface MealPlanEntry {
  id: string;
  recipeId: string;
  date: string;
  mealType: MealType;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface SearchFilters {
  cuisine?: string[];
  mealType?: string[];
  dietaryPreferences?: string[];
  difficulty?: ('easy' | 'medium' | 'hard')[];
  cookingTime?: {
    min?: number;
    max?: number;
  };
  servings?: {
    min?: number;
    max?: number;
  };
}

export interface SortOption {
  field: 'name' | 'cookTime' | 'prepTime' | 'servings' | 'difficulty';
  direction: 'asc' | 'desc';
}
