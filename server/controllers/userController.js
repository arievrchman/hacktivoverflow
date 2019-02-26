const User = require('../models/userModel');
const { decrypt } = require('../helpers/encrypt');
const jwt = require('jsonwebtoken');

module.exports = {

  register(req, res) {
    console.log(req.body);
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        res.status(200).json({
          user,
          message: 'Successfully create account'
        })
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },

  login(req, res) {
    User
      .findOne({
        email: req.body.email
      })
      .then(data => {
        if (data) {
          const isValid = decrypt(req.body.password, data.password);
          if (isValid) {
            const token = jwt.sign({ data }, process.env.SECRET);
            res.status(200).json({
              token,
              message: 'Successfully login'
            })
          } else {
            res.status(404).json({
              message: 'Wrong password!'
            });
          }
        } else {
          res.status(404).json({
            message: 'Email is not registered'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error
        });
      });
  },

  checkUser(req, res) {
    User
      .findById(req.auth_user._id).select('-password')
      .then(data => {
        if (data) {
          res.status(200).json({
            data
          });
        } else {
          res.status(400).json({
            message: 'You must login first!'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  }

};
