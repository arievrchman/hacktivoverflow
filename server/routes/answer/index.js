const routes = require('express').Router();
const { postAnswer, findAllAnswer, findOneAnswer, updateAnswer, deleteAnswer, upVoteAnswer, downVoteAnswer, findQuestionOfAnswer } = require('../../controllers/answerController');
const { Auth } = require('../../middlewares/auth');

routes.get('/', findAllAnswer);
routes.get('/:id', findOneAnswer);
routes.get('/p/:questionId', findQuestionOfAnswer);


// Auth user only
routes.use(Auth);
routes.post('/:questionId', postAnswer);
routes.put('/:id', updateAnswer);
routes.delete('/:id', deleteAnswer);
routes.post('/:id/upvotes', upVoteAnswer);
routes.post('/:id/downvotes', downVoteAnswer);

module.exports = routes;