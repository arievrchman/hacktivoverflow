const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { encrypt } = require('../helpers/encrypt');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be blank']
  },
  email: {
    type: String,
    required: [true, 'Email cannot be blank'],
    validate: {
      isAsync: true,
      validator(value) {
        return new Promise((resolve, reject) => {
          User
            .findOne({ email: value }, { $ne: this._id })
            .then(found => {
              if (found) {
                reject(false);
              } else {
                resolve(true);
              }
            })
            .catch(error => {
              throw error;
            });
        });
      },
      message: 'Email already exists!'
    }
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank']
  },
  userPicture: {
    type: String
  }
});

userSchema.pre('save', function(next) {
  this.password = encrypt(this.password);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;