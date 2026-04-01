import mongoose from "mongoose";

const trackerCellSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
        },
        zone: {
            type: String,
            required: true,
        },
        className: {
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

trackerCellSchema.index({ userId: 1, zone: 1, className: 1 }, { unique: true });

export default mongoose.model('TrackerCell', trackerCellSchema);