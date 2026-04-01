import express from 'express';
import TrackerCell from '../models/TrackerCell.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const cells = await TrackerCell.find({ userId: req.params.userId }).lean();
        res.json(cells);
    } catch (error) {
        console.error('Failed to fetch tracker data: ', error);
        res.status(500).json({ error: 'Failed to fetch tracker data' });
    }
});

router.post('/cell', async (req, res) => {
    console.log('POST /api/tracker/cell hit', req.body);
    try {
        const { userId, zone, className, imageIndex } = req.body;

        if (!userId || !zone || !className || imageIndex === undefined) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const updatedCell = await TrackerCell.findOneAndUpdate(
            { userId, zone, className },
            { userId, zone, className, imageIndex },
            { returnDocument: 'after', upsert: true, runValidators: true }
        );

        console.log('saved cell: ', updatedCell);
        res.json(updatedCell);
    } catch (error) {
        console.error('Failed to save cell data: ', error);
        res.status(500).json({ error: 'Failed to save cell data' });
    }
});

export default router;