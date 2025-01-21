import pool from '../db/pool.js';
import { body, validationResult } from 'express-validator';

const postList = async (req, res) => {
  const posts = await pool.query(
    'SELECT title, body, created_at, username, club FROM posts INNER JOIN users ON posts.user_id = users.id',
  );
  res.render('posts', { user: req.user, posts: posts.rows });
};

export { postList };
