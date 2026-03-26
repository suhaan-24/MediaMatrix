/**
 * Seed script — populates MongoDB with 10 sample assets using valid external image URLs.
 * Run: node seed.js
 */
import mongoose from 'mongoose';
import config from '../src/config/index.js';
import Asset from '../src/models/Asset.js';
import User from '../src/models/User.js';

const SEED_ASSETS = [
  { title: 'Mountain Sunrise', description: 'Golden light over snow-capped peaks', type: 'image', tags: ['nature', 'mountain', 'sunrise'], fileUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' },
  { title: 'Urban Architecture', description: 'Modern glass skyscrapers in a metropolitan city', type: 'image', tags: ['city', 'architecture', 'buildings'], fileUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800' },
  { title: 'Ocean Waves', description: 'Turquoise waves crashing on a tropical beach', type: 'image', tags: ['ocean', 'beach', 'tropical'], fileUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
  { title: 'Forest Path', description: 'Misty trail through ancient redwood forest', type: 'image', tags: ['forest', 'nature', 'trees'], fileUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800' },
  { title: 'Desert Dunes', description: 'Wind-sculpted sand dunes at golden hour', type: 'image', tags: ['desert', 'sand', 'landscape'], fileUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800' },
  { title: 'Autumn Leaves', description: 'Vibrant fall foliage in a Japanese garden', type: 'image', tags: ['autumn', 'leaves', 'garden'], fileUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' },
  { title: 'Night City Lights', description: 'Long exposure of city traffic at night', type: 'image', tags: ['night', 'city', 'lights'], fileUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800' },
  { title: 'Wildflower Meadow', description: 'Colorful wildflowers stretching to the horizon', type: 'image', tags: ['flowers', 'meadow', 'spring'], fileUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800' },
  { title: 'Abstract Geometry', description: 'Bold geometric shapes in modern art style', type: 'image', tags: ['abstract', 'art', 'geometry'], fileUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800' },
  { title: 'Coffee Morning', description: 'Artisan latte art in a ceramic cup', type: 'image', tags: ['coffee', 'lifestyle', 'food'], fileUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800' },
];

async function seed() {
  try {
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB');

    // Find or create a seed user
    let user = await User.findOne({ email: 'seed@mediamatrix.com' });
    if (!user) {
      user = await User.create({ name: 'Seed User', email: 'seed@mediamatrix.com', password: 'seed123456', role: 'admin' });
      console.log('Created seed user');
    }

    // Insert assets (skip duplicates by title)
    let inserted = 0;
    for (const asset of SEED_ASSETS) {
      const exists = await Asset.findOne({ title: asset.title });
      if (!exists) {
        await Asset.create({ ...asset, mimetype: 'image/jpeg', size: 500000, uploader: user._id });
        inserted++;
      }
    }
    console.log(`Seeded ${inserted} new assets (${SEED_ASSETS.length - inserted} already existed)`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
