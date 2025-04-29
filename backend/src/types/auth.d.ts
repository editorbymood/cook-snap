import { Request } from 'express';

declare global {
  namespace Express {
    interface User {
      userId: string;
      role: string;
    }
  }
}

export interface AuthRequest extends Request {
  user?: Express.User;
} 