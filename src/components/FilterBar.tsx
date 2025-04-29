import React from 'react';
import { SearchFilters, SortOption } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { SlidersHorizontal } from 'lucide-react';
import { getAllCuisines, getAllMealTypes, getAllDietaryPreferences } from '@/lib/recipe-service';

export interface FilterBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  sortOption: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  sortOption,
  onSortChange,
}) => {
  const cuisines = getAllCuisines();
  const mealTypes = getAllMealTypes();
  const dietaryPreferences = getAllDietaryPreferences();

  const handleCuisineChange = (cuisine: string) => {
    const newCuisines = filters.cuisine?.includes(cuisine)
      ? filters.cuisine.filter(c => c !== cuisine)
      : [...(filters.cuisine || []), cuisine];
    
    onFiltersChange({
      ...filters,
      cuisine: newCuisines.length > 0 ? newCuisines : undefined,
    });
  };

  const handleMealTypeChange = (mealType: string) => {
    const newMealTypes = filters.mealType?.includes(mealType)
      ? filters.mealType.filter(t => t !== mealType)
      : [...(filters.mealType || []), mealType];
    
    onFiltersChange({
      ...filters,
      mealType: newMealTypes.length > 0 ? newMealTypes : undefined,
    });
  };

  const handleDietaryPreferenceChange = (preference: string) => {
    const newPreferences = filters.dietaryPreferences?.includes(preference)
      ? filters.dietaryPreferences.filter(p => p !== preference)
      : [...(filters.dietaryPreferences || []), preference];
    
    onFiltersChange({
      ...filters,
      dietaryPreferences: newPreferences.length > 0 ? newPreferences : undefined,
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    const newDifficulties = filters.difficulty?.includes(difficulty as any)
      ? filters.difficulty.filter(d => d !== difficulty)
      : [...(filters.difficulty || []), difficulty as any];
    
    onFiltersChange({
      ...filters,
      difficulty: newDifficulties.length > 0 ? newDifficulties : undefined,
    });
  };

  const handleCookingTimeChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      cookingTime: {
        min: value[0],
        max: value[1],
      },
    });
  };

  const handleServingsChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      servings: {
        min: value[0],
        max: value[1],
      },
    });
  };

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split('-');
    onSortChange({
      field: field as SortOption['field'],
      direction: direction as 'asc' | 'desc',
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.cuisine?.length) count += filters.cuisine.length;
    if (filters.mealType?.length) count += filters.mealType.length;
    if (filters.dietaryPreferences?.length) count += filters.dietaryPreferences.length;
    if (filters.difficulty?.length) count += filters.difficulty.length;
    if (filters.cookingTime) count++;
    if (filters.servings) count++;
    return count;
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-1">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Refine your recipe search with filters
            </SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Cuisine</h3>
              <div className="flex flex-wrap gap-2">
                {cuisines.map(cuisine => (
                  <Badge
                    key={cuisine}
                    variant={filters.cuisine?.includes(cuisine) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleCuisineChange(cuisine)}
                  >
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Meal Type</h3>
              <div className="flex flex-wrap gap-2">
                {mealTypes.map(type => (
                  <Badge
                    key={type}
                    variant={filters.mealType?.includes(type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleMealTypeChange(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Dietary Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {dietaryPreferences.map(preference => (
                  <Badge
                    key={preference}
                    variant={filters.dietaryPreferences?.includes(preference) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleDietaryPreferenceChange(preference)}
                  >
                    {preference}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Difficulty</h3>
              <div className="flex flex-wrap gap-2">
                {['easy', 'medium', 'hard'].map(difficulty => (
                  <Badge
                    key={difficulty}
                    variant={filters.difficulty?.includes(difficulty as any) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleDifficultyChange(difficulty)}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Total Cooking Time (minutes)</h3>
              <Slider
                min={0}
                max={180}
                step={15}
                value={[
                  filters.cookingTime?.min || 0,
                  filters.cookingTime?.max || 180,
                ]}
                onValueChange={handleCookingTimeChange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{filters.cookingTime?.min || 0} mins</span>
                <span>{filters.cookingTime?.max || 180} mins</span>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Servings</h3>
              <Slider
                min={1}
                max={12}
                step={1}
                value={[
                  filters.servings?.min || 1,
                  filters.servings?.max || 12,
                ]}
                onValueChange={handleServingsChange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{filters.servings?.min || 1} servings</span>
                <span>{filters.servings?.max || 12} servings</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Select
        value={`${sortOption.field}-${sortOption.direction}`}
        onValueChange={handleSortChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="cookTime-asc">Cooking Time (Low to High)</SelectItem>
            <SelectItem value="cookTime-desc">Cooking Time (High to Low)</SelectItem>
            <SelectItem value="servings-asc">Servings (Low to High)</SelectItem>
            <SelectItem value="servings-desc">Servings (High to Low)</SelectItem>
            <SelectItem value="difficulty-asc">Difficulty (Easy to Hard)</SelectItem>
            <SelectItem value="difficulty-desc">Difficulty (Hard to Easy)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
