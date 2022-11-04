const postService = require('../services/post');

const createPost = async (req, res) => {
  const { title, content, password } = req.body;
  await postService.createPost(title, content, password);
  res.status(201).json({ message: '게시글 등록이 완료되었습니다.' });
};

module.exports = {
  createPost,
};
