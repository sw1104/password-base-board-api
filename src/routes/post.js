const express = require('express');
const router = express.Router();
const {
  validateCreatePostEmpty,
  validatePostInputValue,
} = require('../middlewares/postValidate');

const postController = require('../controllers/post');

router.post('/create', validateCreatePostEmpty, postController.createPost);
router.patch('/:postId', validatePostInputValue, postController.editPost);
router.patch('/delete/:postId', postController.removePost);
module.exports = { router };
