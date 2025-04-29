import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RestaurantList from './components/food-ordering/RestaurantList';
import CameraRecognition from './components/CameraRecognition';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RecipesPage from './pages/RecipesPage';
import RecipeDetail from './pages/RecipeDetail';
import FavoritesPage from './pages/FavoritesPage';
import MealPlanPage from './pages/MealPlanPage';
import ShoppingListPage from './pages/ShoppingListPage';

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
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />

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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes; 