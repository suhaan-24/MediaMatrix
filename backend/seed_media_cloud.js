import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Asset from './src/models/Asset.js';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mediamatrix');
    
    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({});
    const uploaderId = user ? user._id : new mongoose.Types.ObjectId();

    console.log("Adding to DB...");
    await Asset.create([
      {
        title: "Big Buck Bunny Cloud",
        description: "Classic open source test video via URL",
        type: "video",
        fileUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        mimetype: "video/mp4",
        size: 158000000,
        tags: ["video", "sample", "bunny"],
        uploader: uploaderId
      },
      {
        title: "Sample Audio Cloud",
        description: "Small test audio",
        type: "audio",
        fileUrl: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
        mimetype: "audio/ogg",
        size: 500000,
        tags: ["audio", "sample", "alarm"],
        uploader: uploaderId
      },
      {
        title: "Majestic Mountains Cloud",
        description: "High quality photographic sample",
        type: "image",
        fileUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800",
        mimetype: "image/jpeg",
        size: 800000,
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
