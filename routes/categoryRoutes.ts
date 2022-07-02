import express from 'express';
import Category from '../models/Category';
import Poem from '../models/Poem';

const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.json(category);
});

router.post('/', async (req, res) => {
    try {
        const data = {
            type: req.body.type,
        };

        const category = new Category(data);
        const createdCategory = await category.save();

        res.status(201);
        res.json(createdCategory);
    } catch (err) {
        res.status(500);
        res.json({ message: err });
    }
});

export default router;
