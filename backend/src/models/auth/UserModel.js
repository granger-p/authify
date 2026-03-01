import mongoose from "mongoose";    
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],     
    },
    email: {
        type: String,   
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },  
    password: {
        type: String,
        required: [true, 'Password is required'],     
    },
    photo: {
        type: String,   
        default: 'https://res.cloudinary.com/dzj6dhn0n/image/upload/v1702050867/default-avatar_ajlq8h.png',
    },
    bio :{
        type: String,
        default : 'I am a new user.',
    },
    role: {
        type: String,
        enum: ['user', 'admin','creator'],
        default: 'user',
    },  
    isVerified: {
        type: Boolean,
        default: false,
    },  
}, { timestamps: true , minimize: true });
const User = mongoose.model('User', userSchema);
export default User;
