import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChefHat, Star, Heart, UtensilsCrossed, CakeSlice, Timer, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import RecipeCarousel from "@/components/RecipeCarousel";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just a mock authentication - in a real app, you'd connect to a backend
    toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
    navigate("/");
  };
  
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
  
  const testimonials = [
    {
      quote: "CookSnap revolutionized my cooking experience! I just snap a photo and get the perfect recipe every time.",
      author: "Jamie L.",
      role: "Home Cook"
    },
    {
      quote: "The recipe recognition is incredibly accurate. It's like having a personal chef in my pocket.",
      author: "Sarah M.",
      role: "Food Enthusiast"
    },
    {
      quote: "I've discovered so many new recipes I would have never tried. The nutritional info helps me stay on track with my goals.",
      author: "Alex T.",
      role: "Fitness Coach"
    }
  ];

  const popularRecipes = [
    {
      id: "beef-burger",
      name: "Beef Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2670&auto=format&fit=crop",
      calories: 520,
      prepTime: 15,
      cookTime: 10,
      tags: ["American", "Fast Food", "Dinner"]
    },
    {
      id: "california-roll",
      name: "California Roll",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2669&auto=format&fit=crop",
      calories: 255,
      prepTime: 30,
      cookTime: 20,
      tags: ["Japanese", "Seafood", "Sushi"]
    },
    {
      id: "caesar-salad",
      name: "Caesar Salad",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=2670&auto=format&fit=crop",
      calories: 320,
      prepTime: 15,
      cookTime: 0,
      tags: ["Salad", "Healthy", "Quick"]
    },
    {
      id: "spaghetti-carbonara",
      name: "Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1600803907087-f56ffa57d4d5?q=80&w=2574&auto=format&fit=crop",
      calories: 650,
      prepTime: 15,
      cookTime: 15,
      tags: ["Italian", "Pasta", "Quick Meals"]
    },
    {
      id: "chicken-curry",
      name: "Chicken Curry",
      image: "https://images.unsplash.com/photo-1604652013239-3e0237ba661f?q=80&w=2574&auto=format&fit=crop",
      calories: 480,
      prepTime: 20,
      cookTime: 30,
      tags: ["Indian", "Spicy", "Dinner"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/20 py-20">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Discover Recipes with a Simple <span className="text-primary">Photo</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
                Take a photo of any food and instantly get matching recipes with detailed instructions and nutrition information.
              </p>
              <div className="space-x-4 animate-fade-in">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="hover:scale-105 transition-transform duration-300">
                      Get Started <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{isLogin ? "Login to CookSnap" : "Create an Account"}</DialogTitle>
                      <DialogDescription>
                        {isLogin ? "Welcome back! Please enter your credentials." : "Join CookSnap and start discovering recipes."}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAuth} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        {isLogin ? "Login" : "Sign Up"}
                      </Button>
                      <p className="text-center text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline"
                          onClick={() => setIsLogin(!isLogin)}
                        >
                          {isLogin ? "Sign Up" : "Login"}
                        </button>
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="lg" onClick={() => navigate("/recipes")} className="hover:bg-background/90 transition-colors duration-300">
                  Explore Recipes
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=2547&auto=format&fit=crop" 
                  alt="Food recognition" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-background rounded-lg p-4 shadow-lg transform transition-transform hover:scale-105 duration-300">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">AI-Powered</p>
                    <p className="text-sm text-muted-foreground">Photo Recognition</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Recipes */}
      <section className="py-16 bg-secondary/10">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-3 text-center">Popular Recipes</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            Discover our most loved recipes that everyone's cooking right now
          </p>
          
          <div className="relative">
            <Carousel className="mx-auto max-w-5xl">
              <CarouselContent>
                {popularRecipes.map((recipe, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <div 
                      onClick={() => navigate(`/recipe/${recipe.id}`)}
                      className="h-full"
                    >
                      <div className="bg-background rounded-xl overflow-hidden shadow-md h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img 
                            src={recipe.image} 
                            alt={recipe.name} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-background/70 backdrop-blur-sm">
                              {recipe.calories} cal
                            </Badge>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h3 className="font-semibold text-white text-lg">{recipe.name}</h3>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Timer className="h-4 w-4" />
                              <span>{recipe.prepTime + recipe.cookTime} mins</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {recipe.tags.slice(0, 2).map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/recipe/${recipe.id}`);
                            }}
                          >
                            View Recipe
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-4 bg-background shadow-md hover:bg-background/90" />
                <CarouselNext className="-right-4 bg-background shadow-md hover:bg-background/90" />
              </div>
            </Carousel>
            
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => navigate('/recipes')} className="group">
                View All Recipes
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
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
                      <p className="text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-background rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 h-10 w-10 rounded-full flex items-center justify-center">
                    <span className="font-medium text-primary">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Cooking?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of food lovers who are discovering new recipes and enjoying cooking like never before.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="hover:scale-105 transition-transform duration-300">
                Get Started Today
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{isLogin ? "Login to CookSnap" : "Create an Account"}</DialogTitle>
                <DialogDescription>
                  {isLogin ? "Welcome back! Please enter your credentials." : "Join CookSnap and start discovering recipes."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAuth} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email2">Email</Label>
                  <Input
                    id="email2"
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password2">Password</Label>
                  <Input
                    id="password2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
                <p className="text-center text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </button>
                </p>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-10 border-t">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">CookSnap</h2>
              <p className="text-muted-foreground">Discover recipes with a simple photo</p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Recipes</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CookSnap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
