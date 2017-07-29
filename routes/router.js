require('../configs/passport-local-strategy.config')();
const bodyParser = require('body-parser'); // https://github.com/expressjs/body-parser
const passport   = require('passport');    // http://passportjs.org/
const util       = require('util')         // https://nodejs.org/dist/latest-v6.x/docs/api/util.html
const shortid    = require('shortid');

const router = require('../server')['router']; // require the router instance
const locals = require('../server')['locals']; // require the views globals

const Poll   = require('../models/poll.model');
const User   = require('../models/user.model');
const Option = require('../models/option.model');

const voteController         = require('../controllers/vote.controller');
const getAllPollsController  = require('../controllers/get-all-polls.controller');
const getUserPollsController = require('../controllers/get-a-user-polls.controller');
const getPollByIdController  = require('../controllers/get-a-poll-by-id.controller');
const getAuthUserPolls       = require('../controllers/get-auth-user-polls.controller');
const addPollController      = require('../controllers/add-poll.controller');
const signupController       = require('../controllers/signup.controller');
const updatePollController   = require('../controllers/update-poll.controller');
const deletePollController   = require('../controllers/delete-poll.controller');

router.use(bodyParser.json());

//====================================================
//                GET REQUESTS ROUTES
//====================================================

// landing page
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET all polls
router.get('/api/polls', getAllPollsController);

// GET a user polls
router.get('/api/polls/users/:id', getUserPollsController);

// GET a poll by id
router.get('/api/polls/:id', getPollByIdController);

//GET: vote in poll
router.get('/api/polls/vote/:pollId/:optionId', voteController);

// GET: delete a poll
router.get('/api/polls/delete/:id', deletePollController);

// GET authenticated user polls
router.get('/api/dashboard', getAuthUserPolls);

// logout user
router.get('/api/logout', (req, res, next) => {
  req.logout();
  res.json({});
});

// check if user isAuthenticated
router.get('/api/check-user', (req, res, next) => {
  if(req.user) {
    return res.json(true);
  }
  return res.json(false);
});

// unmatched requests handler
router.get('*', (req, res, next) => {
  res.render('index');
});

//====================================================
//                POST REQUESTS ROUTES
//====================================================

// Add a poll
router.post('/api/polls/add', addPollController);

// Update a poll
router.post('/api/polls/update', updatePollController);

// Login user with posted credentials
router.post('/api/login', passport.authenticate('local'),(req, res, next) => {
  return res.json(true);
});

// Register user with posted credentials
router.post('/api/signup', signupController, passport.authenticate('local'), (req, res, next) => {
  return res.json({errors: []});
});

// Render only, SPA
router.use((err, req, res, next) => {
  let patt = /^\/api\/(.)+/
  if(!patt.test(req.url)) {
    return res.render('index');
  }
});

module.exports = router;