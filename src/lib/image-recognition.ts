
import { RecognitionResult } from "@/types";

// Enhanced mock function to simulate more accurate image recognition
// In a real app, this would connect to a more sophisticated ML model or API
export async function recognizeFoodFromImage(imageFile: File): Promise<RecognitionResult> {
  return new Promise((resolve) => {
    // Extract the file name to simulate recognition based on common image names
    const fileName = imageFile.name.toLowerCase();
    
    // Common food terms that might appear in image names for simple "detection"
    const foodTerms = {
      'burger': { foodName: 'Beef Burger', confidence: 0.98 },
      'hamburger': { foodName: 'Beef Burger', confidence: 0.98 },
      'pizza': { foodName: 'Pepperoni Pizza', confidence: 0.98 },
      'pasta': { foodName: 'Spaghetti Carbonara', confidence: 0.97 },
      'cookie': { foodName: 'Chocolate Chip Cookies', confidence: 0.96 },
      'salmon': { foodName: 'Grilled Salmon', confidence: 0.97 },
      'salad': { foodName: 'Caesar Salad', confidence: 0.96 },
      'curry': { foodName: 'Chicken Curry', confidence: 0.95 },
      'stir': { foodName: 'Beef Stir Fry', confidence: 0.94 },
      'fry': { foodName: 'Beef Stir Fry', confidence: 0.94 },
      'lasagna': { foodName: 'Vegetable Lasagna', confidence: 0.96 },
      'pie': { foodName: 'Apple Pie', confidence: 0.97 },
      'cake': { foodName: 'Chocolate Cake', confidence: 0.97 },
      'taco': { foodName: 'Beef Tacos', confidence: 0.95 },
      'sushi': { foodName: 'California Roll', confidence: 0.96 }
    };
    
    // Try to detect food from filename
    let detectedFood = null;
    for (const [term, food] of Object.entries(foodTerms)) {
      if (fileName.includes(term)) {
        detectedFood = food;
        break;
      }
    }
    
    // If no match found from filename, use improved random selection with higher confidence
    if (!detectedFood) {
      // Create a comprehensive list of foods with high confidence scores
      const foods = [
        { foodName: 'Beef Burger', confidence: 0.98 },
        { foodName: 'Pepperoni Pizza', confidence: 0.97 },
        { foodName: 'Spaghetti Carbonara', confidence: 0.97 },
        { foodName: 'Chocolate Chip Cookies', confidence: 0.96 },
        { foodName: 'Chicken Curry', confidence: 0.95 },
        { foodName: 'Caesar Salad', confidence: 0.96 },
        { foodName: 'Beef Stir Fry', confidence: 0.94 },
        { foodName: 'Vegetable Lasagna', confidence: 0.96 },
        { foodName: 'Apple Pie', confidence: 0.97 },
        { foodName: 'Grilled Salmon', confidence: 0.97 },
        { foodName: 'Chocolate Cake', confidence: 0.97 },
        { foodName: 'Beef Tacos', confidence: 0.95 },
        { foodName: 'California Roll', confidence: 0.96 }
      ];
      
      // For the mock app, use a random selection
      const randomIndex = Math.floor(Math.random() * foods.length);
      detectedFood = foods[randomIndex];
    }
    
    // Generate alternatives
    const alternatives = [];
    let potentialAlternatives = Object.values(foodTerms)
      .filter(food => food.foodName !== detectedFood.foodName)
      .map(food => food.foodName);
    
    // Randomly select 2 alternatives
    for (let i = 0; i < 2; i++) {
      if (potentialAlternatives.length > 0) {
        const randIndex = Math.floor(Math.random() * potentialAlternatives.length);
        alternatives.push(potentialAlternatives[randIndex]);
        potentialAlternatives.splice(randIndex, 1);
      }
    }
    
    // Simulate API delay
    setTimeout(() => {
      resolve({
        ...detectedFood,
        possibleAlternatives: alternatives
      });
    }, 1500); // reduced delay for better UX
  });
}
