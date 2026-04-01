import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db.js';
import trackerRoutes from './routes/trackerRoutes.js';

const app = express();

connectDB();

app.use(
    cors({
        origin: ['http://localhost:5173'],
    })
);
app.use(express.json());
app.use('/api/tracker', trackerRoutes);

app.get('/', (req, res) => {
    res.send('server here!');
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'HELLO!' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});