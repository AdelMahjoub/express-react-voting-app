const db        = require('../services/db.service'); // require the db connection
const validator = require('validator');              // https://github.com/chriso/validator.js
const bcrypt    = require('bcrypt-nodejs');          // https://www.npmjs.com/package/bcrypt-nodejs

const Poll = require('./poll.model');

const passwordMinLength = 6;
const usernameMinLength = 4;

const UserSchema = db.Schema({

  username:{
    type: String,
    unique: true, 
    required: 'Username is required.',
    validate: [
      {
        validator: function(value) {
          return /[a-zA-Z0-9_-]+/g.test(value);
        },
        msg: 'Username should not contain special characters.'
      },
      {
        validator: function(value) {
          return value.length >= usernameMinLength;
        },
        msg: 'Username length should be at least 4 characters.'
      },
      {
        isAsync: true,
        validator: function(value, respond) {
          if(this.username && !this.isModified('username')) {
            return respond(true);
          }
          User.findOne({username: value}, (err, doc) => {
            if(err) return console.log(err);
            return respond(!Boolean(doc)); 
          });
        },
        msg: 'Username already in use.'
      }
    ]
  },
  email: {
    type: String,
    unique: true,
    required: 'Email is required.',
    validate: [
      {
        validator: function(value) {
          return validator.isEmail(value);
        },
        msg: 'Email is not valid.'
      },
      {
        isAsync: true,
        validator: function(value, respond) {
          if(this.email && !this.isModified('email')) {
            respond(true);
          }
          User.findOne({email: value}, (err, doc) => {
            if(err) return console.log(err);
            return respond(!Boolean(doc));
          });
        },
        msg: 'Email adress already in use.'
      },
    ]
  },
  password: {
    type: String,
    required: 'Password is required.',
    validate: {
      validator: function(value) {
        return value.length >= 6;
      },
      msg: 'Password length, 6 characters minimum.'
    }
  },
  signupDate: {
    type: Date,
    default: Date.now()
  },
  polls: [{type: db.Schema.Types.ObjectId, ref: 'Poll'}],
  firstName: {
    type: String,
    validate: {
      validator: function(value) {
        return validator.isAlpha(value);
      },
      msg: 'The firstname should not contains numbers or special chararacters.'
    }
  },
  lastName: {
    type: String,
    validate: {
      validator: function(value) {
        return validator.isAlpha(value);
      },
      msg: 'The lastname should not contains numbers or special chars.'
    }
  },
  age: {
    type: Number,
    validate: {
      validator: function(value) {
        return validator.isDecimal(value.toString());
      }
    }
  }
});

UserSchema.statics.getUserPolls = function(userId, callback) {
  return this.findById(userId, {password: 0, __v: 0, email: 0})
    .populate({
      path: 'polls',
    })
    .exec((err, user) => {
      if(err) {
        console.log('Error while fetching user polls: ', err);
        return callback([]); 
      }
      return callback(user['polls']);
    });
}

UserSchema.pre('save', function(done) {
  let user = this;
  if(!user.isModified('password')) return done();
  bcrypt.genSalt(10, (err, salt) => {
    if(err) return done();
    bcrypt.hash(user.password,salt, () => {}, (err, hash) => {
      if(err) return done();
      user.password = hash;
      done();
    });
  });
});

UserSchema.methods.comparePasswords = function(guess, password, done) {
  bcrypt.compare(guess, password, function(err, isMatch) {
    return done(err, isMatch);
  });
}

const User = db.model('User', UserSchema);

module.exports = User;
