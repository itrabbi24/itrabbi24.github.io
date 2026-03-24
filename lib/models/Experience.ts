import mongoose, { Schema, model, models } from 'mongoose';

const ExperienceSchema = new Schema({
  type: { type: String, enum: ['work', 'education'], required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  period: { type: String, required: true },
  description: { type: String },
  highlights: [{ type: String }],
  techStack: [{ type: String }],
  current: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Experience || model('Experience', ExperienceSchema);
