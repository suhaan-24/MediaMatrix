import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Asset from './src/models/Asset.js';

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Atlas...');

    const db = mongoose.connection.db;
    const user = await db.collection('users').findOne({});
    const uid = user ? user._id : new mongoose.Types.ObjectId();

    await Asset.deleteMany({});
    console.log('Cleared old assets...');

    await Asset.create([
      // ───── IMAGES ─────
      { title: 'Majestic Mountain Range', description: 'Snow-capped peaks at golden hour', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800', mimetype: 'image/jpeg', size: 820000, tags: ['mountain', 'nature', 'landscape'], uploader: uid },
      { title: 'City Skyline at Night', description: 'Urban cityscape with neon lights', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', mimetype: 'image/jpeg', size: 750000, tags: ['city', 'night', 'urban'], uploader: uid },
      { title: 'Tropical Beach Paradise', description: 'Crystal clear turquoise water and white sand', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', mimetype: 'image/jpeg', size: 910000, tags: ['beach', 'tropical', 'travel'], uploader: uid },
      { title: 'Abstract Colorful Gradient', description: 'Vibrant gradient background for design projects', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800', mimetype: 'image/jpeg', size: 650000, tags: ['abstract', 'gradient', 'colorful', 'design'], uploader: uid },
      { title: 'Spring Cherry Blossoms', description: 'Pink cherry blossom trees in full bloom', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1490750967868-88df5691cc21?w=800', mimetype: 'image/jpeg', size: 780000, tags: ['spring', 'flowers', 'nature', 'pink'], uploader: uid },
      { title: 'Professional Business Meeting', description: 'Team collaborating in a modern office', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800', mimetype: 'image/jpeg', size: 690000, tags: ['business', 'meeting', 'office', 'team'], uploader: uid },
      { title: 'Golden Hour Forest', description: 'Sunlight streaming through dense forest trees', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800', mimetype: 'image/jpeg', size: 870000, tags: ['forest', 'nature', 'sunlight', 'trees'], uploader: uid },
      { title: 'Minimalist Architecture', description: 'Modern white building with clean geometric lines', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800', mimetype: 'image/jpeg', size: 720000, tags: ['architecture', 'minimalist', 'design', 'building'], uploader: uid },
      { title: 'Vintage Film Camera', description: 'Classic 35mm film camera on wooden table', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', mimetype: 'image/jpeg', size: 610000, tags: ['camera', 'vintage', 'photography'], uploader: uid },
      { title: 'Colorful Abstract Art', description: 'Digital art with swirling colors', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800', mimetype: 'image/jpeg', size: 560000, tags: ['art', 'abstract', 'colorful', 'digital'], uploader: uid },
      { title: 'Ocean Wave Closeup', description: 'Powerful wave breaking on the shore', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800', mimetype: 'image/jpeg', size: 800000, tags: ['ocean', 'wave', 'water', 'nature'], uploader: uid },
      { title: 'Aerial City View', description: 'Bird eye view of a dense urban city', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800', mimetype: 'image/jpeg', size: 940000, tags: ['aerial', 'city', 'urban', 'drone'], uploader: uid },
      { title: 'Desert Sand Dunes', description: 'Rolling sand dunes under a clear blue sky', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800', mimetype: 'image/jpeg', size: 670000, tags: ['desert', 'sand', 'nature', 'landscape'], uploader: uid },
      { title: 'Portrait of a Smile', description: 'Candid portrait with natural lighting', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800', mimetype: 'image/jpeg', size: 580000, tags: ['portrait', 'people', 'smile'], uploader: uid },
      { title: 'Technology Flat Lay', description: 'Modern tech gadgets arranged on a desk', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', mimetype: 'image/jpeg', size: 720000, tags: ['technology', 'gadgets', 'flat lay'], uploader: uid },

      // ───── VIDEOS ─────
      { title: 'Big Buck Bunny', description: 'Classic open-source animated short film — great for testing video playback', type: 'video', fileUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', mimetype: 'video/mp4', size: 158000000, tags: ['animation', 'sample', 'open source'], uploader: uid },
      { title: 'Elephant Dream', description: 'Open-source 3D animated short by Blender Foundation', type: 'video', fileUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', mimetype: 'video/mp4', size: 54000000, tags: ['animation', '3d', 'blender', 'sample'], uploader: uid },
      { title: 'For Bigger Blazes', description: 'Sample HD video footage for demonstration', type: 'video', fileUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', mimetype: 'video/mp4', size: 11000000, tags: ['video', 'hd', 'sample', 'footage'], uploader: uid },
      { title: 'Subaru Outback', description: 'Product demo video sample', type: 'video', fileUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', mimetype: 'video/mp4', size: 31000000, tags: ['video', 'car', 'product', 'demo'], uploader: uid },
      { title: 'Tears of Steel', description: 'Open-source sci-fi short film by Blender Foundation', type: 'video', fileUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', mimetype: 'video/mp4', size: 738000000, tags: ['sci-fi', 'film', 'blender', 'open source'], uploader: uid },

      // ───── AUDIO ─────
      { title: 'Alarm Clock Ring', description: 'Classic alarm clock sound effect', type: 'audio', fileUrl: 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg', mimetype: 'audio/ogg', size: 120000, tags: ['alarm', 'sound effect', 'clock'], uploader: uid },
      { title: 'Bugle Call', description: 'Traditional military bugle call', type: 'audio', fileUrl: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg', mimetype: 'audio/ogg', size: 90000, tags: ['bugle', 'military', 'music', 'sound effect'], uploader: uid },
      { title: 'Digital Doorbell', description: 'Modern electronic doorbell chime', type: 'audio', fileUrl: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg', mimetype: 'audio/ogg', size: 85000, tags: ['doorbell', 'chime', 'sound effect'], uploader: uid },
      { title: 'Cartoon Jump', description: 'Fun cartoon jump sound effect', type: 'audio', fileUrl: 'https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg', mimetype: 'audio/ogg', size: 70000, tags: ['cartoon', 'jump', 'sound effect', 'fun'], uploader: uid },
      { title: 'Dog Bark', description: 'Realistic dog barking sound', type: 'audio', fileUrl: 'https://actions.google.com/sounds/v1/animals/dog_barking.ogg', mimetype: 'audio/ogg', size: 95000, tags: ['dog', 'animal', 'sound effect'], uploader: uid },
    ]);

    console.log(`✅ Seeded 25 assets (15 images, 5 videos, 5 audio)`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
