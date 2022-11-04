const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'password base board API',
      description: '비밀번호를 기반으로 운영되는 게시판의 API 문서 입니다.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};
const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
