
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Hero = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
    navigate("/");
  };

  return (
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
  );
};

export default Hero;
