import { Request, Response, NextFunction } from 'express';
import { Content } from '../models/Content';
import { AuthRequest } from '../middleware/auth.middleware';
import { AppError } from '../middleware/error.middleware';

// Get all content
export const getAllContent = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const content = await Content.find();

    res.json({
      status: 'success',
      data: { content },
    });
  } catch (error) {
    next(error);
  }
};

// Get content by section
export const getContentBySection = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { section } = req.params;

    const content = await Content.findOne({ section });

    if (!content) {
      // Return empty data if section doesn't exist
      res.json({
        status: 'success',
        data: { content: { section, data: {} } },
      });
      return;
    }

    res.json({
      status: 'success',
      data: { content },
    });
  } catch (error) {
    next(error);
  }
};

// Create or update content (Admin only)
export const upsertContent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { section, data } = req.body;

    const content = await Content.findOneAndUpdate(
      { section },
      {
        section,
        data,
        updatedBy: req.user?._id,
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      message: 'Content saved successfully',
      data: { content },
    });
  } catch (error) {
    next(error);
  }
};

// Delete content section (Admin only)
export const deleteContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { section } = req.params;

    const content = await Content.findOneAndDelete({ section });

    if (!content) {
      throw new AppError('Content section not found', 404);
    }

    res.json({
      status: 'success',
      message: 'Content deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
