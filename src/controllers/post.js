const postService = require('../services/post');

const createPost = async (req, res) => {
  const { title, content, password } = req.body;
  await postService.createPost(title, content, password);
  res.status(201).json({ message: '게시글 등록이 완료되었습니다.' });
};

const editPost = async (req, res) => {
  const { postId } = req.params;
  const { title, content, password } = req.body;
  await postService.editPost(postId, title, content, password);
  res.status(200).json({ message: '게시글 수정이 완료되었습니다.' });
};

module.exports = {
  createPost,
  editPost,
};
