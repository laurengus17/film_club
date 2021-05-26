const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Album } = require('../../db/models');

const router = express.Router();

const validateAlbum = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Album Name must be at least 2 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a description with at least 4 characters.'),
    handleValidationErrors,
];

router.get('/', asyncHandler(async (req, res) => {
    const albums = await Album.findAll()
    res.json(albums);
}))

router.post(
    '/',
    validateAlbum,
    asyncHandler(async (req, res) => {
    const { title, description, userId } = req.body;
    const album = await Album.create({ title, description, userId });

    return res.json({
        album,
    });
    }),
);

router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const album = req.body.album;
    const currentAlbum = await Album.findByPk(id);
    const newAlbum = await currentAlbum.update({title: album.title, description: album.description});
    return res.json({
        newAlbum,
    });
}));

router.delete('/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const album = await Album.findOne({ where: {id} });
        const deletedAlbum = await album.destroy();

        return res.json(deletedAlbum);
    })
)

module.exports = router;