
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import RecipeDetail from "./pages/RecipeDetail";
import RecipesPage from "./pages/RecipesPage";
import FavoritesPage from "./pages/FavoritesPage";
import MealPlanPage from "./pages/MealPlanPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance with optimized settings for production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/welcome" replace />} />
                <Route path="/welcome" element={<LandingPage />} />
                <Route path="/home" element={<Index />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/meal-plan" element={<MealPlanPage />} />
                <Route path="/shopping-list" element={<ShoppingListPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
