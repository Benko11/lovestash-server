import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
    {
        contents: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        size: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Gallery', gallerySchema);
