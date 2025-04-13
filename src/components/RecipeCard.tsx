
import { Clock, Users, Heart } from "lucide-react";
import { Recipe } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { Badge } from "@/components/ui/badge";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { toggleFavorite, isFavorite } = useUser();
  const favorite = isFavorite(recipe.id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    toggleFavorite(recipe.id);
  };

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
        <div className="aspect-video w-full overflow-hidden relative">
          {recipe.image ? (
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="h-full w-full recipe-image-placeholder bg-muted"></div>
          )}
          
          <Button
            variant={favorite ? "default" : "outline"}
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full transition-all duration-300 ${
              favorite ? "bg-primary text-primary-foreground" : "bg-background/60 backdrop-blur-sm hover:bg-background/80"
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 transition-all duration-300 ${favorite ? "fill-current scale-110" : "scale-100"}`} />
          </Button>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1 transition-colors duration-300 group-hover:text-primary">{recipe.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1 mb-3">{recipe.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs transition-all duration-300 hover:bg-secondary">
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.tags.length - 3}
              </Badge>
            )}
          </div>
          
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
