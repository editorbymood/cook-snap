
import { Clock, Users } from "lucide-react";
import { Recipe } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden">
          {recipe.image ? (
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="h-full w-full recipe-image-placeholder bg-muted"></div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{recipe.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1 mb-3">{recipe.description}</p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{parseInt(recipe.cookTime) + parseInt(recipe.prepTime)} mins</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
