import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
}

const mockOrders: Order[] = [
  {
    id: '1',
    date: '2024-03-15',
    status: 'delivered',
    items: [
      { id: '1', name: 'Margherita Pizza', quantity: 1, price: 12.99 },
      { id: '2', name: 'Spaghetti Carbonara', quantity: 1, price: 14.99 }
    ],
    total: 27.98
  },
  {
    id: '2',
    date: '2024-03-14',
    status: 'preparing',
    items: [
      { id: '3', name: 'California Roll', quantity: 2, price: 8.99 }
    ],
    total: 17.98
  }
];

export const OrderHistory = () => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'preparing':
        return 'text-blue-500';
      case 'delivered':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center py-8">
          Order history feature coming soon...
        </p>
      </CardContent>
    </Card>
  );
};

export default OrderHistory; 