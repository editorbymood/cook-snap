import React from 'react';
import RestaurantSearch from '@/components/RestaurantSearch';

const RestaurantsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Order from Your Favorite Restaurants</h1>
      <RestaurantSearch />
    </div>
  );
};

export default RestaurantsPage; 