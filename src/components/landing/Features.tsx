
import { ChefHat, UtensilsCrossed, CakeSlice, Timer, Heart, ShoppingCart } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const features = [
  { 
    icon: ChefHat, 
    title: "Discover Recipes", 
    description: "Explore thousands of delicious recipes from around the world." 
  },
  { 
    icon: UtensilsCrossed, 
    title: "Cook with Confidence", 
    description: "Step-by-step instructions make cooking simple and enjoyable." 
  },
  { 
    icon: CakeSlice, 
    title: "Diverse Cuisine", 
    description: "From comfort food to exotic dishes, find recipes for every taste." 
  },
  { 
    icon: Timer, 
    title: "Quick & Easy", 
    description: "Filter recipes by prep time to find options that fit your schedule." 
  },
  { 
    icon: Heart, 
    title: "Save Favorites", 
    description: "Keep track of recipes you love for quick access later." 
  },
  { 
    icon: ShoppingCart, 
    title: "Shopping Lists", 
    description: "Automatically generate shopping lists from your chosen recipes." 
  }
];

const Features = () => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">Why Choose CookSnap</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <div className="p-6 rounded-xl border bg-card transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{feature.title}</h4>
                    <p className="text-sm">{feature.description}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
