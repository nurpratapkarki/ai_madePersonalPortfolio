import mongoose, { Document, Model, Schema } from 'mongoose';
import { PROJECT_CATEGORIES, ProjectCategory } from '../config/constants';

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  technologies: string[];
  category: ProjectCategory;
  images: {
    thumbnail?: string;
    gallery: string[];
  };
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  aiPrompts?: string[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IProjectModel extends Model<IProject> {
  incrementViewCount(projectId: string): Promise<void>;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    fullDescription: {
      type: String,
      maxlength: [10000, 'Full description cannot exceed 10000 characters'],
    },
    technologies: [{
      type: String,
      trim: true,
    }],
    category: {
      type: String,
      enum: Object.values(PROJECT_CATEGORIES),
      default: PROJECT_CATEGORIES.MANUAL,
    },
    images: {
      thumbnail: String,
      gallery: [String],
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    aiPrompts: [String],
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title before saving
projectSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Static method to increment view count
projectSchema.statics.incrementViewCount = async function (projectId: string): Promise<void> {
  await this.findByIdAndUpdate(projectId, { $inc: { viewCount: 1 } });
};

// Indexes
projectSchema.index({ slug: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ createdAt: -1 });

export const Project = mongoose.model<IProject, IProjectModel>('Project', projectSchema);
