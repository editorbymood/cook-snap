
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { searchRecipes } from "@/lib/recipe-service";
import { Recipe } from "@/types";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get search query from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);
  
  // Fetch recipes based on search query
  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await searchRecipes(searchQuery);
        setRecipes(data);
        
        // Extract all unique tags
        const tags = new Set<string>();
        data.forEach(recipe => {
          recipe.tags.forEach(tag => tags.add(tag));
        });
        setAllTags(Array.from(tags).sort());
        
      } catch (error) {
        toast.error("Failed to load recipes");
        console.error("Error loading recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecipes();
  }, [searchQuery]);
  
  // Filter recipes based on selected tags
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe =>
        selectedTags.some(tag => recipe.tags.includes(tag))
      );
      setFilteredRecipes(filtered);
    }
  }, [recipes, selectedTags]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate(query ? `/recipes?q=${encodeURIComponent(query)}` : "/recipes");
  };
  
  const handleFilterChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-3xl font-bold">Recipes</h1>
            <div className="flex-1 max-w-md">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search by name, ingredients, or cuisine..."
              />
            </div>
          </div>
          
          <FilterBar 
            tags={allTags}
            selectedTags={selectedTags}
            onFilterChange={handleFilterChange}
          />
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No recipes found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No recipes found for "${searchQuery}"`
                  : selectedTags.length > 0
                  ? "No recipes match the selected filters"
                  : "No recipes available"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecipesPage;
