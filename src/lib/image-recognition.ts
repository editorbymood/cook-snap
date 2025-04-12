
import { RecognitionResult } from "@/types";

// This is a mock function that simulates image recognition
// In a real app, this would connect to an ML model or API
export async function recognizeFoodFromImage(imageFile: File): Promise<RecognitionResult> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Mock food recognition result
      // In a real app, this would be the result from an ML model or API
      const foods = [
        { foodName: "Spaghetti Carbonara", confidence: 0.92 },
        { foodName: "Chocolate Chip Cookies", confidence: 0.89 },
        { foodName: "Chicken Curry", confidence: 0.85 },
        { foodName: "Caesar Salad", confidence: 0.88 },
        { foodName: "Beef Stir Fry", confidence: 0.91 },
        { foodName: "Vegetable Lasagna", confidence: 0.87 },
        { foodName: "Apple Pie", confidence: 0.93 },
        { foodName: "Grilled Salmon", confidence: 0.86 }
      ];
      
      // Randomly select a food from the list
      const randomIndex = Math.floor(Math.random() * foods.length);
      const result = foods[randomIndex];
      
      // Generate alternatives by selecting 2 other random foods
      const alternatives = [];
      for (let i = 0; i < 2; i++) {
        let altIndex;
        do {
          altIndex = Math.floor(Math.random() * foods.length);
        } while (altIndex === randomIndex || alternatives.includes(foods[altIndex].foodName));
        
        alternatives.push(foods[altIndex].foodName);
      }
      
      resolve({
        ...result,
        possibleAlternatives: alternatives
      });
    }, 2000); // 2 second delay to simulate processing
  });
}
