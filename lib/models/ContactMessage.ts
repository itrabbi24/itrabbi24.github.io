import mongoose, { Schema, model, models } from 'mongoose';

const ContactMessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  ip: { type: String },
}, { timestamps: true });

export default models.ContactMessage || model('ContactMessage', ContactMessageSchema);
