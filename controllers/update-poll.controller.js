const Poll = require('../models/poll.model');
const User = require('../models/user.model');
const Option = require('../models/option.model');

module.exports = function(req, res, next) {
 if(!req.user) {
    return res.render('index');
  }
  let errors = [];
  let data = req.body;
   User.findOneAndUpdate({_id: req.user._id}, {$pull: {polls: data.pollId}}, (err, user) => {
    if(err) {
      errors.push('Unexpected error:' + err);
      return res.json({errors});
    }
    if(!user) {
      errors.push('User not found.');
      return res.json({errors});
    }
    Option.remove({partOf: data.pollId}, (err) => {
      if(err) {
        errors.push('Unexpected error:' + err);
        return res.json({errors});
      }
      Poll.remove({_id: data.pollId}, (err) => {
        if(err) {
          errors.push('Unexpected error:' + err);
          return res.json({errors});
        }
        //instanciate a new poll document without options
        let newPoll = new Poll({
          title: data.title,
          postedBy: user._id,
        });
        //instanciate new options
        let options = [];
        data.options.forEach((option, index) => {
          let newOption = new Option({
            label: option.label,
            partOf: newPoll._id
          });
          //temporary store the options
          options.push(newOption);
          //update the new poll options field
          newPoll.options.push(newOption._id);
        });
        //Insert the options in the options collection
        Option.insertMany(options, (err) => {
          if(err) {
            errors.push('Unexpected error, please try again.');
            return res.json({errors});
          }
          //Insert the new poll in the polls collection
          Poll.create(newPoll, (err) => {
            if(err) {
              errors.push('Unexpected error, please try again.');
              return res.json({errors});
            }
            //Update the user polls
            User.findByIdAndUpdate(user._id, {$push: {polls: newPoll._id}}, (err, updatedUser) => {
              if(err) {
                errors.push('Unexpected error, please try again.');
                return res.json({errors});
              }
              //At this point errors should be empty
              //And the collections were updated
              return res.json({errors});
            });
          });
        });
      });
    });
  });
}