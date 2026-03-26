import fs from 'fs';
import path from 'path';

async function testUpload() {
  try {
    console.log("1. Logging in...");
    const loginRes = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'seed@mediamatrix.com', password: 'seed123456' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log("Login success! Token acquired.");

    console.log("2. Preparing file for upload...");
    const testFilePath = path.join(process.cwd(), 'e2e_test_image.jpg');
    if (!fs.existsSync(testFilePath)) {
      fs.writeFileSync(testFilePath, 'fake image content for testing multer pipeline');
    }

    const fileBuffer = fs.readFileSync(testFilePath);
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' });
    
    const form = new FormData();
    form.append('file', blob, 'e2e_test_image.jpg');
    form.append('title', 'Native Fetch E2E Test');
    form.append('description', 'This proves the upload pipeline works.');
    form.append('tags', 'test, e2e, backend');

    console.log("3. Sending POST /api/assets...");
    const uploadRes = await fetch('http://localhost:5001/api/assets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: form
    });
    const uploadData = await uploadRes.json();

    console.log("Upload Success! Response:");
    console.log(JSON.stringify(uploadData, null, 2));

    console.log("4. Verifying DB record...");
    const searchRes = await fetch('http://localhost:5001/api/assets?search=Native');
    const searchData = await searchRes.json();
    console.log(`Found ${searchData.count} matching assets.`);
    console.log("File URL is: " + searchData.data[0].fileUrl);
    
    fs.unlinkSync(testFilePath);
    console.log("Test completely passed.");
  } catch (err) {
    console.error("Test failed:");
    console.error(err.message);
  }
}

testUpload();
