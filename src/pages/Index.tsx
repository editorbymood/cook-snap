
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ImageUploadNew from "@/components/ImageUploadNew";
import RecognitionResultComponent from "@/components/RecognitionResult";
import { RecognitionResult, Recipe } from "@/types";
import { recognizeFoodFromImage } from "@/lib/image-recognition";
import { getRecipeByName } from "@/lib/recipe-service";
import RecipeCard from "@/components/RecipeCard";
import { toast } from "sonner";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageSelect = async (image: File) => {
    setSelectedImage(image);
    setRecognitionResult(null);
    setRecipe(null);
    
    // Create image preview
    const imageUrl = URL.createObjectURL(image);
    setImagePreview(imageUrl);
    
    // Recognize the food
    setIsRecognizing(true);
    try {
      // Log file name to help debug
      console.log("Processing image:", image.name);
      
      const result = await recognizeFoodFromImage(image);
      console.log("Recognition result:", result);
      setRecognitionResult(result);
      
      // If confidence is very high (over 95%), automatically fetch the recipe
      if (result.confidence > 0.95) {
        toast.info(`High confidence match: ${result.foodName}`);
        handleConfirmResult(result.foodName);
      }
    } catch (error) {
      toast.error("Failed to recognize the food. Please try again.");
      console.error("Recognition error:", error);
    } finally {
      setIsRecognizing(false);
    }
  };
  
  const handleConfirmResult = async (foodName: string) => {
    setIsLoadingRecipe(true);
    try {
      const recipeData = await getRecipeByName(foodName);
      if (recipeData) {
        setRecipe(recipeData);
      } else {
        toast.error(`Sorry, we couldn't find a recipe for ${foodName}.`);
      }
    } catch (error) {
      toast.error("Failed to load the recipe. Please try again.");
      console.error("Recipe loading error:", error);
    } finally {
      setIsLoadingRecipe(false);
    }
  };
  
  const handleRetry = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setRecognitionResult(null);
    setRecipe(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">CookSnap</h1>
            <p className="text-muted-foreground text-lg">
              Take a photo of any food and get the recipe instantly
            </p>
          </div>
          
          <div className="max-w-xl mx-auto mb-10">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {!imagePreview ? (
                <ImageUploadNew onImageSelect={handleImageSelect} />
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Selected food" 
                    className="w-full h-auto object-cover" 
                  />
                  <div className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground">
                      Tip: For best results, use clear images of food items against a simple background.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              {isRecognizing && (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Analyzing your food image...</p>
                </div>
              )}
              
              {recognitionResult && !recipe && (
                <RecognitionResultComponent 
                  result={recognitionResult}
                  onConfirm={handleConfirmResult}
                  onRetry={handleRetry}
                  isLoading={isLoadingRecipe}
                />
              )}
              
              {recipe && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Recipe Found!</h2>
                  <RecipeCard recipe={recipe} />
                  <div className="flex justify-center">
                    <Button asChild>
                      <Link to={`/recipe/${recipe.id}`}>View Full Recipe</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
