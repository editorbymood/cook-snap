
import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/90 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">CookSnap</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
