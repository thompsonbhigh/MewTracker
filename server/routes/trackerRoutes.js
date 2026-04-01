import express from 'express';
import TrackerCell from '../models/TrackerCell.js';
import HouseCell from '../models/HouseCell.js';
import NPCCell from '../models/NPCCell.js';

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

router.get('/total/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const total = await TrackerCell.aggregate([
            { $match: { userId: userId }},
            {
                $group: {
                    _id: null,
                    total: { $sum: "$imageIndex" }
                }
            }
        ]);

        const result = total[0]?.total || 0;
        const percentage = parseInt((result / 504) * 100);
        res.json({ total: percentage });
    } catch (error) {
        console.error('Failed to get total', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/house/:userId', async (req, res) => {
    try {
        const cells = await HouseCell.find({ userId: req.params.userId }).lean();
        res.json(cells);
    } catch (error) {
        console.error('Failed to fetch tracker data: ', error);
        res.status(500).json({ error: 'Failed to fetch tracker data' });
    }
});

router.post('/house-cell', async (req, res) => {
    console.log('POST /api/tracker/house-cell hit', req.body);
    try {
        const { userId, boss, imageIndex } = req.body;

        if (!userId || !boss || imageIndex === undefined) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const updatedCell = await HouseCell.findOneAndUpdate(
            { userId, boss },
            { userId, boss, imageIndex },
            { returnDocument: 'after', upsert: true, runValidators: true }
        );

        console.log('saved cell: ', updatedCell);
        res.json(updatedCell);
    } catch (error) {
        console.error('Failed to save cell data: ', error);
        res.status(500).json({ error: 'Failed to save cell data' });
    }
});

router.get('/house-total/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const total = await HouseCell.aggregate([
            { $match: { userId: userId }},
            {
                $group: {
                    _id: null,
                    total: { $sum: "$imageIndex" }
                }
            }
        ]);

        const result = total[0]?.total || 0;
        const percentage = parseInt((result / 36) * 100);
        res.json({ total: percentage });
    } catch (error) {
        console.error('Failed to get total', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/npc/:userId', async (req, res) => {
    try {
        const cells = await NPCCell.find({ userId: req.params.userId }).lean();
        res.json(cells);
    } catch (error) {
        console.error('Failed to fetch tracker data: ', error);
        res.status(500).json({ error: 'Failed to fetch tracker data' });
    }
});

router.post('/npc-cell', async (req, res) => {
    console.log('POST /api/tracker/npc-cell hit', req.body);
    try {
        const { userId, npc, imageIndex } = req.body;

        if (!userId || !npc || imageIndex === undefined) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        const updatedCell = await NPCCell.findOneAndUpdate(
            { userId, npc },
            { userId, npc, imageIndex },
            { returnDocument: 'after', upsert: true, runValidators: true }
        );

        console.log('saved cell: ', updatedCell);
        res.json(updatedCell);
    } catch (error) {
        console.error('Failed to save cell data: ', error);
        res.status(500).json({ error: 'Failed to save cell data' });
    }
});

router.get('/npc-total/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const total = await NPCCell.aggregate([
            { $match: { userId: userId }},
            {
                $group: {
                    _id: null,
                    total: { $sum: "$imageIndex" }
                }
            }
        ]);

        const result = total[0]?.total || 0;
        const percentage = parseInt((result / 49) * 100);
        res.json({ total: percentage });
    } catch (error) {
        console.error('Failed to get total', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;