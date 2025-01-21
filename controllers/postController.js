import pool from '../db/pool.js';
import { body, validationResult } from 'express-validator';

const postList = async (req, res) => {
  const posts = await pool.query(
    'SELECT title, body, created_at, username, club FROM posts INNER JOIN users ON posts.user_id = users.id',
  );
  res.render('posts', { title: 'Posts', user: req.user, posts: posts.rows });
};

const createPost = (req, res) => {
  res.render('post_form', { title: 'Create Post', user: req.user });
};

const validatePost = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('body').trim().notEmpty().withMessage('Body is required'),
];

const createPostPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('post_form', {
      title: 'Create Post',
      errors: errors.array(),
      title: req.body.title,
      body: req.body.body,
    });
  }

  const { title, body } = req.body;
  const user_id = req.user.id;

  await pool.query(
    'INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3)',
    [title, body, user_id],
  );

  res.redirect('/posts');
};

export { postList, validatePost, createPost, createPostPost };
