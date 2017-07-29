const db        = require('../services/db.service'); // require the db connection
const validator = require('validator');              // https://github.com/chriso/validator.js

const User = require('./user.model');
const Option = require('./option.model');

const PollSchema = db.Schema({
  title       : String,                                           //Title of the poll
  postedBy    : {type: db.Schema.Types.ObjectId, ref: 'User'},    //Author's _id of the poll (User who posted the poll)
  createdAt   : {type: Date, default: new Date()},                //Date of creation
  participants: [{type: db.Schema.Types.ObjectId, ref: 'User'}],  //Participants _ids (Users who took part in this poll)
  options     : [{type: db.Schema.Types.ObjectId, ref: 'Option'}] //Poll's options _ids 
});

PollSchema.statics.getAllPolls = function(callback) {
  return this.find({}, {options: 0})
    .populate({
      path: 'postedBy',
      select: { __v: 0, password: 0, polls: 0, email: 0, signupDate: 0 }
    })
    .exec((err, polls) => {
      if(err) {
        console.log('Error while fetching all polls: ', err);
        return callback([]); 
      }
      return callback(polls);
    });
}

PollSchema.statics.getPollById = function(pollId, callback) {
  return this.findOne({_id: pollId}, {__v: 0})
    .populate({
      path: 'options',
      select: { __v: 0 }
    })
    .exec((err, poll) => {
      if(err) {
        console.log('Error while fetching all polls: ', err);
        return callback({}); 
      }
      return callback(poll);
    });
}

const Poll = db.model('Poll', PollSchema);

module.exports = Poll;