const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const albumRouter = require('./album.js');
const photoRouter = require('./photo.js')
const commentRouter = require('./comment.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/album', albumRouter);
router.use('/photo', photoRouter);
router.use('/comment', commentRouter);

module.exports = router;