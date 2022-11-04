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

const removePost = async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;
  await postService.removePost(postId, password);
  res.status(200).json({ message: '게시글 삭제가 완료되었습니다.' });
};

const getPostList = async (req, res) => {
  const data = await postService.getPostList();
  res.status(200).json(data);
};

module.exports = {
  createPost,
  editPost,
  removePost,
  getPostList,
};
