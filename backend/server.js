import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import config from './src/config/index.js';
import connectDB from './src/config/db.js';
import healthRouter from './src/routes/health.js';
import authRoutes from './src/routes/authRoutes.js';
import assetRoutes from './src/routes/assetRoutes.js';
import searchRoutes from './src/routes/searchRoutes.js';
import folderRoutes from './src/routes/folderRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import analyticsRoutes from './src/routes/analyticsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

const app = express();

// --------------- Security & Performance ---------------
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());

// --------------- Logging ---------------
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

// --------------- CORS ---------------
app.use(cors({ origin: [config.clientUrl, 'http://localhost:5173'], credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  }
}));

// --------------- Routes ---------------
app.use('/api/health', healthRouter);
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

// --------------- Global Error Handler ---------------
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path} →`, err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// --------------- Start Server ---------------
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port} [${config.nodeEnv}]`);
});

export default app;
