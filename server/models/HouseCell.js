import mongoose from "mongoose";

const houseCellSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
        },
        boss: {
            type: String,
            required: true,
        },
        imageIndex: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 4,
        },
    },
    {
        timestamps: true,
    }
);

houseCellSchema.index({ userId: 1, boss: 1 }, { unique: true });

export default mongoose.model('HouseCell', houseCellSchema);