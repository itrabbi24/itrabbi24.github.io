import mongoose, { Schema, model, models } from 'mongoose';

const SkillSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['Backend', 'Frontend', 'Database', 'Mobile', 'DevOps', 'Tools', 'Language'],
    required: true
  },
  proficiency: { type: Number, min: 0, max: 100, default: 80 },
  icon: { type: String, default: '' },
  color: { type: String, default: '#6366f1' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Skill || model('Skill', SkillSchema);
