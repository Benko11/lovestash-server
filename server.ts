import express from 'express';
import { config } from 'dotenv';
import poemRoutes from './routes/poemRoutes';
import categoryRoutes from './routes/categoryRoutes';
import galleryRoutes from './routes/galleryRoutes';
import cors from 'cors';
import mongoose from 'mongoose';

config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.connect(MONGODB_URI, () => console.log('Connected to MongoDB!'));

app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use('/poems', poemRoutes);
app.use('/categories', categoryRoutes);
app.use('/gallery', galleryRoutes);

const PORT = process.env.PORT ? +process.env.PORT : 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
