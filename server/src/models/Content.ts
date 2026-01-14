import mongoose, { Document, Schema } from 'mongoose';
import { CONTENT_SECTIONS, ContentSection } from '../config/constants';

export interface IContent extends Document {
  _id: mongoose.Types.ObjectId;
  section: ContentSection;
  data: Record<string, unknown>;
  updatedBy?: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    section: {
      type: String,
      required: [true, 'Section is required'],
      unique: true,
      enum: Object.values(CONTENT_SECTIONS),
    },
    data: {
      type: Schema.Types.Mixed,
      required: [true, 'Data is required'],
      default: {},
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Index on section
contentSchema.index({ section: 1 });

export const Content = mongoose.model<IContent>('Content', contentSchema);
