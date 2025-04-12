
import React, { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterBarProps {
  tags: string[];
  selectedTags: string[];
  onFilterChange: (tags: string[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ tags, selectedTags, onFilterChange }) => {
  const [localSelectedTags, setLocalSelectedTags] = useState<string[]>(selectedTags);

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
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filter by tags</h3>
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
            
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {tags.map(tag => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={localSelectedTags.includes(tag)}
                    onCheckedChange={() => handleTagToggle(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="cursor-pointer">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end pt-2">
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
