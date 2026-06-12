const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,  // Give it 10 seconds to connect
            socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`\n❌ MongoDB Connection Failed: ${err.message}`);
        console.error(`\n   ⚠️  ACTION REQUIRED:`);
        console.error(`   1. Go to https://cloud.mongodb.com`);
        console.error(`   2. Click your Cluster → it may say "Paused"`);
        console.error(`   3. Click "Resume" and wait ~30 seconds`);
        console.error(`   4. Then restart this server with: node server.js\n`);
        // Don't crash — server still runs, but DB calls will fail gracefully
    }
};

// Middleware to check DB before handling auth requests
const requireDB = (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            message: 'Database is temporarily unavailable. Please try again in a moment. (If this persists, the MongoDB Atlas cluster may be paused — go to cloud.mongodb.com to resume it.)'
        });
    }
    next();
};

module.exports = { connectDB, requireDB };
