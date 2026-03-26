import admin from 'firebase-admin';
import config from './index.js';

let bucket = null;

try {
  // Check if credentials are real or placeholder
  const isPlaceholder = !config.firebase.serviceAccountKey || config.firebase.serviceAccountKey.includes('YOUR_KEY');
  
  if (!isPlaceholder) {
    const serviceAccount = JSON.parse(config.firebase.serviceAccountKey);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: config.firebase.storageBucket
    });
    
    bucket = admin.storage().bucket();
    console.log('✅ Firebase Admin SDK initialized successfully.');
  } else {
    console.warn('⚠️ Firebase Service Account Key not found or is placeholder. Using local disk fallback for new uploads.');
  }
} catch (error) {
  console.error('❌ Failed to initialize Firebase Admin SDK:', error.message);
}

export { bucket };
