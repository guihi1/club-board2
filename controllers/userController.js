import passport from 'passport';

const signUp = async (req, res) => {
  res.render('user_form', { title: 'Sign Up', user: req.user });
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

export { signUp, signIn, signInPost, logOut };
