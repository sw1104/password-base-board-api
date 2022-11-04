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

module.exports = {
  createPost,
};
