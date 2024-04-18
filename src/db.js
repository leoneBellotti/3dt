import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://3DT:zaq123EDC%40@3dt.uwhsfjh.mongodb.net/?retryWrites=true&w=majority&appName=3DT')
        console.log('db connect');
    } catch (error) {
        console.log(error);
    }
}