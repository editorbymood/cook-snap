import { useState } from "react";
import Header from "@/components/Header";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Trash2, Plus, Share2, Download, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ShareButton from "@/components/ShareButton";
import { ShoppingListItem } from "@/types";

const ShoppingListPage = () => {
  const { user, toggleShoppingListItem, removeFromShoppingList, addToShoppingList } = useUser();
  const [newItem, setNewItem] = useState("");
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to view and manage your shopping list.
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newItem.trim()) {
      addToShoppingList([newItem.trim()]);
      setNewItem("");
      toast.success("Item added to shopping list");
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleExport = () => {
    // Create text content for the shopping list
    const content = user.shoppingList
      .map(item => `- ${item.name}`)
      .join('\n');
      
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopping-list.txt';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast.success("Shopping list exported");
  };
  
  // Group items by recipe for better organization
  const groupedItems: Record<string, ShoppingListItem[]> = user.shoppingList.reduce((acc, item) => {
    const key = item.recipeId || 'other';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, ShoppingListItem[]>);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Shopping List</h1>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleExport}>
                <Download className="h-4 w-4" />
              </Button>
              
              <ShareButton 
                title="My Shopping List" 
                url={window.location.href}
                variant="outline"
                size="icon"
              />
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Add Item</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddItem} className="flex gap-2">
                <Input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add item to your list..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {user.shoppingList.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <p className="text-muted-foreground mb-4">Your shopping list is empty</p>
              <Button asChild>
                <Link to="/recipes">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Recipes
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedItems).map(([recipeId, items]) => (
                <Card key={recipeId}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      {recipeId !== 'other' ? 'From Recipe' : 'Custom Items'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {items.map(item => (
                        <li key={item.id} className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={item.id}
                              checked={item.checked}
                              onCheckedChange={() => toggleShoppingListItem(item.id)}
                            />
                            <label
                              htmlFor={item.id}
                              className={`text-lg ${item.checked ? 'text-muted-foreground line-through' : ''}`}
                            >
                              {item.name}
                            </label>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromShoppingList(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ShoppingListPage;
