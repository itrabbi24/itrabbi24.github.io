import mongoose, { Schema, model, models } from 'mongoose';

const CertificationSchema = new Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String },
  credentialId: { type: String },
  verifyUrl: { type: String },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Certification || model('Certification', CertificationSchema);
