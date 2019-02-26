const routes = require('express').Router();
const { register, login, checkUser } = require('../../controllers/userController');
const { Auth } = require('../../middlewares/auth');

routes.post('/signup', register);
routes.post('/login', login);
routes.get('/auth', Auth, checkUser);

module.exports = routes;