const routes = require('express').Router();
const { postAnswer, findAllAnswer, findOneAnswer, updateAnswer, deleteAnswer, upVoteAnswer, downVoteAnswer, findQuestionOfAnswer } = require('../../controllers/answerController');
const { Auth } = require('../../middlewares/auth');

routes.get('/', findAllAnswer);
routes.get('/:questionId', findQuestionOfAnswer);
// routes.get('/:id', findOneAnswer);


// Auth user only
routes.use(Auth);
routes.post('/:questionId', postAnswer);

module.exports = routes;