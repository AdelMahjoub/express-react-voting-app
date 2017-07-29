const Poll = require('../models/poll.model');
const User = require('../models/user.model');
const Option = require('../models/option.model');

module.exports = function(req, res, next) {
  let pollId = req.params['id'];
  Poll.getPollById(pollId, poll => {
    return res.json(poll);
  });
}