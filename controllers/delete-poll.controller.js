const Poll = require('../models/poll.model');
const User = require('../models/user.model');
const Option = require('../models/option.model');

module.exports = function(req, res, next) {
  if(!req.user) {
    return res.render('index');
  }
  let id = req.params['id']
  let errors = [];
  User.findOneAndUpdate({_id: req.user._id}, {$pull: {polls: id}}, (err, user) => {
    if(err) {
      errors.push('Unexpected error:' + err);
      return res.json({errors});
    }
    if(!user) {
      errors.push('User not found.');
      return res.json({errors});
    }
    Option.remove({partOf: id}, (err) => {
      if(err) {
        errors.push('Unexpected error:' + err);
        return res.json({errors});
      }
      Poll.remove({_id: id}, (err) => {
        if(err) {
          errors.push('Unexpected error:' + err);
          return res.json({errors});
        }
        return res.json({errors});
      });
    });
  });
}