const express = require('express');
const router = express.Router();
const {
  validateCreatePostEmpty,
  validatePostInputValue,
  validatePasswordValue,
} = require('../middlewares/postValidate');

const postController = require('../controllers/post');

validatePasswordValue,
  router.post(
    '/create',
    validateCreatePostEmpty,
    validatePostInputValue,
    postController.createPost
  );

module.exports = { router };
