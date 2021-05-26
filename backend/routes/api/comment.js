const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Comment } = require('../../db/models');

const router = express.Router();

const validateComment = [
    check('content')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Comment must be at least 4 characters.'),
    handleValidationErrors,
];

router.get('/', asyncHandler(async (req, res) => {
    const comments = await Comment.findAll()
    res.json(comments);
}))

router.post(
    '/',
    validateComment,
    asyncHandler(async (req, res) => {
    const { content, userId, imageId } = req.body;
    const comment = await Comment.create({ content, userId, imageId });

    return res.json({
        comment,
    });
    }),
);

router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const comment = req.body.comment;
    const currentComment = await Comment.findByPk(id);
    const newComment = await currentComment.update({content: comment.content});
    return res.json({
        newComment,
    });
}));

router.delete('/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        const deletedComment = await comment.destroy();

        return res.json(deletedComment);
    })
)

module.exports = router;