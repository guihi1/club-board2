import express from 'express';
import * as userController from '../controllers/userController.js';
import * as postController from '../controllers/postController.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.redirect('/posts');
});

router.get('/posts', postController.postList);

router.get('/posts/new', postController.createPost);

router.post(
  '/posts/new',
  postController.validatePost,
  postController.createPostPost,
);

router.post('/posts/:id/delete', postController.deletePost);

router.get('/sign-in', userController.signIn);

router.post('/sign-in', userController.signInPost);

router.get('/sign-up', userController.signUp);

router.post(
  '/sign-up',
  userController.validateSignUp,
  userController.signUpPost,
);

router.get('/log-out', userController.logOut);

export default router;
