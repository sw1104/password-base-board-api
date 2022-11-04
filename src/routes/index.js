const express = require('express');
const router = express.Router();

const postRouter = require('./post');
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: 게시판 API
 */
router.use('/post', postRouter.router);

module.exports = router;
