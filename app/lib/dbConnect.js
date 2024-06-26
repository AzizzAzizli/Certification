import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        // console.log(process.env.NEXT_PUBLIC_MONGODB_URI);
   await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI.toString(), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });                                                                                                                     
        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    } 
}

export default connectToDB                            