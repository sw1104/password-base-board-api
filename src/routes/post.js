const express = require('express');
const router = express.Router();
const {
  validateCreatePostEmpty,
  validatePostInputValue,
} = require('../middlewares/postValidate');

const postController = require('../controllers/post');
/**
 * @swagger
 *
 * /post/create:
 *  post:
 *    summary: "게시글 등록"
 *    description: "POST 방식으로 게시글을 등록합니다."
 *    tags: [Post]
 *    requestBody:
 *      description: 제목과 본문 및 비밀번호를 전달합니다. 비밀번호는 숫자가 하나 이상 포함되어야 하며 6자리 이상이어야 합니다. 제목은 20자 이하여야 하며 본문은 200자 이내만 가능합니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시글 내용"
 *              password:
 *                type: string
 *                description: "비밀번호"
 *    responses:
 *        "201":
 *          description: 게시글 등록 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    post:
 *                      type: object
 *                      example:
 *                              [{ "message": "게시글 등록이 완료되었습니다." }]
 */
router.post('/create', validateCreatePostEmpty, postController.createPost);

/**
 * @swagger
 * /post/{postId}:
 *   patch:
 *    summary: "게시글 수정"
 *    description: "Patch 방식을 통해 특정 게시글 수정합니다. 해당 게시글의 비밀번호를 입력해야합니다."
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: 게시글 id
 *        schema:
 *          type: integer
 *    requestBody:
 *      description: 제목과 본문 및 비밀번호를 전달합니다. 제목은 20자 이하여야 하며 본문은 200자 이내만 가능합니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시글 내용"
 *              password:
 *                type: string
 *                description: "게시글 비밀번호"
 *    responses:
 *      "200":
 *        description: 게시글 수정 완료
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [{
 *                       "message": "게시글 수정이 완료되었습니다."
 *                    }]
 */
router.patch('/:postId', validatePostInputValue, postController.editPost);

/**
 * @swagger
 * /post/delete/{postId}:
 *   patch:
 *    summary: "게시글 삭제"
 *    description: "Patch 방식을 통해 특정 게시글을 삭제합니다. 해당 게시글의 비밀번호를 입력해야합니다."
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: 게시글 id
 *        schema:
 *          type: integer
 *    requestBody:
 *      description: 비밀번호를 전달합니다.
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *                description: "게시글 비밀번호"
 *    responses:
 *      "200":
 *        description: 게시글 삭제 완료
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [{
 *                       "message": "게시글 삭제가 완료되었습니다."
 *                    }]
 */
router.patch('/delete/:postId', postController.removePost);

/**
 * @swagger
 * paths:
 *  /post:
 *    get:
 *      summary: "전체 게시글 최신순으로 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청합니다."
 *      tags: [Post]
 *      responses:
 *        "200":
 *          description: 전체 게시글 최신순으로 조회합니다.
 */
router.get('', postController.getPostList);
module.exports = { router };
