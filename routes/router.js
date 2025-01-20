import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.send(`${req.user ? `Hello, ${req.user.username}!` : 'Hello, world!'}`);
});

router.get('/sign-in', userController.signIn);

router.post('/sign-in', userController.signInPost);

router.get('/sign-up', userController.signUp);

router.get('/log-out', userController.logOut);

export default router;
