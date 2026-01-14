import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Analytics } from '../models/Analytics';

// Track page view
export const trackPageView = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let { sessionId } = req.body;
    const { page, referrer } = req.body;

    // Generate session ID if not provided
    if (!sessionId) {
      sessionId = uuidv4();
    }

    // Get IP and user agent from request
    const ipAddress = req.ip || req.socket.remoteAddress || 'anonymous';
    const userAgent = req.headers['user-agent'] || '';

    await Analytics.recordPageView(sessionId, page, {
      ipAddress,
      userAgent,
      referrer,
    });

    res.json({
      status: 'success',
      data: { sessionId },
    });
  } catch (error) {
    next(error);
  }
};

// Get overall stats (Admin only)
export const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate as string) : new Date(0);
    const end = endDate ? new Date(endDate as string) : new Date();

    const stats = await Analytics.getVisitorStats(start, end);

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStats = await Analytics.getVisitorStats(today, new Date());

    // Get this week's stats
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekStats = await Analytics.getVisitorStats(weekAgo, new Date());

    // Get this month's stats
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const monthStats = await Analytics.getVisitorStats(monthAgo, new Date());

    res.json({
      status: 'success',
      data: {
        overall: stats,
        today: todayStats,
        thisWeek: weekStats,
        thisMonth: monthStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get visitor data (Admin only)
export const getVisitors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 20,
      startDate,
      endDate,
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const query: Record<string, unknown> = {};

    if (startDate || endDate) {
      query.lastVisit = {};
      if (startDate) {
        (query.lastVisit as Record<string, Date>).$gte = new Date(startDate as string);
      }
      if (endDate) {
        (query.lastVisit as Record<string, Date>).$lte = new Date(endDate as string);
      }
    }

    const [visitors, total] = await Promise.all([
      Analytics.find(query)
        .sort({ lastVisit: -1 })
        .skip(skip)
        .limit(limitNum)
        .select('-__v'),
      Analytics.countDocuments(query),
    ]);

    res.json({
      status: 'success',
      data: {
        visitors,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get popular pages (Admin only)
export const getPopularPages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { limit = 10 } = req.query;

    const popularPages = await Analytics.aggregate([
      { $unwind: '$pages' },
      {
        $group: {
          _id: '$pages.path',
          views: { $sum: 1 },
        },
      },
      { $sort: { views: -1 } },
      { $limit: parseInt(limit as string, 10) },
      {
        $project: {
          path: '$_id',
          views: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      status: 'success',
      data: { popularPages },
    });
  } catch (error) {
    next(error);
  }
};

// Get visitor trend (Admin only)
export const getVisitorTrend = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { days = 30 } = req.query;

    const daysNum = parseInt(days as string, 10);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);
    startDate.setHours(0, 0, 0, 0);

    const trend = await Analytics.aggregate([
      {
        $match: {
          firstVisit: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$firstVisit' },
          },
          visitors: { $sum: 1 },
          pageViews: { $sum: { $size: '$pages' } },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: '$_id',
          visitors: 1,
          pageViews: 1,
          _id: 0,
        },
      },
    ]);

    res.json({
      status: 'success',
      data: { trend },
    });
  } catch (error) {
    next(error);
  }
};
