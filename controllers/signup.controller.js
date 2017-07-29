const Poll = require('../models/poll.model');
const User = require('../models/user.model');
const Option = require('../models/option.model');

const shortid = require('shortid');

module.exports = function(req, res, next) {
  let validationErrors = [];
  let username = shortid.generate();
  let newUser = new User({
    username: username,
    email: req.body['email'],
    password: req.body['password']
  });

  User.create(newUser, (err, user) => {
    if(err) {
      Object.keys(err['errors']).forEach(key => {
        validationErrors.push(err['errors'][key]['message'])
      });
      return res.json({errors: validationErrors});
    }
    return next();
  });
}