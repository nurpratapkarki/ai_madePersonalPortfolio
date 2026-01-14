import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

// Custom error class
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Handle Mongoose validation errors
const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => ({
    field: el.path,
    message: el.message,
  }));
  
  return new AppError('Validation failed', 400);
};

// Handle Mongoose duplicate key errors
const handleDuplicateKeyError = (err: { keyValue?: Record<string, unknown> }) => {
  const field = err.keyValue ? Object.keys(err.keyValue)[0] : 'field';
  return new AppError(`Duplicate value for ${field}. Please use another value.`, 400);
};

// Handle Mongoose cast errors
const handleCastError = (err: mongoose.Error.CastError) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

// Handle JWT errors
const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again.', 401);
};

// Handle JWT expired errors
const handleJWTExpiredError = () => {
  return new AppError('Your token has expired. Please log in again.', 401);
};

// Global error handler middleware
export const errorHandler = (
  err: Error & { statusCode?: number; code?: number; keyValue?: Record<string, unknown> },
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error = { ...err, message: err.message };

  // Log error for development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Handle specific error types
  if (err instanceof mongoose.Error.ValidationError) {
    error = handleValidationError(err) as typeof error;
  }

  if (err.code === 11000) {
    error = handleDuplicateKeyError(err) as typeof error;
  }

  if (err instanceof mongoose.Error.CastError) {
    error = handleCastError(err) as typeof error;
  }

  if (err.name === 'JsonWebTokenError') {
    error = handleJWTError() as typeof error;
  }

  if (err.name === 'TokenExpiredError') {
    error = handleJWTExpiredError() as typeof error;
  }

  const statusCode = error.statusCode || 500;
  const status = statusCode >= 500 ? 'error' : 'fail';

  res.status(statusCode).json({
    status,
    message: error.message || 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Not found handler
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    status: 'fail',
    message: `Route ${req.originalUrl} not found`,
  });
};
