import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecipeById } from '@/lib/recipe-service';
import { Clock, Users, ChevronLeft, Timer, Heart, ShoppingCart, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/contexts/UserContext';
import ShareButton from '@/components/ShareButton';
import NutritionalInfo from '@/components/NutritionalInfo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MealType } from '@/types';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [selectedMealType, setSelectedMealType] = React.useState<MealType>('dinner');
  const { toggleFavorite, isFavorite, addToShoppingList, addToMealPlan } = useUser();

  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id!),
    enabled: !!id,
  });

  if (error) {
    toast.error('Failed to load recipe');
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-[400px] w-full rounded-lg mb-8" />
          <Skeleton className="h-12 w-1/2 mb-4" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-8 w-1/3 mb-4" />
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full mb-2" />
              ))}
            </div>
            <div>
              <Skeleton className="h-8 w-1/3 mb-4" />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full mb-2" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Recipe Not Found</h2>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the recipe you're looking for.
          </p>
          <Button asChild>
            <Link to="/recipes">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Recipes
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    toggleFavorite(recipe.id);
    const message = isFavorite(recipe.id) 
      ? "Removed from favorites" 
      : "Added to favorites";
    toast.success(message);
  };

  const handleAddToShoppingList = () => {
    addToShoppingList(recipe.ingredients, recipe.id);
    toast.success("Ingredients added to shopping list");
  };

  const handleAddToMealPlan = () => {
    if (!selectedDate) return;
    
    const dateString = selectedDate.toISOString().split('T')[0];
    addToMealPlan(recipe.id, dateString, selectedMealType);
    toast.success(`Added to meal plan for ${selectedDate.toLocaleDateString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" asChild className="mb-6">
          <Link to="/recipes">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Recipes
          </Link>
        </Button>

        {recipe.image && (
          <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{recipe.name}</h1>
            <p className="text-muted-foreground">{recipe.description}</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={isFavorite(recipe.id) ? "default" : "outline"}
              size="icon"
              onClick={handleFavoriteToggle}
            >
              <Heart className={`h-5 w-5 ${isFavorite(recipe.id) ? "fill-current" : ""}`} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleAddToShoppingList}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <CalendarPlus className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add to Meal Plan</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  <Select
                    value={selectedMealType}
                    onValueChange={(value) => setSelectedMealType(value as MealType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                        <SelectItem value="dinner">Dinner</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddToMealPlan} className="w-full">
                    Add to Meal Plan
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <ShareButton title={recipe.name} />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-muted-foreground" />
            <span>Prep: {recipe.prepTime} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span>Cook: {recipe.cookTime} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span>Serves: {recipe.servings}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {recipe.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="font-medium text-muted-foreground">
                    {index + 1}.
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {recipe.nutritionalInfo && (
          <>
            <Separator className="my-8" />
            <NutritionalInfo info={recipe.nutritionalInfo} />
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;
