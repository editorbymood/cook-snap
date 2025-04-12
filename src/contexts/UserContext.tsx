
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Recipe, ShoppingListItem, MealPlanEntry } from "@/types";

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  addToShoppingList: (items: string[], recipeId?: string) => void;
  removeFromShoppingList: (itemId: string) => void;
  toggleShoppingListItem: (itemId: string) => void;
  addToMealPlan: (recipeId: string, date: string, mealType: MealPlanEntry['mealType']) => void;
  removeFromMealPlan: (entryId: string) => void;
}

// Mock user for development
const mockUser: User = {
  id: "user1",
  name: "Test User",
  email: "test@example.com",
  favorites: ["spaghetti-carbonara", "chicken-curry"],
  shoppingList: [],
  mealPlan: []
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // For development purposes only
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // This would connect to a backend service in a real app
    // For now, we'll simulate a successful login
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = async (name: string, email: string, password: string) => {
    // This would connect to a backend service in a real app
    // For now, we'll simulate a successful registration
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      favorites: [],
      shoppingList: [],
      mealPlan: []
    };
    setUser(newUser);
  };

  const toggleFavorite = (recipeId: string) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const isFavorited = prevUser.favorites.includes(recipeId);
      
      return {
        ...prevUser,
        favorites: isFavorited
          ? prevUser.favorites.filter(id => id !== recipeId)
          : [...prevUser.favorites, recipeId]
      };
    });
  };

  const isFavorite = (recipeId: string) => {
    return user?.favorites.includes(recipeId) || false;
  };

  const addToShoppingList = (items: string[], recipeId?: string) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const newItems: ShoppingListItem[] = items.map(name => ({
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        quantity: "1",
        checked: false,
        recipeId
      }));
      
      return {
        ...prevUser,
        shoppingList: [...prevUser.shoppingList, ...newItems]
      };
    });
  };

  const removeFromShoppingList = (itemId: string) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      return {
        ...prevUser,
        shoppingList: prevUser.shoppingList.filter(item => item.id !== itemId)
      };
    });
  };

  const toggleShoppingListItem = (itemId: string) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      return {
        ...prevUser,
        shoppingList: prevUser.shoppingList.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      };
    });
  };

  const addToMealPlan = (recipeId: string, date: string, mealType: MealPlanEntry['mealType']) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      const newEntry: MealPlanEntry = {
        id: `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        recipeId,
        date,
        mealType
      };
      
      return {
        ...prevUser,
        mealPlan: [...prevUser.mealPlan, newEntry]
      };
    });
  };

  const removeFromMealPlan = (entryId: string) => {
    if (!user) return;
    
    setUser(prevUser => {
      if (!prevUser) return null;
      
      return {
        ...prevUser,
        mealPlan: prevUser.mealPlan.filter(entry => entry.id !== entryId)
      };
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        toggleFavorite,
        isFavorite,
        addToShoppingList,
        removeFromShoppingList,
        toggleShoppingListItem,
        addToMealPlan,
        removeFromMealPlan
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
