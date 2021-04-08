import dotenv from 'dotenv';
import express, { response } from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';

import Cards from './dbCards.js';

dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = process.env.DB;

// Middleware
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello World!'));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) response.status(500).send(err);
        else res.status(201).send(data);
    });
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        err
            ? res.status(500).send(err)
            : res.status(200).send(data);
    });
});

// Listener
app.listen(port, _ => console.log(`Listening on localhost: ${port}`));