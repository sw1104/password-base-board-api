const { appDataSource } = require('./dataSource');
const Post = require('../entities/Post');

const createPost = async (title, content, weather, hashedPassword) => {
  return await appDataSource
    .createQueryBuilder()
    .insert()
    .into(Post)
    .values({
      title: title,
      content: content,
      password: hashedPassword,
      weather: weather,
    })
    .execute();
};

const editPost = async (postId, title, content) => {
  return await appDataSource
    .createQueryBuilder()
    .update(Post)
    .set({
      title: title,
      content: content,
    })
    .where('id = :id', { id: postId })
    .execute();
};

const getPost = async postId => {
  return await appDataSource
    .getRepository(Post)
    .createQueryBuilder('posts')
    .where('id = :id', { id: postId })
    .getOne();
};

const getPasswordByPost = async postId => {
  return await appDataSource
    .getRepository(Post)
    .createQueryBuilder('posts')
    .where('id = :id', { id: postId })
    .getOne();
};

const removePost = async postId => {
  return await appDataSource
    .createQueryBuilder()
    .update(Post)
    .set({
      is_delete: 'true',
    })
    .where('id = :id', { id: postId })
    .execute();
};
module.exports = {
  createPost,
  editPost,
  getPost,
  getPasswordByPost,
  removePost,
};
