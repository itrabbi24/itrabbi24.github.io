import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDesc: { type: String },
  image: { type: String, default: '' },
  category: { type: String, default: 'All' },
  techStack: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
}, { timestamps: true });

export default models.Project || model('Project', ProjectSchema);
