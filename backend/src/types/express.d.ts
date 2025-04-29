import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface User {
      userId: string;
      role: string;
    }
  }
}

export type AsyncRequestHandler = (
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface AuthRequest extends Request {
  user?: Express.User;
} 