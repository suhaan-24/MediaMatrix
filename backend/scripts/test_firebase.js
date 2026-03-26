import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function testFirebase() {
  try {
    console.log("Testing Firebase Initialization...");
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles({ maxResults: 1 });
    
    console.log("✅ Firebase connection successful!");
    console.log("Bucket name:", bucket.name);
    process.exit(0);
  } catch (error) {
    console.error("❌ Firebase test failed:");
    console.error(error.message);
    process.exit(1);
  }
}

testFirebase();
