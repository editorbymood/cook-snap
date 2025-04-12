
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Recipe } from "@/types";
import { getRecipeByName, searchRecipes } from "@/lib/recipe-service";
import { Clock, Users, ChevronLeft, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        // In a real app, you'd get recipe by ID from an API
        // For this mock app, we'll search for recipes and find by ID
        const allRecipes = await searchRecipes("");
        const foundRecipe = allRecipes.find(r => r.id === id);
        
        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          toast.error("Recipe not found");
        }
      } catch (error) {
        toast.error("Failed to load recipe");
        console.error("Error loading recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="h-16 w-16 border-4 border-t-primary rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-muted-foreground">Loading recipe...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find the recipe you're looking for.
            </p>
            <Button asChild>
              <Link to="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {recipe.image && (
          <div className="w-full h-[40vh] relative">
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-8 -mt-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button variant="outline" asChild className="mb-4 bg-background/80 backdrop-blur-sm">
              <Link to="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            
            <div className="bg-background rounded-lg shadow-sm p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.name}</h1>
              <p className="text-muted-foreground mb-6">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="text-sm">Prep Time</p>
                    <p className="font-medium">{recipe.prepTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Timer className="h-5 w-5" />
                  <div>
                    <p className="text-sm">Cook Time</p>
                    <p className="font-medium">{recipe.cookTime}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <div>
                    <p className="text-sm">Servings</p>
                    <p className="font-medium">{recipe.servings}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mt-1.5 mr-2"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Separator className="my-8" />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-medium mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-secondary/30 text-secondary-foreground rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
