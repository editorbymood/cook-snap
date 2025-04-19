
import React, { useState, useEffect } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCuisines, getAllMealTypes, getAllDietaryPreferences, getRegionalCategories } from "@/lib/recipe-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  tags: string[];
  selectedTags: string[];
  onFilterChange: (tags: string[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ tags, selectedTags, onFilterChange }) => {
  const [localSelectedTags, setLocalSelectedTags] = useState<string[]>(selectedTags);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [mealTypes, setMealTypes] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [regions, setRegions] = useState<Record<string, string[]>>({});
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  
  // Load all filter categories on mount
  useEffect(() => {
    setCuisines(getAllCuisines());
    setMealTypes(getAllMealTypes());
    setDietaryPreferences(getAllDietaryPreferences());
    setRegions(getRegionalCategories());
  }, []);

  const handleTagToggle = (tag: string) => {
    setLocalSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const applyFilters = () => {
    onFilterChange(localSelectedTags);
  };

  const clearFilters = () => {
    setLocalSelectedTags([]);
    onFilterChange([]);
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
  };

  const getRegionalCuisines = () => {
    return selectedRegion ? regions[selectedRegion] || [] : [];
  };

  return (
    <div className="flex items-center flex-wrap gap-2 py-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {selectedTags.length > 0 && (
              <Badge variant="secondary">{selectedTags.length}</Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filters</h3>
              {localSelectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              )}
            </div>
            
            <Tabs defaultValue="cuisine" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="cuisine">Cuisine</TabsTrigger>
                <TabsTrigger value="meal">Meal Type</TabsTrigger>
                <TabsTrigger value="dietary">Dietary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cuisine" className="pt-2">
                <div className="mb-4">
                  <Select value={selectedRegion} onValueChange={handleRegionChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Regions</SelectItem>
                      {Object.keys(regions).map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {(selectedRegion ? getRegionalCuisines() : cuisines).map(cuisine => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cuisine-${cuisine}`}
                        checked={localSelectedTags.includes(cuisine)}
                        onCheckedChange={() => handleTagToggle(cuisine)}
                      />
                      <Label htmlFor={`cuisine-${cuisine}`} className="cursor-pointer">
                        {cuisine}
                      </Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="meal" className="pt-2">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {mealTypes.map(mealType => (
                    <div key={mealType} className="flex items-center space-x-2">
                      <Checkbox
                        id={`meal-${mealType}`}
                        checked={localSelectedTags.includes(mealType)}
                        onCheckedChange={() => handleTagToggle(mealType)}
                      />
                      <Label htmlFor={`meal-${mealType}`} className="cursor-pointer">
                        {mealType}
                      </Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="dietary" className="pt-2">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {dietaryPreferences.map(diet => (
                    <div key={diet} className="flex items-center space-x-2">
                      <Checkbox
                        id={`diet-${diet}`}
                        checked={localSelectedTags.includes(diet)}
                        onCheckedChange={() => handleTagToggle(diet)}
                      />
                      <Label htmlFor={`diet-${diet}`} className="cursor-pointer">
                        {diet}
                      </Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-2 pt-2 border-t">
              <Button variant="outline" onClick={() => setLocalSelectedTags(selectedTags)}>
                Reset
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1 items-center">
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newTags = selectedTags.filter(t => t !== tag);
                  onFilterChange(newTags);
                  setLocalSelectedTags(newTags);
                }}
              />
            </Badge>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
