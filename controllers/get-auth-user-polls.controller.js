const Poll = require('../models/poll.model');
const User = require('../models/user.model');
const Option = require('../models/option.model');

module.exports = function(req, res, next) {
  if(!req.user) {
    return res.render('index');
  }
  User.getUserPolls(req.user._id, polls => {
    return res.json(polls);
  });
}