const postModel = require('../models/post');
const bcrypt = require('bcrypt');
const BaseError = require('../utils/baseError');
const axios = require('axios');

const createPost = async (title, content, password) => {
  const weatherInfo = await axios.get(
    'http://api.weatherapi.com/v1/current.json?key=' +
      process.env.API_Key +
      '&q=Seoul&lang=ko'
  );
  const currentCondition = weatherInfo.data.current.condition.text;
  const currentTemp = weatherInfo.data.current.temp_c;
  const weather =
    '날씨는 ' + currentCondition + '이며, 기온은 ' + currentTemp + '도 입니다.';

  const hashedPassword = await bcrypt.hash(password, 12);

  await postModel.createPost(title, content, weather, hashedPassword);
};

const editPost = async (postId, title, content, password) => {
  const isExistPost = await postModel.getPost(postId);
  if (!isExistPost || isExistPost.is_delete === 'true')
    throw new BaseError('게시글이 존재하지 않습니다.', 400);

  const getPassword = await postModel.getPasswordByPost(postId);
  const decode = await bcrypt.compare(password, getPassword.password);

  if (!decode) throw new BaseError('비밀번호가 다릅니다.', 401);

  await postModel.editPost(postId, title, content, password);
};

const removePost = async (postId, password) => {
  const isExistPost = await postModel.getPost(postId);
  if (!isExistPost) throw new BaseError('게시글이 존재하지 않습니다.', 400);
  if (isExistPost.is_delete === 'true')
    throw new BaseError('이미 삭제된 게시글 입니다.', 404);

  const getPassword = await postModel.getPasswordByPost(postId);
  const decode = await bcrypt.compare(password, getPassword.password);

  if (!decode) throw new BaseError('비밀번호가 다릅니다.', 401);
  await postModel.removePost(postId);
};

module.exports = {
  createPost,
  editPost,
  removePost,
};
