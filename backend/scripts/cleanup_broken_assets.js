/**
 * Removes assets whose fileUrl points to local disk (/uploads/...)
 * These files are gone from Render's ephemeral storage.
 * Run: node scripts/cleanup_broken_assets.js
 */
import mongoose from 'mongoose';
import config from '../src/config/index.js';
import Asset from '../src/models/Asset.js';

async function cleanup() {
  await mongoose.connect(config.mongodbUri);
  console.log('Connected to MongoDB');

  const broken = await Asset.find({ fileUrl: /^\/uploads\// });
  console.log(`Found ${broken.length} broken asset(s) with local /uploads/ paths:`);
  broken.forEach(a => console.log(` - ${a._id} | ${a.title} | ${a.fileUrl}`));

  if (broken.length === 0) {
    console.log('Nothing to clean up.');
    process.exit(0);
  }

  const result = await Asset.deleteMany({ fileUrl: /^\/uploads\// });
  console.log(`Deleted ${result.deletedCount} broken asset(s).`);
  process.exit(0);
}

cleanup().catch(err => { console.error(err); process.exit(1); });
