const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const albumRouter = require('./album.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/album', albumRouter)

module.exports = router;