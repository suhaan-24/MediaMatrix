import { v2 as cloudinary } from 'cloudinary';
import config from './index.js';

let cloudinaryConfigured = false;

try {
  if (config.cloudinary.cloudName && config.cloudinary.apiKey && config.cloudinary.apiSecret) {
    cloudinary.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiSecret,
    });
    cloudinaryConfigured = true;
    console.log('✅ Cloudinary configured successfully.');
  } else {
    console.warn('⚠️ Cloudinary credentials not set. Using local disk fallback for uploads.');
  }
} catch (error) {
  console.error('❌ Failed to configure Cloudinary:', error.message);
}

export { cloudinary, cloudinaryConfigured };
