
import { useState } from "react";
import Header from "@/components/Header";
import { useUser } from "@/contexts/UserContext";
import { searchRecipes } from "@/lib/recipe-service";
import { Recipe, MealPlanEntry } from "@/types";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const MealPlanPage = () => {
  const { user, removeFromMealPlan } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [recipes, setRecipes] = useState<Record<string, Recipe>>({});
  const [mealsByDate, setMealsByDate] = useState<Record<string, MealPlanEntry[]>>({});
  
  // Fetch all recipes to display in meal plan
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const allRecipes = await searchRecipes("");
        const recipesMap: Record<string, Recipe> = {};
        allRecipes.forEach(recipe => {
          recipesMap[recipe.id] = recipe;
        });
        setRecipes(recipesMap);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    
    fetchRecipes();
  }, []);
  
  // Organize meals by date
  useEffect(() => {
    if (user) {
      const mealsByDateMap: Record<string, MealPlanEntry[]> = {};
      
      user.mealPlan.forEach(entry => {
        if (!mealsByDateMap[entry.date]) {
          mealsByDateMap[entry.date] = [];
        }
        mealsByDateMap[entry.date].push(entry);
      });
      
      setMealsByDate(mealsByDateMap);
    }
  }, [user]);
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view and manage your meal plan.
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const selectedDateStr = selectedDate?.toISOString().split('T')[0];
  const mealsForSelectedDate = selectedDateStr ? mealsByDate[selectedDateStr] || [] : [];
  
  const handleRemoveFromMealPlan = (entryId: string) => {
    removeFromMealPlan(entryId);
    toast.success("Removed from meal plan");
  };
  
  // Return recipes that are not already in the meal plan for the selected date
  const getAvailableRecipesForDate = () => {
    const alreadyPlannedIds = new Set(
      mealsForSelectedDate.map(entry => entry.recipeId)
    );
    
    return Object.values(recipes).filter(
      recipe => !alreadyPlannedIds.has(recipe.id)
    );
  };
  
  // Get the meal type label
  const getMealTypeLabel = (type: MealPlanEntry['mealType']) => {
    switch (type) {
      case 'breakfast': return 'Breakfast';
      case 'lunch': return 'Lunch';
      case 'dinner': return 'Dinner';
      case 'snack': return 'Snack';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Meal Plan</h1>
          
          <div className="grid md:grid-cols-7 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiersClassNames={{
                      selected: "bg-primary text-primary-foreground"
                    }}
                    modifiers={{
                      booked: Object.keys(mealsByDate).map(date => new Date(date))
                    }}
                    modifiersStyles={{
                      booked: {
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(var(--primary), 0.1)',
                        borderRadius: '0'
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-4">
              <h2 className="text-xl font-semibold mb-4">
                {selectedDate
                  ? `Meals for ${selectedDate.toLocaleDateString()}`
                  : "Select a date to view meals"}
              </h2>
              
              {mealsForSelectedDate.length > 0 ? (
                <div className="space-y-6">
                  {['breakfast', 'lunch', 'dinner', 'snack'].map(mealType => {
                    const mealsOfType = mealsForSelectedDate.filter(
                      meal => meal.mealType === mealType
                    );
                    
                    if (mealsOfType.length === 0) return null;
                    
                    return (
                      <div key={mealType} className="space-y-3">
                        <h3 className="text-lg font-medium">
                          {getMealTypeLabel(mealType as MealPlanEntry['mealType'])}
                        </h3>
                        
                        <div className="grid gap-3">
                          {mealsOfType.map(meal => {
                            const recipe = recipes[meal.recipeId];
                            if (!recipe) return null;
                            
                            return (
                              <Card key={meal.id} className="overflow-hidden">
                                <div className="flex">
                                  {recipe.image && (
                                    <div className="w-24 h-24 shrink-0">
                                      <img
                                        src={recipe.image}
                                        alt={recipe.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  
                                  <CardContent className="flex-1 p-3 flex justify-between items-center">
                                    <div>
                                      <h4 className="font-medium">{recipe.name}</h4>
                                      <p className="text-sm text-muted-foreground line-clamp-1">
                                        {recipe.description}
                                      </p>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive"
                                        onClick={() => handleRemoveFromMealPlan(meal.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                      
                                      <Button variant="outline" size="sm" asChild>
                                        <Link to={`/recipe/${recipe.id}`}>View</Link>
                                      </Button>
                                    </div>
                                  </CardContent>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : selectedDate ? (
                <div className="text-center py-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground mb-4">No meals planned for this date</p>
                  <Button asChild>
                    <Link to="/recipes">
                      <Plus className="h-4 w-4 mr-2" />
                      Browse Recipes
                    </Link>
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MealPlanPage;
