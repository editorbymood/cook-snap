import express, { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';
import Order, { IOrder } from '../models/Order';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

// Create payment intent
const createPaymentIntent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { orderId } = req.body;
    if (!orderId) {
      res.status(400).json({ error: 'Order ID is required' });
      return;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    if (order.user.toString() !== req.user.userId) {
      res.status(403).json({ error: 'Not authorized to pay for this order' });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
        userId: req.user.userId,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

// Handle Stripe webhook
const handleWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const sig = req.headers['stripe-signature'];
  if (!sig) {
    res.status(400).json({ error: 'Missing stripe signature' });
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    res.status(400).json({ error: 'Invalid signature' });
    return;
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId;

        if (!orderId) {
          console.error('No orderId in payment intent metadata');
          res.status(400).json({ error: 'Missing order ID in metadata' });
          return;
        }

        const order = await Order.findByIdAndUpdate(
          orderId,
          {
            paymentStatus: 'paid',
            paymentIntentId: paymentIntent.id,
            status: 'confirmed', // Update order status to confirmed
          },
          { new: true }
        );

        if (!order) {
          console.error('Order not found:', orderId);
          res.status(404).json({ error: 'Order not found' });
          return;
        }

        console.log('Order updated successfully:', orderId);
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata.orderId;

        if (orderId) {
          await Order.findByIdAndUpdate(orderId, {
            paymentStatus: 'failed',
            paymentIntentId: paymentIntent.id,
          });
        }
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    next(error);
  }
};

router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router; 