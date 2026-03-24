import mongoose, { Schema, model, models } from 'mongoose';

const HeroContentSchema = new Schema({
  name: { type: String, default: 'ARG Rabby' },
  title: { type: String, default: 'Full-Stack Developer' },
  roles: [{ type: String }],
  description: { type: String },
  stats: [{
    label: String,
    value: String,
  }],
  availableForWork: { type: Boolean, default: true },
  cvUrl: { type: String, default: '/cv.pdf' },
}, { timestamps: true });

export default models.HeroContent || model('HeroContent', HeroContentSchema);
