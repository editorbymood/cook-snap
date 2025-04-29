import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RestaurantList from '@/components/food-ordering/RestaurantList';
import { OrderHistory } from '../components/food-ordering/OrderHistory';
import { Cart } from '../components/food-ordering/Cart';

const FoodOrderingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('restaurants');

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Food Ordering System</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="cart">Cart</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="restaurants">
          <RestaurantList />
        </TabsContent>
        
        <TabsContent value="cart">
          <Cart />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FoodOrderingPage; 