const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    require: [true, 'name is mandatory']
  },
  surname: {
    type: String
  },
  email: {
    type: String,
    require: [true, 'email is mandatory']
  },
  password: {
    type: String,
    require: [true, 'password is mandatory']
  },
  state: {
    type: Boolean,
    default: true
  }
});

module.exports = model('User', UserSchema);