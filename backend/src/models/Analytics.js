import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema(
  {
    event: { type: String, required: true },
    page: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    metadata: { type: mongoose.Schema.Types.Mixed },
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

analyticsSchema.index({ event: 1, createdAt: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;
