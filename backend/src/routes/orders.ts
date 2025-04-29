import express, { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import Restaurant, { IMenuItem } from '../models/Restaurant';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { AuthRequest } from '../types/auth';
import { Types, Document } from 'mongoose';

interface OrderItem {
  menuItem: string;
  quantity: number;
}

// Define a type for menu items that includes Mongoose document properties
type MenuItemDocument = IMenuItem & Document & {
  _id: Types.ObjectId;
};

const router = express.Router();

// Create new order
router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { restaurantId, items, deliveryAddress, paymentMethod } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    // Calculate total amount
    const totalAmount = items.reduce((total: number, item: OrderItem) => {
      const menuItem = restaurant.menu.find(m => (m as IMenuItem & { _id: { toString: () => string } })._id.toString() === item.menuItem);
      return total + (menuItem?.price || 0) * item.quantity;
    }, 0) + restaurant.deliveryFee;

    const order = new Order({
      user: req.user?.userId,
      restaurant: restaurantId,
      items: items.map((item: OrderItem) => {
        const menuItem = restaurant.menu.find(m => (m as IMenuItem & { _id: { toString: () => string } })._id.toString() === item.menuItem);
        return {
          menuItem: item.menuItem,
          quantity: item.quantity,
          price: menuItem?.price || 0,
          name: menuItem?.name || ''
        };
      }),
      totalAmount,
      deliveryFee: restaurant.deliveryFee,
      deliveryAddress,
      paymentMethod,
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60000) // 45 minutes from now
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Get user's orders
router.get('/my-orders', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find({ user: req.user?.userId })
      .populate('restaurant', 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Get restaurant's orders (restaurant owner only)
router.get('/restaurant-orders', authenticateToken, authorizeRole(['restaurant']), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user?.userId });
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Update order status (restaurant owner only)
router.put('/:id/status', authenticateToken, authorizeRole(['restaurant']), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;
    const restaurant = await Restaurant.findOne({ owner: req.user?.userId });
    
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, restaurant: restaurant._id },
      { status },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Cancel order
router.put('/:id/cancel', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.userId },
      { status: 'cancelled' },
      { new: true }
    );

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

export default router; 