const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Photo } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

const validatePhoto = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 2 })
        .withMessage('Photo title must be at least 2 characters.'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a description with at least 4 characters.'),
    handleValidationErrors,
];

router.get('/', asyncHandler(async (req, res) => {
    const photos = await Photo.findAll()
    return res.json({photos});
}));


router.post(
    '/',
    singleMulterUpload("image"),
    validatePhoto,
    asyncHandler(async (req, res) => {
    const { title, description, userId, albumId } = req.body;
    const newImage = await singlePublicFileUpload(req.file);
    const photo = await Photo.create({ title, description, url: newImage, userId, albumId });
    return res.json({
        photo,
    });
    }),
);

router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const photo = req.body.photo;
    const currentPhoto = await Photo.findByPk(id);
    const newPhoto = await currentPhoto.update({title: photo.title, description: photo.description, url: photo.url, userId: photo.userId, albumId: photo.albumId});
    return res.json({
        newPhoto,
    });
}));

router.delete('/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const photo = await Photo.findByPk(id);
        const deletedPhoto = await photo.destroy();

        return res.json(deletedPhoto);
    })
)


module.exports = router;