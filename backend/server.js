import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import config from './config/index.js';
import connectDB from './config/db.js';
import healthRouter from './routes/health.js';
import authRoutes from './routes/authRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
connectDB();

const app = express();

// --------------- Middleware ---------------
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve raw uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --------------- Routes ---------------
app.use('/api/health', healthRouter);
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/search', searchRoutes);

// --------------- Start Server ---------------
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port} [${config.nodeEnv}]`);
});

export default app;
