import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Asset from './src/models/Asset.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');

const URLS = {
  video: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
  audio: 'https://archive.org/download/ChopinNocturneOp9No2/Chopin_Nocturne_Op_9_No_2.mp3',
  image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800'
};

const downloadFile = (url, filepath) => new Promise((resolve, reject) => {
  if (fs.existsSync(filepath) && fs.statSync(filepath).size > 100000) {
    console.log(`[Cache] ${filepath} exists.`);
    return resolve();
  }
  https.get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      return downloadFile(res.headers.location, filepath).then(resolve).catch(reject);
    }
    if (res.statusCode !== 200) return reject(`Failed ${res.statusCode}`);
    const fileStream = fs.createWriteStream(filepath);
    res.pipe(fileStream);
    fileStream.on('finish', () => fileStream.close(resolve));
  }).on('error', reject);
});

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mediamatrix');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
    
    // We need a dummy uploader user ID. Assuming Admin user exists.
    // Or just an arbitrary ObjectId if none exists.
    // Wait, let's fetch any user:
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({});
    const uploaderId = user ? user._id : new mongoose.Types.ObjectId();

    console.log("Downloading files...");
    const vidPath = path.join(uploadsDir, 'sample_vid.mp4');
    const audPath = path.join(uploadsDir, 'sample_aud.mp3');
    const imgPath = path.join(uploadsDir, 'sample_img.jpg');

    await downloadFile(URLS.video, vidPath);
    await downloadFile(URLS.audio, audPath);
    await downloadFile(URLS.image, imgPath);

    console.log("Adding to DB...");
    await Asset.create([
      {
        title: "Big Buck Bunny",
        description: "Classic open source test video",
        type: "video",
        fileUrl: "/uploads/sample_vid.mp4",
        mimetype: "video/mp4",
        size: fs.statSync(vidPath).size,
        tags: ["video", "sample", "bunny"],
        uploader: uploaderId
      },
      {
        title: "Chopin Nocturne Op. 9 No. 2",
        description: "Classical piano piece",
        type: "audio",
        fileUrl: "/uploads/sample_aud.mp3",
        mimetype: "audio/mpeg",
        size: fs.statSync(audPath).size,
        tags: ["audio", "chopin", "classical"],
        uploader: uploaderId
      },
      {
        title: "Majestic Mountains",
        description: "High quality photographic sample",
        type: "image",
        fileUrl: "/uploads/sample_img.jpg",
        mimetype: "image/jpeg",
        size: fs.statSync(imgPath).size,
        tags: ["image", "mountain", "nature"],
        uploader: uploaderId
      }
    ]);
    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
seed();
