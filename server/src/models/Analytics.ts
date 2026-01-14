import mongoose, { Document, Model, Schema } from 'mongoose';

interface IPageView {
  path: string;
  timestamp: Date;
  duration?: number;
}

export interface IAnalytics extends Document {
  _id: mongoose.Types.ObjectId;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  pages: IPageView[];
  country?: string;
  device?: string;
  firstVisit: Date;
  lastVisit: Date;
}

interface IAnalyticsModel extends Model<IAnalytics> {
  recordPageView(
    sessionId: string,
    page: string,
    metadata?: { ipAddress?: string; userAgent?: string; referrer?: string }
  ): Promise<IAnalytics>;
  getVisitorStats(startDate: Date, endDate: Date): Promise<{
    totalVisitors: number;
    totalPageViews: number;
    uniquePages: number;
  }>;
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    ipAddress: {
      type: String,
      default: 'anonymous',
    },
    userAgent: {
      type: String,
      default: '',
    },
    referrer: String,
    pages: [{
      path: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      duration: Number,
    }],
    country: String,
    device: String,
    firstVisit: {
      type: Date,
      default: Date.now,
    },
    lastVisit: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Static method to record page view
analyticsSchema.statics.recordPageView = async function (
  sessionId: string,
  page: string,
  metadata?: { ipAddress?: string; userAgent?: string; referrer?: string }
): Promise<IAnalytics> {
  // Anonymize IP address for privacy (keep only first two octets)
  let anonymizedIp = 'anonymous';
  if (metadata?.ipAddress) {
    const ipParts = metadata.ipAddress.split('.');
    if (ipParts.length === 4) {
      anonymizedIp = `${ipParts[0]}.${ipParts[1]}.0.0`;
    }
  }

  // Detect device type from user agent
  let device = 'desktop';
  if (metadata?.userAgent) {
    const ua = metadata.userAgent.toLowerCase();
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      device = 'mobile';
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      device = 'tablet';
    }
  }

  const pageView: IPageView = {
    path: page,
    timestamp: new Date(),
  };

  const result = await this.findOneAndUpdate(
    { sessionId },
    {
      $push: { pages: pageView },
      $set: {
        lastVisit: new Date(),
        ipAddress: anonymizedIp,
        userAgent: metadata?.userAgent || '',
        referrer: metadata?.referrer || '',
        device,
      },
      $setOnInsert: {
        firstVisit: new Date(),
      },
    },
    { upsert: true, new: true }
  );

  return result;
};

// Static method to get visitor stats
analyticsSchema.statics.getVisitorStats = async function (
  startDate: Date,
  endDate: Date
): Promise<{ totalVisitors: number; totalPageViews: number; uniquePages: number }> {
  const stats = await this.aggregate([
    {
      $match: {
        lastVisit: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: null,
        totalVisitors: { $sum: 1 },
        totalPageViews: { $sum: { $size: '$pages' } },
        allPages: { $push: '$pages.path' },
      },
    },
    {
      $project: {
        totalVisitors: 1,
        totalPageViews: 1,
        uniquePages: {
          $size: {
            $setUnion: [{ $reduce: { input: '$allPages', initialValue: [], in: { $concatArrays: ['$$value', '$$this'] } } }],
          },
        },
      },
    },
  ]);

  return stats[0] || { totalVisitors: 0, totalPageViews: 0, uniquePages: 0 };
};

// Indexes
analyticsSchema.index({ sessionId: 1 });
analyticsSchema.index({ lastVisit: -1 });
analyticsSchema.index({ firstVisit: -1 });

export const Analytics = mongoose.model<IAnalytics, IAnalyticsModel>('Analytics', analyticsSchema);
