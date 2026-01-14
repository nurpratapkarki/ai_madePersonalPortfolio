import { Router } from 'express';
import Joi from 'joi';
import {
  trackPageView,
  getStats,
  getVisitors,
  getPopularPages,
  getVisitorTrend,
} from '../controllers/analytics.controller';
import { verifyToken, isAdmin } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';

const router = Router();

// Validation schema
const trackSchema = Joi.object({
  sessionId: Joi.string(),
  page: Joi.string().required(),
  referrer: Joi.string().allow(''),
});

// Public routes
router.post('/track', validateBody(trackSchema), trackPageView);

// Protected routes (Admin only)
router.get('/stats', verifyToken, isAdmin, getStats);
router.get('/visitors', verifyToken, isAdmin, getVisitors);
router.get('/popular-pages', verifyToken, isAdmin, getPopularPages);
router.get('/trend', verifyToken, isAdmin, getVisitorTrend);

export default router;
