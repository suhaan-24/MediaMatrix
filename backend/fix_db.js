import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const fix = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mediamatrix');
        console.log("Connected to DB.");
        const db = mongoose.connection.db;
        
        // Find them by regex just in case there are invisible spaces
        const docs = await db.collection('assets').find({ fileUrl: { $regex: /^\/uploads\// } }).toArray();
        console.log(docs.map(d => ({ title: d.title, url: d.fileUrl })));

        const res = await db.collection('assets').deleteMany({
            fileUrl: { $regex: /^\/uploads\// }
        });
        console.log(`Deleted ${res.deletedCount} broken test assets matching /uploads/.`);
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
fix();
