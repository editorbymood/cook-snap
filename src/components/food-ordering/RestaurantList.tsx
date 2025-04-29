import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { Star, Filter, Clock, IndianRupee, Search, Globe } from 'lucide-react';
import restaurantsData from '@/data/restaurants.json';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  location: string;
  minOrder: number;
  deliveryFee: number;
  isOpen: boolean;
  website: string;
  menu: MenuItem[];
}

const ITEMS_PER_PAGE = 12;

const RestaurantList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();

  const restaurants: Restaurant[] = restaurantsData.restaurants;

  const filteredRestaurants = restaurants
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;
      return matchesSearch && matchesCuisine;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'deliveryTime':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'minOrder':
          return a.minOrder - b.minOrder;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const uniqueCuisines = Array.from(new Set(restaurants.map(r => r.cuisine)));

  return (
    <div className="space-y-6">
      {selectedRestaurant ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setSelectedRestaurant(null)}>
              Back to Restaurants
            </Button>
            <Button variant="outline" onClick={() => window.open(selectedRestaurant.website, '_blank')}>
              <Globe className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedRestaurant.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{selectedRestaurant.cuisine}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1">{selectedRestaurant.rating}</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {selectedRestaurant.menu.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <div className="flex items-center mt-2">
                        <IndianRupee className="h-4 w-4" />
                        <span className="font-medium">{item.price}</span>
                      </div>
                    </div>
                    <Button onClick={() => addToCart(item)}>Add to Cart</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
              >
                <option value="all">All Cuisines</option>
                {uniqueCuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white"
              >
                <option value="rating">Sort by Rating</option>
                <option value="deliveryTime">Sort by Delivery Time</option>
                <option value="minOrder">Sort by Min Order</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{restaurant.name}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1">{restaurant.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {restaurant.deliveryTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      Min order: {restaurant.minOrder}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      Delivery fee: {restaurant.deliveryFee}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setSelectedRestaurant(restaurant)}
                      >
                        View Menu
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.open(restaurant.website, '_blank')}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RestaurantList; 