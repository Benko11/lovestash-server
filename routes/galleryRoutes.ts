import express from 'express';
import Gallery from '../models/Gallery';

const router = express.Router();

router.get('/', async (req, res) => {
    const gallery = await Gallery.find();
    res.json(gallery);
});

router.post('/', async (req, res) => {
    const { contents, name, size } = req.body;

    try {
        const gallery = new Gallery({ contents, name, size });

        const savedGallery = await gallery.save();
        res.json(savedGallery);
    } catch (err) {
        res.status(500);
        res.json({ message: err });
        console.error();
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const image = Gallery.findById(req.params.id);
        await image.remove();
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500);
        res.json({ message: err });
    }
});
export default router;
