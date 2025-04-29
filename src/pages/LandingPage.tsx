import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Clock, Heart, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types";
import RecipeCarousel from "@/components/RecipeCarousel";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

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
    },
    {
      id: "spinach-mushroom-risotto",
      name: "Spinach Mushroom Risotto",
      description: "Creamy Italian risotto with fresh spinach and sautéed mushrooms.",
      image: "https://images.unsplash.com/photo-1673845532980-90c6614d9511?q=80&w=2574&auto=format&fit=crop",
      ingredients: ["Arborio rice", "Spinach", "Mushrooms", "Onion", "Vegetable broth", "Parmesan cheese"],
      instructions: [
        "Sauté mushrooms and onions",
        "Add rice and gradually stir in broth",
        "Cook until creamy",
        "Fold in spinach and cheese"
      ],
      prepTime: "15",
      cookTime: "30",
      servings: 4,
      tags: ["Vegetarian", "Italian", "Dinner"],
      nutritionalInfo: { calories: 380, protein: 12, carbs: 65, fat: 8 }
    },
    {
      id: "quinoa-buddha-bowl",
      name: "Quinoa Buddha Bowl",
      description: "Nutrient-rich bowl with quinoa, roasted vegetables, and tahini dressing.",
      image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2575&auto=format&fit=crop",
      ingredients: ["Quinoa", "Sweet potato", "Chickpeas", "Kale", "Avocado", "Tahini"],
      instructions: [
        "Cook quinoa",
        "Roast sweet potatoes and chickpeas",
        "Prepare tahini dressing",
        "Assemble bowl with fresh ingredients"
      ],
      prepTime: "20",
      cookTime: "25",
      servings: 2,
      tags: ["Vegetarian", "Healthy", "Lunch"],
      nutritionalInfo: { calories: 420, protein: 15, carbs: 55, fat: 18 }
    },
    {
      id: "vegetable-pad-thai",
      name: "Vegetable Pad Thai",
      description: "Classic Thai noodle dish with tofu and fresh vegetables.",
      image: "https://images.unsplash.com/photo-1637806931098-af5d7cea9d67?q=80&w=2670&auto=format&fit=crop",
      ingredients: ["Rice noodles", "Tofu", "Bean sprouts", "Carrots", "Green onions", "Peanuts"],
      instructions: [
        "Soak noodles",
        "Stir-fry tofu and vegetables",
        "Add sauce and noodles",
        "Garnish with peanuts and lime"
      ],
      prepTime: "20",
      cookTime: "15",
      servings: 4,
      tags: ["Vegetarian", "Thai", "Dinner"],
      nutritionalInfo: { calories: 380, protein: 14, carbs: 58, fat: 12 }
    }
  ];

  const features = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Search",
      description: "Find recipes instantly with our AI-powered search"
    },
    {
      icon: <ChefHat className="w-6 h-6" />,
      title: "Expert Tips",
      description: "Get professional cooking tips and techniques"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Meals",
      description: "Discover recipes that fit your schedule"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community",
      description: "Join a community of food enthusiasts"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <img
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2670&auto=format&fit=crop"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <motion.div
          className="container px-4 mx-auto max-w-6xl relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover Your Next
            <span className="text-primary"> Culinary Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Transform your cooking experience with AI-powered recipe discovery and personalized meal planning
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CookSnap?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of cooking with our innovative features designed to make your culinary journey easier and more enjoyable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Recipes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved recipes that everyone's cooking right now
            </p>
          </motion.div>

          <RecipeCarousel recipes={popularRecipes} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Cooking?</h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of home cooks who are already enjoying the benefits of AI-powered recipe discovery
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
