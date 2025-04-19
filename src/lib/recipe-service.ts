
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
