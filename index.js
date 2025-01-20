import Express from 'express';
import router from './routes/router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import passport from 'passport';
import configurePassport from './passport-config.js';

const app = Express();
const port = 3000;

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(Express.urlencoded({ extended: true })); // For parsing form data
app.use(Express.json()); // For parsing JSON bodies
app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
