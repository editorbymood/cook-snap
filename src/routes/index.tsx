import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RestaurantList from '@/components/food-ordering/RestaurantList';
import CameraRecognition from '@/components/CameraRecognition';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import RecipeDetail from '@/pages/RecipeDetail';
import RecipesPage from '@/pages/RecipesPage';
import FavoritesPage from '@/pages/FavoritesPage';
import MealPlanPage from '@/pages/MealPlanPage';
import ShoppingListPage from '@/pages/ShoppingListPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPage from '@/pages/PrivacyPage';
import NotFound from '@/pages/NotFound';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={
        <>
          <Hero />
          <Features />
          <Testimonials />
        </>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      {/* Protected routes */}
      <Route path="/restaurants" element={
        <ProtectedRoute>
          <RestaurantList />
        </ProtectedRoute>
      } />
      <Route path="/camera" element={
        <ProtectedRoute>
          <CameraRecognition />
        </ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute>
          <FavoritesPage />
        </ProtectedRoute>
      } />
      <Route path="/meal-plan" element={
        <ProtectedRoute>
          <MealPlanPage />
        </ProtectedRoute>
      } />
      <Route path="/shopping-list" element={
        <ProtectedRoute>
          <ShoppingListPage />
        </ProtectedRoute>
      } />

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 