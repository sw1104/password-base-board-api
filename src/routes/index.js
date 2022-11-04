const express = require('express');
const router = express.Router();

const postRouter = require('./post');

router.use('/post', postRouter.router);

module.exports = router;
