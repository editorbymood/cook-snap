
export interface Recipe {
  id: string;
  name: string;
  description: string;
  image?: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  tags: string[];
}

export interface RecognitionResult {
  foodName: string;
  confidence: number;
  possibleAlternatives?: string[];
}
