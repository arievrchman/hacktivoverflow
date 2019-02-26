const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = {
  Auth(req, res, next) {
    // console.log(req.headers);
    try {
      const { data } = jwt.verify(req.headers.token, process.env.SECRET);
      if (data) {
        User
          .findOne({
            email: data.email
          })
          .then(data => {
            req.auth_user = data;
            next();
          })
          .catch(error => {
            res.status(400).json({
              error,
              message: 'No such user'
            });
          });
      }
    } catch (error) {
      res.status(401).json({
        message: 'Invalid token'
      });
    }
  }
};
