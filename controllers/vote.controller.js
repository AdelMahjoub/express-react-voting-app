const Poll = require('../models/poll.model');
const User = require('../models/user.model');
const Option = require('../models/option.model');

module.exports = function(req, res, next) {
   if(!req.user) {
    return res.json({errors: ['Please login to participate']});
  }
  let userId = req.user['_id'];
  let pollId = req.params['pollId'];
  let optionId = req.params['optionId'];
  let validationErrors = [];

  User.findById(userId, (err, user) => {
    if(err) {
      return res.json({errors: ['Unexpected error, please try again']})
    }
    if(!user) {
      return res.json({errors: ['!! your browser did something unexpected, try login again']});
    }
    Poll.findById(pollId, (err, poll) => {
      if(err) {
        return res.json({errors: ['Unexpected error, please try again']})
      }
      if(!poll) {
        return res.json({errors: ['This poll no longer exists']});
      }
      if(poll.participants.indexOf(user._id) !== -1) {
        return res.json({errors: ['You have already voted in this poll']});
      }
      Option.findById(optionId, (err, option) => {
        if(err) {
          return res.json({errors: ['Unexpected error, please try again']})
        }
        if(!option) {
          return res.json({errors: ['This option no longer exists']});
        }
        if(option.partOf.toString() !== poll._id.toString()) {
          return res.json({errors: ['!! hacking is cool']});
        }
        option.votes ++;
        option.save(() => {
          poll.participants.push(user._id);
          poll.save(() => {
            return res.json({errors: []});
          });
        });
      });
    });
  });
}