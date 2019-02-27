const routes = require('express').Router();
const { postQuestion, findAllQuestion, findOneQuestion, updateQuestion, deleteQuestion, upVoteQuestion, downVoteQuestion, findTheAnswers } = require('../../controllers/questionController');
const { Auth } = require('../../middlewares/auth');

routes.get('/', findAllQuestion);
routes.get('/:id', findOneQuestion);
// routes.get('/:questionId', findTheAnswers);


// Auth User Only
routes.use(Auth);
routes.post('/', postQuestion);
routes.put('/:id', updateQuestion);
routes.delete('/:id', deleteQuestion);
routes.post('/:id/upvotes', upVoteQuestion);
routes.post('/:id/downvotes', downVoteQuestion);

module.exports = routes;