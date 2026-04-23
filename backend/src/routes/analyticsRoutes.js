import express from 'express';
import Analytics from '../models/Analytics.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/analytics/track — record an event (public, no auth required)
router.post('/track', async (req, res) => {
  try {
    const { event, page, metadata } = req.body;
    if (!event) return res.status(400).json({ success: false, message: 'event is required' });

    await Analytics.create({
      event,
      page,
      userId: req.user?._id,
      metadata,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Analytics track error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to track event' });
  }
});

// GET /api/analytics/summary — admin stats (protected)
router.get('/summary', protect, async (req, res) => {
  try {
    const [totalEvents, pageViews, uniquePages] = await Promise.all([
      Analytics.countDocuments(),
      Analytics.countDocuments({ event: 'page_view' }),
      Analytics.distinct('page', { event: 'page_view' }),
    ]);

    const topPages = await Analytics.aggregate([
      { $match: { event: 'page_view' } },
      { $group: { _id: '$page', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
    ]);

    const recentEvents = await Analytics.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select('event page createdAt metadata');

    res.json({
      success: true,
      data: { totalEvents, pageViews, uniquePages: uniquePages.length, topPages, recentEvents },
    });
  } catch (err) {
    console.error('Analytics summary error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
});

export default router;
