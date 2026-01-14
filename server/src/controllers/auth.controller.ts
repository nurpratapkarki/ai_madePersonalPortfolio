import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthRequest } from '../middleware/auth.middleware';
import { AppError } from '../middleware/error.middleware';

interface RefreshTokenPayload {
  userId: string;
}

// Register admin (only allow first user)
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Check if any user exists
    const existingUserCount = await User.countDocuments();
    if (existingUserCount > 0) {
      throw new AppError('Registration is closed. Admin already exists.', 403);
    }

    const user = new User({
      username,
      email,
      password,
      role: 'admin',
    });

    await user.save();

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      status: 'success',
      message: 'Admin registered successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      status: 'success',
      message: 'Logged in successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        accessToken,
      },
    });
  } catch (error) {
    next(new AppError('Invalid email or password', 401));
  }
};

// Refresh token
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new AppError('Refresh token not found', 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || 'refresh-secret'
    ) as RefreshTokenPayload;

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    const accessToken = user.generateAuthToken();
    const newRefreshToken = user.generateRefreshToken();

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(new AppError('Invalid refresh token', 401));
  }
};

// Logout
export const logout = (
  _req: Request,
  res: Response
): void => {
  res.clearCookie('refreshToken');
  res.json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

// Get current user
export const getMe = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  res.json({
    status: 'success',
    data: {
      user: {
        id: req.user?._id,
        username: req.user?.username,
        email: req.user?.email,
        role: req.user?.role,
      },
    },
  });
};
