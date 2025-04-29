import express, { Request, Response, NextFunction } from 'express';
import Restaurant, { IMenuItem } from '../models/Restaurant';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import { AuthRequest } from '../types/auth';
import { Types } from 'mongoose';

// Define a type for menu items that includes Mongoose document properties
type MenuItemWithId = IMenuItem & {
  _id: Types.ObjectId;
};

const router = express.Router();

// Get all restaurants
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurants = await Restaurant.find({ isActive: true })
      .select('-menu')
      .populate('owner', 'name email');
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
});

// Get restaurant by ID
router.get('/:id', async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('owner', 'name email');
    
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }
    
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
});

// Create new restaurant (restaurant owner only)
// @ts-expect-error Express types don't properly handle async request handlers
router.post('/', authenticateToken, authorizeRole(['restaurant']), async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurant = new Restaurant({
      ...req.body,
      owner: req.user?.userId
    });
    
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
});

// Update restaurant (restaurant owner only)
// @ts-expect-error Express types don't properly handle async request handlers
router.put('/:id', authenticateToken, authorizeRole(['restaurant']), async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, owner: req.user?.userId },
      req.body,
      { new: true }
    );
    
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }
    
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
});

// Add menu item (restaurant owner only)
// @ts-expect-error Express types don't properly handle async request handlers
router.post('/:id/menu', authenticateToken, authorizeRole(['restaurant']), async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, owner: req.user?.userId },
      { $push: { menu: req.body } },
      { new: true }
    );
    
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }
    
    res.json(restaurant.menu[restaurant.menu.length - 1]);
  } catch (error) {
    next(error);
  }
});

// Update menu item (restaurant owner only)
// @ts-expect-error Express types don't properly handle async request handlers
router.put('/:id/menu/:itemId', authenticateToken, authorizeRole(['restaurant']), async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { 
        _id: req.params.id, 
        owner: req.user?.userId,
        'menu._id': req.params.itemId
      },
      { $set: { 'menu.$': req.body } },
      { new: true }
    );
    
    if (!restaurant) {
      res.status(404).json({ message: 'Menu item not found' });
      return;
    }
    
    const updatedItem = restaurant.menu.find(item => (item as MenuItemWithId)._id.toString() === req.params.itemId);
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
});

// Delete menu item (restaurant owner only)
// @ts-expect-error Express types don't properly handle async request handlers
router.delete('/:id/menu/:itemId', authenticateToken, authorizeRole(['restaurant']), async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, owner: req.user?.userId },
      { $pull: { menu: { _id: req.params.itemId } } },
      { new: true }
    );
    
    if (!restaurant) {
      res.status(404).json({ message: 'Menu item not found' });
      return;
    }
    
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router; 