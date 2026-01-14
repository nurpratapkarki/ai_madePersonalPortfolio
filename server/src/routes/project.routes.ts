import { Router } from 'express';
import Joi from 'joi';
import {
  getAllProjects,
  getProjectBySlug,
  incrementViewCount,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';
import { verifyToken, isAdmin } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';

const router = Router();

// Validation schemas
const projectSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(500).required(),
  fullDescription: Joi.string().max(10000),
  technologies: Joi.array().items(Joi.string()),
  category: Joi.string().valid('ai-generated', 'manual', 'hybrid'),
  images: Joi.object({
    thumbnail: Joi.string(),
    gallery: Joi.array().items(Joi.string()),
  }),
  liveUrl: Joi.string().uri().allow(''),
  githubUrl: Joi.string().uri().allow(''),
  featured: Joi.boolean(),
  aiPrompts: Joi.array().items(Joi.string()),
});

const updateProjectSchema = projectSchema.fork(
  ['title', 'description'],
  (schema) => schema.optional()
);

// Public routes
router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);
router.post('/:id/view', incrementViewCount);

// Protected routes (Admin only)
router.post('/', verifyToken, isAdmin, validateBody(projectSchema), createProject);
router.put('/:id', verifyToken, isAdmin, validateBody(updateProjectSchema), updateProject);
router.delete('/:id', verifyToken, isAdmin, deleteProject);

export default router;
