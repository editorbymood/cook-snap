import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRecipes, getPopularRecipes, getRecommendedRecipes, calculateRecipeDifficulty } from '@/lib/recipe-service';
import { Recipe, SearchFilters, SortOption } from '@/types';
import RecipeCard from '@/components/RecipeCard';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

const RecipesPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'name', direction: 'asc' });
  const [activeTab, setActiveTab] = useState('all');

  const { data: recipes = [], isLoading: isLoadingRecipes, error: recipesError } = useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => searchRecipes(searchQuery),
  });

  const { data: popularRecipes = [], isLoading: isLoadingPopular } = useQuery({
    queryKey: ['popular-recipes'],
    queryFn: () => getPopularRecipes(5),
  });

  const { data: recommendedRecipes = [], isLoading: isLoadingRecommended } = useQuery({
    queryKey: ['recommended-recipes', user?.id],
    queryFn: () => user ? getRecommendedRecipes(user.id, 5) : Promise.resolve([]),
    enabled: !!user,
  });

  const filteredRecipes = React.useMemo(() => {
    let result = [...recipes];

    // Apply filters
    if (filters.cuisine?.length) {
      result = result.filter(recipe => 
        recipe.tags.some(tag => filters.cuisine?.includes(tag))
      );
    }

    if (filters.mealType?.length) {
      result = result.filter(recipe => 
        recipe.tags.some(tag => filters.mealType?.includes(tag))
      );
    }

    if (filters.dietaryPreferences?.length) {
      result = result.filter(recipe => 
        recipe.tags.some(tag => filters.dietaryPreferences?.includes(tag))
      );
    }

    if (filters.difficulty?.length) {
      result = result.filter(recipe => 
        recipe.difficulty && filters.difficulty.includes(recipe.difficulty)
      );
    }

    if (filters.cookingTime) {
      const totalTime = (recipe: Recipe) => 
        parseInt(recipe.cookTime) + parseInt(recipe.prepTime);
      
      if (filters.cookingTime.min !== undefined) {
        result = result.filter(recipe => totalTime(recipe) >= filters.cookingTime!.min!);
      }
      if (filters.cookingTime.max !== undefined) {
        result = result.filter(recipe => totalTime(recipe) <= filters.cookingTime!.max!);
      }
    }

    if (filters.servings) {
      if (filters.servings.min !== undefined) {
        result = result.filter(recipe => recipe.servings >= filters.servings!.min!);
      }
      if (filters.servings.max !== undefined) {
        result = result.filter(recipe => recipe.servings <= filters.servings!.max!);
      }
    }

    // Apply sorting
    result.sort((a, b) => {
      const field = sortOption.field;
      const direction = sortOption.direction === 'asc' ? 1 : -1;

      if (field === 'name') {
        return direction * a.name.localeCompare(b.name);
      }
      if (field === 'cookTime' || field === 'prepTime') {
        return direction * (parseInt(a[field]) - parseInt(b[field]));
      }
      if (field === 'servings') {
        return direction * (a.servings - b.servings);
      }
      if (field === 'difficulty') {
        const difficultyOrder = { easy: 0, medium: 1, hard: 2 };
        const aDiff = a.difficulty ? difficultyOrder[a.difficulty] : -1;
        const bDiff = b.difficulty ? difficultyOrder[b.difficulty] : -1;
        return direction * (aDiff - bDiff);
      }
      return 0;
    });

    return result;
  }, [recipes, filters, sortOption]);

  // Group recipes by vegetarian status
  const groupedRecipes = React.useMemo(() => {
    const vegetarian: Recipe[] = [];
    const nonVegetarian: Recipe[] = [];

    filteredRecipes.forEach(recipe => {
      if (recipe.tags.includes('Vegetarian')) {
        vegetarian.push(recipe);
      } else {
        nonVegetarian.push(recipe);
      }
    });

    return { vegetarian, nonVegetarian };
  }, [filteredRecipes]);

  if (recipesError) {
    toast.error('Failed to load recipes');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Recipes</h1>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar filters={filters} onFiltersChange={setFilters} sortOption={sortOption} onSortChange={setSortOption} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Recipes</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          {user && <TabsTrigger value="recommended">Recommended</TabsTrigger>}
        </TabsList>

        <TabsContent value="all">
          {isLoadingRecipes ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-lg" />
              ))}
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">No recipes found</h2>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-12">
              {groupedRecipes.vegetarian.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Vegetarian Recipes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedRecipes.vegetarian.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </div>
              )}

              {groupedRecipes.nonVegetarian.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Non-Vegetarian Recipes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedRecipes.nonVegetarian.map(recipe => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="popular">
          {isLoadingPopular ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-[400px] rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </TabsContent>

        {user && (
          <TabsContent value="recommended">
            {isLoadingRecommended ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-[400px] rounded-lg" />
                ))}
              </div>
            ) : recommendedRecipes.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-2">No recommendations yet</h2>
                <p className="text-muted-foreground">Rate some recipes to get personalized recommendations</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default RecipesPage;
