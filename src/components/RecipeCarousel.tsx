
import { Recipe } from "@/types";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RecipeCarouselProps {
  recipes: Recipe[];
  title?: string;
  description?: string;
  showViewAll?: boolean;
}

const RecipeCarousel = ({ 
  recipes,
  title,
  description,
  showViewAll = true
}: RecipeCarouselProps) => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      {(title || description) && (
        <div className="text-center mb-8">
          {title && <h2 className="text-3xl font-bold mb-3">{title}</h2>}
          {description && (
            <p className="text-muted-foreground max-w-lg mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="relative">
        <Carousel className="mx-auto max-w-5xl">
          <CarouselContent>
            {recipes.map((recipe, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <div 
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className="h-full"
                >
                  <div className="bg-background rounded-xl overflow-hidden shadow-md h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={recipe.image} 
                        alt={recipe.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {recipe.nutritionalInfo?.calories && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-background/70 backdrop-blur-sm">
                            {recipe.nutritionalInfo.calories} cal
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <h3 className="font-semibold text-white text-lg">{recipe.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Timer className="h-4 w-4" />
                          <span>{parseInt(recipe.prepTime) + parseInt(recipe.cookTime)} mins</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {recipe.tags.slice(0, 2).map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/recipe/${recipe.id}`);
                        }}
                      >
                        View Recipe
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-4 bg-background shadow-md hover:bg-background/90" />
            <CarouselNext className="-right-4 bg-background shadow-md hover:bg-background/90" />
          </div>
        </Carousel>
        
        {showViewAll && (
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => navigate('/recipes')} className="group">
              View All Recipes
              <Timer className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCarousel;
