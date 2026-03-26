import { Router } from 'express';
import mongoose from 'mongoose';
import { bucket } from '../config/firebase.js';
import { esClient } from '../config/elasticsearch.js';

const router = Router();

router.get('/', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  // Firebase Storage status
  let storageStatus = 'not_configured';
  if (bucket) {
    try {
      await bucket.exists();
      storageStatus = 'connected';
    } catch {
      storageStatus = 'error';
    }
  }

  // Elasticsearch status
  let searchStatus = 'not_configured';
  if (esClient) {
    try {
      const info = await esClient.ping();
      searchStatus = 'connected';
    } catch {
      searchStatus = 'error';
    }
  }

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus[dbState] || 'unknown',
    storage: storageStatus,
    search: searchStatus,
  });
});

export default router;
