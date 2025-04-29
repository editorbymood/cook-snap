import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

// Common food items and their recipes
const FOOD_RECIPES = {
  'hamburger': {
    title: 'Classic Hamburger',
    ingredients: [
      '1 lb ground beef',
      '1/4 cup breadcrumbs',
      '1 egg',
      '1 tsp salt',
      '1/2 tsp black pepper',
      '4 hamburger buns',
      'Lettuce, tomato, onion (optional)',
      'Ketchup, mustard, mayonnaise (optional)'
    ],
    instructions: [
      'Mix ground beef, breadcrumbs, egg, salt, and pepper in a bowl',
      'Form into 4 patties',
      'Grill or pan-fry for 4-5 minutes per side',
      'Toast the buns lightly',
      'Assemble with your favorite toppings'
    ]
  },
  'pizza': {
    title: 'Homemade Pizza',
    ingredients: [
      '2 1/4 cups flour',
      '1 tsp yeast',
      '1 tsp salt',
      '1 cup warm water',
      '1 tbsp olive oil',
      '1/2 cup pizza sauce',
      '2 cups shredded mozzarella',
      'Your favorite toppings'
    ],
    instructions: [
      'Mix flour, yeast, and salt',
      'Add water and olive oil, knead into dough',
      'Let rise for 1 hour',
      'Roll out dough and add sauce',
      'Top with cheese and toppings',
      'Bake at 450°F for 12-15 minutes'
    ]
  },
  'salad': {
    title: 'Fresh Garden Salad',
    ingredients: [
      'Mixed greens',
      'Cherry tomatoes',
      'Cucumber',
      'Red onion',
      'Olive oil',
      'Balsamic vinegar',
      'Salt and pepper'
    ],
    instructions: [
      'Wash and chop all vegetables',
      'Combine in a large bowl',
      'Drizzle with olive oil and vinegar',
      'Season with salt and pepper',
      'Toss gently and serve'
    ]
  },
  'pasta': {
    title: 'Classic Spaghetti',
    ingredients: [
      '8 oz spaghetti',
      '2 cups tomato sauce',
      '1/2 lb ground beef',
      '1/4 cup grated parmesan',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Cook pasta according to package',
      'Brown ground beef in a pan',
      'Add tomato sauce and simmer',
      'Combine with pasta and serve'
    ]
  },
  'sushi': {
    title: 'California Roll',
    ingredients: [
      '2 cups sushi rice',
      '2 sheets nori',
      '1/2 avocado',
      '1/2 cucumber',
      '1/2 cup crab meat',
      'Soy sauce and wasabi for serving'
    ],
    instructions: [
      'Cook and season sushi rice',
      'Place nori on bamboo mat',
      'Spread rice evenly',
      'Add fillings and roll tightly',
      'Slice and serve with soy sauce'
    ]
  },
  'curry': {
    title: 'Chicken Curry',
    ingredients: [
      '1 lb chicken breast',
      '2 tbsp curry powder',
      '1 onion',
      '2 cloves garlic',
      '1 can coconut milk',
      '2 cups vegetables',
      'Rice for serving'
    ],
    instructions: [
      'Sauté onions and garlic',
      'Add chicken and brown',
      'Stir in curry powder',
      'Add coconut milk and vegetables',
      'Simmer until chicken is cooked'
    ]
  }
};

// Food recognition aliases for better matching
const FOOD_ALIASES: Record<string, string[]> = {
  'hamburger': ['burger', 'cheeseburger', 'beef burger'],
  'pizza': ['pizza pie', 'pepperoni pizza', 'cheese pizza'],
  'salad': ['garden salad', 'green salad', 'vegetable salad'],
  'pasta': ['spaghetti', 'noodles', 'macaroni'],
  'sushi': ['california roll', 'maki', 'sushi roll'],
  'curry': ['chicken curry', 'indian curry', 'thai curry']
};

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

const CameraRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [predictions, setPredictions] = useState<Array<{ className: string; probability: number }>>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        await tf.ready();
        // Load MobileNet with better configuration for food recognition
        const loadedModel = await mobilenet.load({
          version: 2,
          alpha: 1.0,
          modelUrl: 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v2_1.0_224/model.json'
        });
        setModel(loadedModel);
      } catch (err) {
        setError('Failed to load the AI model. Please try refreshing the page.');
        console.error(err);
      } finally {
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Your browser does not support camera access. Please try a different browser.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      if ((err as Error).name === 'NotAllowedError') {
        setError('Camera access was denied. Please allow camera access in your browser settings.');
      } else if ((err as Error).name === 'NotFoundError') {
        setError('No camera found. Please connect a camera and try again.');
      } else {
        setError('Failed to access camera. Please try again.');
      }
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
      setError(null);
    }
  };

  const getRecipe = (foodName: string) => {
    // Convert prediction to lowercase and remove spaces for matching
    const normalizedName = foodName.toLowerCase().replace(/\s+/g, '');
    
    // First try direct match
    const directMatch = Object.keys(FOOD_RECIPES).find(key => 
      normalizedName.includes(key) || key.includes(normalizedName)
    );

    if (directMatch) {
      return FOOD_RECIPES[directMatch as keyof typeof FOOD_RECIPES];
    }

    // Then try aliases
    for (const [key, aliases] of Object.entries(FOOD_ALIASES)) {
      if (aliases.some(alias => normalizedName.includes(alias.replace(/\s+/g, '')))) {
        return FOOD_RECIPES[key as keyof typeof FOOD_RECIPES];
      }
    }

    return null;
  };

  const captureAndPredict = async () => {
    if (!model || !videoRef.current) return;

    try {
      setIsRecognizing(true);
      setError(null);
      
      // Take multiple predictions and average them
      const predictions = await Promise.all([
        model.classify(videoRef.current),
        model.classify(videoRef.current),
        model.classify(videoRef.current)
      ]);

      // Combine and average predictions
      const combinedPredictions = predictions.flat().reduce((acc, pred) => {
        const existing = acc.find(p => p.className === pred.className);
        if (existing) {
          existing.probability = (existing.probability + pred.probability) / 2;
        } else {
          acc.push({ ...pred });
        }
        return acc;
      }, [] as Array<{ className: string; probability: number }>);

      // Sort by probability and take top 5 for better matching
      const topPredictions = combinedPredictions
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 5);

      setPredictions(topPredictions);

      // Try to find a recipe for any of the top predictions
      for (const prediction of topPredictions) {
        const recipe = getRecipe(prediction.className);
        if (recipe) {
          setRecipe(recipe);
          break;
        }
      }
    } catch (err) {
      setError('Failed to recognize food. Please try again.');
      console.error(err);
    } finally {
      setIsRecognizing(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-4">
      <CardHeader>
        <CardTitle>Food Recognition & Recipe Finder</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="relative aspect-video mb-4 bg-black rounded-lg">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-lg"
          />
          {!isCameraActive && (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              Camera is off
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          <Button 
            onClick={startCamera} 
            disabled={isCameraActive || isModelLoading}
          >
            {isModelLoading ? 'Loading AI Model...' : 'Start Camera'}
          </Button>
          <Button 
            onClick={stopCamera} 
            disabled={!isCameraActive}
            variant="destructive"
          >
            Stop Camera
          </Button>
          <Button 
            onClick={captureAndPredict} 
            disabled={!isCameraActive || !model || isRecognizing}
          >
            {isRecognizing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Recognizing...
              </>
            ) : (
              'Recognize Food'
            )}
          </Button>
        </div>

        {predictions.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Predictions:</h3>
              {predictions.map((prediction, index) => (
                <div key={index} className="flex justify-between">
                  <span>{prediction.className}</span>
                  <span>{(prediction.probability * 100).toFixed(2)}%</span>
                </div>
              ))}
            </div>

            {recipe ? (
              <div className="space-y-4">
                <h3 className="font-semibold">Recipe Suggestion:</h3>
                <div className="space-y-2">
                  <h4 className="font-medium">{recipe.title}</h4>
                  <div>
                    <h5 className="font-medium">Ingredients:</h5>
                    <ul className="list-disc list-inside">
                      {recipe.ingredients.map((ingredient: string, index: number) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">Instructions:</h5>
                    <ol className="list-decimal list-inside">
                      {recipe.instructions.map((instruction: string, index: number) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No recipe available for this food item. Try another food item.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CameraRecognition; 