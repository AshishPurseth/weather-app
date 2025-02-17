import mongoose from 'mongoose'

const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ipg'

let isConnected = false;

export const connectToDatabase = async () => {
    if (isConnected) {
        return mongoose;
    }

    try {
        const db = await mongoose.connect(MONGO_URI);
        isConnected = true;
        console.log('✅ MongoDB connection established');
        return db;
    } catch (error) {
        console.error('MongoDB connection failed', error);
        throw new Error('MongoDB connection failed');
    }
}
