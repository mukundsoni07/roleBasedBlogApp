import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
}, { timestamps: true });


export default mongoose.model('User', userSchema);