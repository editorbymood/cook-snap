import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from '@/contexts/AuthContext';
import FloatingFoodElements from './components/common/FloatingFoodElements';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';

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
        <AuthProvider>
          <UserProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Router>
                <div className="min-h-screen bg-background flex flex-col">
                  <FloatingFoodElements
                    count={30}
                    speed={1.2}
                    sizeRange={[15, 30]}
                    opacityRange={[0.2, 0.4]}
                  />
                  <Header />
                  <main className="flex-grow container mx-auto py-8">
                    <AppRoutes />
                  </main>
                  <Footer />
                </div>
              </Router>
            </TooltipProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
