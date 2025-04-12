
import { Link, useNavigate } from "react-router-dom";
import { ChefHat, Search, Moon, Sun, User, Heart, Calendar, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/contexts/ThemeContext";
import { useUser } from "@/contexts/UserContext";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl hidden sm:inline-block">CookSnap</span>
            </Link>
            
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/recipes">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Recipes
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  {isAuthenticated && (
                    <>
                      <NavigationMenuItem>
                        <Link to="/favorites">
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Favorites
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      
                      <NavigationMenuItem>
                        <Link to="/meal-plan">
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Meal Plan
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                      
                      <NavigationMenuItem>
                        <Link to="/shopping-list">
                          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Shopping List
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    </>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.name ? getInitials(user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites">Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/meal-plan">Meal Plan</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/shopping-list">Shopping List</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col h-full py-6">
                  <div className="mb-8">
                    <form onSubmit={handleSearch} className="relative">
                      <Input
                        type="text"
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </form>
                  </div>
                  
                  <nav className="space-y-6 flex-1">
                    <ul className="space-y-3">
                      <li>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link to="/recipes" className="flex items-center">
                            <Search className="mr-2 h-4 w-4" />
                            Recipes
                          </Link>
                        </Button>
                      </li>
                      
                      {isAuthenticated && (
                        <>
                          <li>
                            <Button variant="ghost" className="w-full justify-start" asChild>
                              <Link to="/favorites" className="flex items-center">
                                <Heart className="mr-2 h-4 w-4" />
                                Favorites
                              </Link>
                            </Button>
                          </li>
                          
                          <li>
                            <Button variant="ghost" className="w-full justify-start" asChild>
                              <Link to="/meal-plan" className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                Meal Plan
                              </Link>
                            </Button>
                          </li>
                          
                          <li>
                            <Button variant="ghost" className="w-full justify-start" asChild>
                              <Link to="/shopping-list" className="flex items-center">
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Shopping List
                              </Link>
                            </Button>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                  
                  {!isAuthenticated ? (
                    <Button className="w-full" asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={logout}>
                      Log out
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
