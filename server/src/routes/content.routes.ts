import { Router } from 'express';
import Joi from 'joi';
import {
  getAllContent,
  getContentBySection,
  upsertContent,
  deleteContent,
} from '../controllers/content.controller';
import { verifyToken, isAdmin } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';

const router = Router();

// Validation schema
const contentSchema = Joi.object({
  section: Joi.string()
    .valid('hero', 'about', 'skills', 'contact', 'settings')
    .required(),
  data: Joi.object().required(),
});

// Public routes
router.get('/', getAllContent);
router.get('/:section', getContentBySection);

// Protected routes (Admin only)
router.post('/', verifyToken, isAdmin, validateBody(contentSchema), upsertContent);
router.delete('/:section', verifyToken, isAdmin, deleteContent);

export default router;
