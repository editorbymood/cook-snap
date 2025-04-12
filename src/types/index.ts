
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
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

export interface RecognitionResult {
  foodName: string;
  confidence: number;
  possibleAlternatives?: string[];
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
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}
