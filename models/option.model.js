const db        = require('../services/db.service'); // require the db connection
const validator = require('validator');              // https://github.com/chriso/validator.js

const OptionSchema = db.Schema({
  label   : String,                     //Option's name
  votes   : {type: Number, default: 0}, //Votes counter(How often the option was voted)
  partOf: {type: db.Schema.Types.ObjectId, ref: 'Poll'} //Poll's _id which had this option
});

const Option = db.model('Option', OptionSchema);

module.exports = Option;