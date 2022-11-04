const request = require('supertest');

const { createApp } = require('../../app');
const { appDataSource } = require('../models/dataSource');

describe('post create test', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await appDataSource.initialize();
    await appDataSource.query(
      `
      INSERT INTO posts(
        title,
        content,
        password,
        weather,
        is_delete
      ) VALUES
        ("제목", "본문", "123qwe", "맑음","false"),
        ("제목", "본문", "123qwe", "맑음","true")
      `
    );
  });

  afterAll(async () => {
    await appDataSource.query(`TRUNCATE posts`);
    await appDataSource.destroy();
  });

  test('SUCCESS: 게시글 등록', async () => {
    await request(app)
      .post('/post/create')
      .send({
        title: '제목 입니다',
        content: '본문 내용 입니다.',
        password: '123qwe',
      })
      .expect(201)
      .expect({ message: '게시글 등록이 완료되었습니다.' });
  });

  test('FAILED: title 누락', async () => {
    await request(app)
      .post('/post/create')
      .send({
        content: '본문 내용 입니다.',
        password: '123qwe',
      })
      .expect(400)
      .expect({ message: '제목을 입력해 주세요.', statusCode: 400 });
  });

  test('FAILED: content 누락', async () => {
    await request(app)
      .post('/post/create')
      .send({
        title: '제목 입니다.',
        password: '123qwe',
      })
      .expect(400)
      .expect({ message: '본문을 입력해 주세요.', statusCode: 400 });
  });

  test('FAILED: password 누락', async () => {
    await request(app)
      .post('/post/create')
      .send({
        title: '제목 입니다.',
        content: '본문 입니다.',
      })
      .expect(400)
      .expect({
        message: '게시글 비밀번호를 입력해주세요.',
        statusCode: 400,
      });
  });

  test('FAILED: title 길이 초과', async () => {
    await request(app)
      .post('/post/create')
      .send({
        title: '제목제목제목제목제목제목제목제목제목제목.',
        content: '본문 입니다.',
        password: '123qwe',
      })
      .expect(400)
      .expect({
        message: '제목의 길이가 너무 깁니다. 20자 이하로 작성해 주세요.',
        statusCode: 400,
      });
  });

  test('FAILED: content 길이 초과', async () => {
    await request(app)
      .post('/post/create')
      .send({
        title: '제목',
        content:
          '본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문.',
        password: '123qwe',
      })
      .expect(400)
      .expect({
        message: '본문의 내용이 너무 깁니다. 200자 이하로 작성해 주세요.',
        statusCode: 400,
      });
  });

  test('FAILED: password 형식 에러', async () => {
    await request(app)
      .post('/post/create')
      .send({
        title: '제목',
        content: '본문 입니다.',
        password: '1',
      })
      .expect(400)
      .expect({
        message: '비밀번호 형식이 잘못 되었습니다.',
        statusCode: 400,
      });
  });

  // test('SUCCESS: 게시글을 수정합니다.', async () => {
  //   await request(app)
  //     .patch('/post/1')
  //     .send({
  //       password: '123qwe',
  //     })
  //     .expect(200);
  // });

  test('FAILED: 수정할 게시글이 없는 경우', async () => {
    await request(app)
      .patch('/post/999')
      .expect(400)
      .expect({ message: '게시글이 존재하지 않습니다.', statusCode: 400 });
  });

  test('FAILED: title 길이 초과', async () => {
    await request(app)
      .patch('/post/1')
      .send({
        title: '제목제목제목제목제목제목제목제목제목제목.',
        content: '본문 입니다.',
        password: '123qwe',
      })
      .expect({
        message: '제목의 길이가 너무 깁니다. 20자 이하로 작성해 주세요.',
        statusCode: 400,
      });
  });

  test('FAILED: content 길이 초과', async () => {
    await request(app)
      .patch('/post/1')
      .send({
        title: '제목',
        content:
          '본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문.',
        password: '123qwe',
      })
      .expect({
        message: '본문의 내용이 너무 깁니다. 200자 이하로 작성해 주세요.',
        statusCode: 400,
      });
  });

  test('FAILED: password 다름', async () => {
    await request(app)
      .patch('/post/1')
      .send({
        title: '제목',
        content: '본문 입니다.',
        password: '112qwe',
      })
      .expect(401)
      .expect({
        message: '비밀번호가 다릅니다.',
        statusCode: 401,
      });
  });

  test('FAILED: 이미 삭제된 게시글인 경우', async () => {
    await request(app)
      .patch('/post/delete/2')
      .expect(404)
      .expect({ message: '이미 삭제된 게시글 입니다.', statusCode: 404 });
  });

  test('FAILED: password 다를 경우', async () => {
    await request(app)
      .patch('/post/delete/1')
      .send({
        password: '12124q',
      })
      .expect(401)
      .expect({
        message: '비밀번호가 다릅니다.',
        statusCode: 401,
      });
  });

  test('SUCCESS: 게시글 전체 리스트 최신순으로 불러오기', async () => {
    await request(app).get('/post').expect(200);
  });
});
