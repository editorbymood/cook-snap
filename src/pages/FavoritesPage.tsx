import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useUser } from "@/contexts/UserContext";
import { searchRecipes } from "@/lib/recipe-service";
import { Recipe } from "@/types";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";

const FavoritesPage = () => {
  const { user, isFavorite } = useUser();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const recipes = await searchRecipes("");
        const favorites = recipes.filter(recipe => 
          user.favorites.includes(recipe.id)
        );
        setFavoriteRecipes(favorites);
      } catch (error: unknown) {
        console.error("Error fetching favorite recipes:", error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFavorites();
  }, [user]);
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view and manage your favorite recipes.
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Favorite Recipes</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : favoriteRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground mb-4">You haven't saved any recipes yet</p>
              <Button asChild>
                <Link to="/recipes">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Recipes
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;
