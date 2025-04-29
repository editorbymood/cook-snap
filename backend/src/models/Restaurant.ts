import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface IRestaurant extends Document {
  name: string;
  description: string;
  cuisine: string;
  address: string;
  phone: string;
  rating: number;
  deliveryTime: string;
  minOrder: number;
  deliveryFee: number;
  menu: IMenuItem[];
  owner: mongoose.Types.ObjectId;
  isActive: boolean;
}

const menuItemSchema = new Schema<IMenuItem>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
});

const restaurantSchema = new Schema<IRestaurant>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  deliveryTime: {
    type: String,
    required: true
  },
  minOrder: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryFee: {
    type: Number,
    required: true,
    min: 0
  },
  menu: [menuItemSchema],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IRestaurant>('Restaurant', restaurantSchema); 