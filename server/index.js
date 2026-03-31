import express from 'express';
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: ['http://127.0.0.1:5173'],
    })
);

app.get('/', (req, res) => {
    res.send('server here!');
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'HELLO!' });
});

app.listen(3000, () => {
    console.log('Server running on htpp://localhost:3000');
});