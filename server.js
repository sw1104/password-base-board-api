require('dotenv').config();

const { createApp } = require('./app');
const { appDataSource } = require('./src/models/dataSource');

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  appDataSource
    .initialize()
    .then(() => {
      console.log('Data Source ha been initialized!');
    })
    .catch(err => {
      console.error('Error occurred during Data Source initialization', err);
      appDataSource.destroy();
    });

  /**
   * 서버 통신 테스트
   */
  app.get('/test', (req, res) => {
    res.status(200).json({ message: 'SUCCESS!' });
  });

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
