const routes = require('express').Router();
const userRoutes = require('./user/index');
const questionRoutes = require('./question/index');
const answerRoutes = require('./answer/index');

routes.get('/', (req, res) => {
  res.json({ message: 'Connected' });
});

routes.use('/users', userRoutes);
routes.use('/questions', questionRoutes);
routes.use('/answer', answerRoutes);

module.exports = routes;