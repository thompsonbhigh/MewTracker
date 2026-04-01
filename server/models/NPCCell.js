import mongoose from "mongoose";

const npcCellSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true,
        },
        npc: {
            type: String,
            required: true,
        },
        imageIndex: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            max: 20,
        },
    },
    {
        timestamps: true,
    }
);

npcCellSchema.index({ userId: 1, npc: 1 }, { unique: true });

export default mongoose.model('NpcCell', npcCellSchema);