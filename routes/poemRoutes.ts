import express from 'express';
import Poem from '../models/Poem';

const router = express.Router();

router.get('/', async (req, res) => {
    const poems = await Poem.find().sort('createdAt');
    res.json(poems);
});

router.get('/:id', async (req, res) => {
    const poem = await Poem.findById(req.params.id);
    res.json(poem);
});

router.post('/', async (req, res) => {
    try {
        const data = {
            verses: req.body.verses,
            category: req.body.category,
        };

        const poem = new Poem(data);
        const createdPoem = await poem.save();

        res.status(201);
        res.json(createdPoem);
    } catch (err) {
        res.status(500);
        res.json({ message: err });
    }
});

router.patch('/:id/toggle', async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id);

        if (poem == null) {
            res.status(404);
            res.json({ message: 'Not found' });
            return;
        }

        const updatedPoem = await Poem.findByIdAndUpdate(req.params.id, {
            completed: !poem.completed,
        });
        res.json(updatedPoem);
    } catch (err) {
        res.status(500);
        res.json({ message: err });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const poem = await Poem.findById(id);

        if (poem == null) {
            res.status(404);
            res.json({ message: 'Not found' });
            return;
        }

        poem.verses = req.body.verses;
        const updatedPoem = await poem.update();
        res.json(updatedPoem);
    } catch (err) {
        res.status(500);
        res.json({ message: err });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const poem = await Poem.findById(id);
        if (poem == null) {
            res.status(404);
            res.json({ message: 'Not Found' });
            return;
        }

        await poem.remove();
        res.status(204);
        res.json({ message: 'Poem deleted :(' });
    } catch (err) {
        res.status(500);
        res.json({ message: err });
    }
});

export default router;
