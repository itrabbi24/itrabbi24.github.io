import mongoose, { Schema, model, models } from 'mongoose';

const AboutSchema = new Schema({
  bio: { type: String },
  avatar: { type: String, default: '' },
  location: { type: String },
  email: { type: String },
  phone: { type: String },
  github: { type: String },
  linkedin: { type: String },
  currentFocus: { type: String },
  yearsExperience: { type: String, default: '7+' },
  highlights: [{ type: String }],
  socialLinks: [{
    platform: String,
    url: String,
    icon: String,
  }],
}, { timestamps: true });

export default models.About || model('About', AboutSchema);
