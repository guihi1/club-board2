import { body, validationResult } from 'express-validator';

const signUp = async (req, res) => {
  res.render('user_form', { title: 'Sign Up' });
};

const signIn = async (req, res) => {
  res.render('user_form', { title: 'Sign In' });
};

export { signUp, signIn };
