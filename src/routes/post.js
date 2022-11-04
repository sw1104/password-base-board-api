const express = require('express');
const router = express.Router();
const {
  validateCreatePostEmpty,
  validatePostInputValue,
  validatePasswordValue,
} = require('../middlewares/postValidate');

const postController = require('../controllers/post');

router.post(
  '/create',
  validateCreatePostEmpty,
  validatePostInputValue,
  postController.createPost
);

router.patch(
  '/:postId',
  validatePostInputValue,
  validatePasswordValue,
  postController.editPost
);
module.exports = { router };
