import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, ExternalLink } from 'lucide-react';

interface Restaurant {
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  website: string;
  image: string;
}

const RESTAURANTS: Restaurant[] = [
  {
    name: 'Domino\'s Pizza',
    cuisine: 'Pizza, Fast Food',
    rating: 4.5,
    deliveryTime: '30-45 min',
    website: 'https://www.dominos.co.in/',
    image: 'https://images.dominos.co.in/logo.png'
  },
  {
    name: 'McDonald\'s',
    cuisine: 'Burgers, Fast Food',
    rating: 4.3,
    deliveryTime: '20-30 min',
    website: 'https://www.mcdonalds.com/',
    image: 'https://www.mcdonalds.com/content/dam/sites/usa/nfl/icons/arches-logo_108x108.jpg'
  },
  {
    name: 'KFC',
    cuisine: 'Fried Chicken, Fast Food',
    rating: 4.2,
    deliveryTime: '25-35 min',
    website: 'https://online.kfc.co.in/',
    image: 'https://online.kfc.co.in/static/media/kfcLogo.56f0b6a0.svg'
  },
  {
    name: 'Pizza Hut',
    cuisine: 'Pizza, Italian',
    rating: 4.4,
    deliveryTime: '30-45 min',
    website: 'https://www.pizzahut.co.in/',
    image: 'https://www.pizzahut.co.in/order/images/logos/logo_wide@x2.5.5f1b4bd8.png'
  },
  {
    name: 'Burger King',
    cuisine: 'Burgers, Fast Food',
    rating: 4.1,
    deliveryTime: '25-35 min',
    website: 'https://www.burgerking.in/',
    image: 'https://www.burgerking.in/static/media/logo.8d0fce2b.svg'
  }
];

const RestaurantSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');

  const cuisines = ['all', ...new Set(RESTAURANTS.map(r => r.cuisine.split(', ')[0]))];

  const filteredRestaurants = RESTAURANTS.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || 
                          restaurant.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());
    return matchesSearch && matchesCuisine;
  });

  return (
    <Card className="w-full max-w-4xl mx-auto p-4">
      <CardHeader>
        <CardTitle>Find & Order from Restaurants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>
                {cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.name} className="overflow-hidden">
              <div className="relative h-40">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{restaurant.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{restaurant.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">{restaurant.deliveryTime}</span>
                </div>
                <Button
                  className="w-full"
                  onClick={() => window.open(restaurant.website, '_blank')}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No restaurants found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RestaurantSearch; 