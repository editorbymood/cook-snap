
import { Recipe } from "@/types";

export function searchRecipeByName(foodName: string, recipes: Record<string, Recipe>): Recipe | null {
  // First try exact match
  let recipe = recipes[foodName] || null;
  
  // If no exact match, try case-insensitive match
  if (!recipe) {
    const foodNameLower = foodName.toLowerCase();
    for (const [key, value] of Object.entries(recipes)) {
      if (key.toLowerCase() === foodNameLower) {
        recipe = value;
        break;
      }
    }
  }
  
  // If still no match, try partial match
  if (!recipe) {
    const foodNameLower = foodName.toLowerCase();
    for (const [key, value] of Object.entries(recipes)) {
      if (key.toLowerCase().includes(foodNameLower) || 
          foodNameLower.includes(key.toLowerCase())) {
        recipe = value;
        break;
      }
    }
  }
  
  console.log(`Recipe lookup for "${foodName}": ${recipe ? "Found" : "Not found"}`);
  return recipe;
}

export function searchRecipesByQuery(query: string, recipes: Record<string, Recipe>): Recipe[] {
  return Object.values(recipes).filter(recipe => 
    recipe.name.toLowerCase().includes(query.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
}
