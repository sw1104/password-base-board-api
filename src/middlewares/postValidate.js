const { body } = require('express-validator');
const { validate } = require('../middlewares/validate');

const validatePassword = value => {
  const reg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d+)[A-Za-z\d]{6,}$/);
  if (reg.test(value)) return true;
};

const validateCreatePostEmpty = [
  body('title')
    .notEmpty()
    .withMessage('제목을 입력해 주세요.')
    .isLength({ max: 20 })
    .withMessage('제목의 길이가 너무 깁니다. 20자 이하로 작성해 주세요.'),
  body('content')
    .notEmpty()
    .withMessage('본문을 입력해 주세요')
    .isLength({ max: 200 })
    .withMessage('본문의 내용이 너무 깁니다. 200자 이하로 작성해 주세요.'),
  body('password')
    .notEmpty()
    .withMessage('게시글 비밀번호를 입력해주세요.')
    .trim()
    .custom(validatePassword)
    .withMessage('비밀번호 형식이 잘못 되었습니다.'),
  validate,
];

const validatePostInputValue = [
  body('title')
    .isLength({ max: 20 })
    .withMessage('제목의 길이가 너무 깁니다. 20자 이하로 작성해 주세요.'),
  body('content')
    .isLength({ max: 200 })
    .withMessage('본문의 내용이 너무 깁니다. 200자 이하로 작성해 주세요.'),
  validate,
];

const validatePasswordValue = [
  body('password')
    .trim()
    .custom(validatePassword)
    .withMessage('비밀번호 형식이 잘못 되었습니다.'),
];
module.exports = {
  validateCreatePostEmpty,
  validatePostInputValue,
  validatePasswordValue,
};
