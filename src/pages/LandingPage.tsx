
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Testimonials from "@/components/landing/Testimonials";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import RecipeCarousel from "@/components/RecipeCarousel";

const LandingPage = () => {
  const popularRecipes = [
    {
      id: "beef-burger",
      name: "Beef Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2670&auto=format&fit=crop",
      nutritionalInfo: { calories: 520 },
      prepTime: "15",
      cookTime: "10",
      tags: ["American", "Fast Food", "Dinner"]
    },
    {
      id: "california-roll",
      name: "California Roll",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2669&auto=format&fit=crop",
      nutritionalInfo: { calories: 255 },
      prepTime: "30",
      cookTime: "20",
      tags: ["Japanese", "Seafood", "Sushi"]
    },
    {
      id: "caesar-salad",
      name: "Caesar Salad",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2670&auto=format&fit=crop",
      nutritionalInfo: { calories: 320 },
      prepTime: "15",
      cookTime: "0",
      tags: ["Salad", "Healthy", "Quick"]
    },
    {
      id: "spaghetti-carbonara",
      name: "Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1600803907087-f56ffa57d4d5?q=80&w=2574&auto=format&fit=crop",
      nutritionalInfo: { calories: 650 },
      prepTime: "15",
      cookTime: "15",
      tags: ["Italian", "Pasta", "Quick Meals"]
    },
    {
      id: "chicken-curry",
      name: "Chicken Curry",
      image: "https://images.unsplash.com/photo-1604652013239-3e0237ba661f?q=80&w=2574&auto=format&fit=crop",
      nutritionalInfo: { calories: 480 },
      prepTime: "20",
      cookTime: "30",
      tags: ["Indian", "Spicy", "Dinner"]
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
