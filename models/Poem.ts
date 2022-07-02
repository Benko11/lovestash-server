import mongoose from 'mongoose';

const poemSchema = new mongoose.Schema(
    {
        verses: { type: String, required: true, unique: true },
        completed: { type: Boolean, required: true, default: false },
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Poem', poemSchema);
