
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background py-10 border-t">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">CookSnap</h2>
            <p className="text-muted-foreground">Discover recipes with a simple photo</p>
          </div>
          <div className="flex gap-8">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Link to="/recipes" className="text-muted-foreground hover:text-foreground transition-colors">Recipes</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CookSnap. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
