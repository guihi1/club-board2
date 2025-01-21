import passport from 'passport';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import pool from '../db/pool.js';

const clubSecret = 'club';

const signUp = async (req, res) => {
  res.render('user_form', { title: 'Sign Up', user: req.user });
};

const validateSignUp = [
  body('fname').trim().notEmpty().withMessage('First name is required'),
  body('lname').trim().notEmpty().withMessage('Last name is required'),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')
    .custom(async (username) => {
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username],
      );
      if (result.rows.length > 0) {
        throw new Error('Username is already taken');
      }
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('confirm_password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
  body('club_passcode')
    .optional()
    .custom((value) => {
      if (value && value !== clubSecret) {
        throw new Error('Invalid club passcode');
      }
      return true;
    }),
];

const signUpPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('user_form', {
      title: 'Sign Up',
      errors: errors.array(),
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      admin: req.body.admin,
      club_passcode: req.body.club_passcode,
    });
  }

  const { fname, lname, username, password, admin, club_passcode } = req.body;

  try {
    const isClubMember = club_passcode === clubSecret;
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, first_name, last_name, admin, club, password) VALUES ($1, $2, $3, $4, $5, $6)',
      [username, fname, lname, admin || false, isClubMember, hashedPassword],
    );

    res.redirect('/sign-in');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const signIn = async (req, res) => {
  res.render('user_form', { title: 'Sign In', user: req.user });
};

const signInPost = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
});

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

export { signUp, signUpPost, signIn, signInPost, logOut, validateSignUp };
