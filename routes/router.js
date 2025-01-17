import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  //res.redirect('/posts');
  res.send('In construction');
});

router.get('/sign-in', userController.signIn);

router.get('/sign-up', userController.signUp);

export default router;
