const Poll = require('../models/poll.model');
const User = require('../models/user.model');
const Option = require('../models/option.model');

module.exports = function(req, res, next) {
   let id = req.params['id'];
  User.getUserPolls(id, polls => {
    return res.json(polls);
  })
}