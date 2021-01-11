import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        lowercase: true,
    },
    lastName: {
        type: String,
        lowercase: true,
    },
    phoneNumber: {
        type: Number,
        lowercase: true,
    },
    images: [
        {
            imageId: {
                type: mongoose.Schema.Types.ObjectId,
            },
            title: {
                type: String
            },
            image: {
                data: Buffer,
                type: String
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now 
      },
    updatedAt: {
        type: Date,
        default: Date.now 
    }
 });
 
 export default mongoose.model("User", UserSchema);
