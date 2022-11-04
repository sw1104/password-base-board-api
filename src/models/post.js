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

module.exports = {
  createPost,
};
