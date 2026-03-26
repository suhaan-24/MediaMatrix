import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import config from './src/config/index.js';
import connectDB from './src/config/db.js';
import healthRouter from './src/routes/health.js';
import authRoutes from './src/routes/authRoutes.js';
import assetRoutes from './src/routes/assetRoutes.js';
import searchRoutes from './src/routes/searchRoutes.js';
import folderRoutes from './src/routes/folderRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to MongoDB
connectDB();

const app = express();

// --------------- Middleware ---------------
app.use(cors({ origin: [config.clientUrl, 'http://localhost:5175'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve raw uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --------------- Routes ---------------
app.use('/api/health', healthRouter);
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/folders', folderRoutes);

// --------------- Start Server ---------------
app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port} [${config.nodeEnv}]`);
});

export default app;
