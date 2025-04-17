
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import RecipeCarousel from "@/components/RecipeCarousel";
import { Recipe } from "@/types";

const LandingPage = () => {
  const popularRecipes: Recipe[] = [
    {
      id: "beef-burger",
      name: "Beef Burger",
      description: "A juicy homemade beef burger with all the classic toppings.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2670&auto=format&fit=crop",
      ingredients: ["Ground beef", "Burger buns", "Lettuce", "Tomato", "Cheese"],
      instructions: ["Mix and shape the beef patties", "Grill until done", "Assemble the burger"],
      prepTime: "15",
      cookTime: "10",
      servings: 4,
      tags: ["American", "Fast Food", "Dinner"],
      nutritionalInfo: { calories: 520, protein: 25, carbs: 40, fat: 30 }
    },
    {
      id: "california-roll",
      name: "California Roll",
      description: "Classic sushi roll with crab, avocado, and cucumber.",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2669&auto=format&fit=crop",
      ingredients: ["Sushi rice", "Nori", "Imitation crab", "Avocado", "Cucumber"],
      instructions: ["Prepare sushi rice", "Lay out nori and rice", "Add fillings and roll"],
      prepTime: "30",
      cookTime: "20",
      servings: 4,
      tags: ["Japanese", "Seafood", "Sushi"],
      nutritionalInfo: { calories: 255, protein: 10, carbs: 40, fat: 5 }
    },
    {
      id: "caesar-salad",
      name: "Caesar Salad",
      description: "Classic salad with crisp romaine lettuce, croutons, and Caesar dressing.",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2670&auto=format&fit=crop",
      ingredients: ["Romaine lettuce", "Croutons", "Parmesan cheese", "Caesar dressing"],
      instructions: ["Wash and tear lettuce", "Toss with dressing", "Add croutons and cheese"],
      prepTime: "15",
      cookTime: "0",
      servings: 2,
      tags: ["Salad", "Healthy", "Quick"],
      nutritionalInfo: { calories: 320, protein: 8, carbs: 12, fat: 28 }
    },
    {
      id: "spaghetti-carbonara",
      name: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
      image: "https://images.unsplash.com/photo-1600803907087-f56ffa57d4d5?q=80&w=2574&auto=format&fit=crop",
      ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black pepper"],
      instructions: ["Cook pasta", "Fry pancetta", "Mix eggs and cheese", "Combine all ingredients"],
      prepTime: "15",
      cookTime: "15",
      servings: 4,
      tags: ["Italian", "Pasta", "Quick Meals"],
      nutritionalInfo: { calories: 650, protein: 25, carbs: 65, fat: 30 }
    },
    {
      id: "chicken-curry",
      name: "Chicken Curry",
      description: "A flavorful and aromatic curry with tender chicken pieces in a rich sauce.",
      image: "https://images.unsplash.com/photo-1604652013239-3e0237ba661f?q=80&w=2574&auto=format&fit=crop",
      ingredients: ["Chicken thighs", "Curry powder", "Coconut milk", "Onions", "Garlic"],
      instructions: ["Brown the chicken", "Sauté onions and spices", "Add coconut milk", "Simmer until cooked"],
      prepTime: "20",
      cookTime: "30",
      servings: 4,
      tags: ["Indian", "Spicy", "Dinner"],
      nutritionalInfo: { calories: 480, protein: 35, carbs: 15, fat: 28 }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      <section className="py-16 bg-secondary/10">
        <div className="container px-4 mx-auto max-w-6xl">
          <RecipeCarousel
            recipes={popularRecipes}
            title="Popular Recipes"
            description="Discover our most loved recipes that everyone's cooking right now"
          />
        </div>
      </section>
      
      <Features />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
