const Answer = require('../models/answerModel');

module.exports = {
  postAnswer(req, res) {
    Answer
      .create({
        owner: req.auth_user._id,
        questionId: req.params.questionId,
        description: req.body.description
      })
      .then(data => {
        res.status(201).json({
          data,
          message: 'Your answer has been added'
        })
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  findAllAnswer(req, res) {
    Answer
      .find({})
      .then(data => {
        res.status(200).json({
          data
        });
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      })
  },
  findOneAnswer(req, res) {
    Answer
      .findById(req.params.id)
      .then(data => {
        res.status(200).json({
          data
        });
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  updateAnswer(req, res) {
    Answer
      .findByIdAndUpdate(req.params.id, {
        description: req.body.description,
        updated_at: new Date
      }, { new: true })
      .then(data => {
        res.status(200).json({
          data,
          message: 'Your answer has been updated'
        });
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  deleteAnswer(req, res) {
    Answer
      .findByIdAndDelete(req.params.id)
      .then(data => {
        res.status(200).json({
          data,
          message: 'Your answer has been deleted'
        });
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  upVoteAnswer(req, res) {
    Answer
      .findOne({
        _id: req.params.id
      })
      .then(data => {
        let isTrue = data.upvotes.filter(userId => {
          return String(userId) === String(req.auth_user._id);
        });

        if (!isTrue.length || !data.upvotes.length) {
          return Answer
            .findOneAndUpdate({ _id: req.params.id }, {
              $push: { upvotes: req.auth_user._id }
            }, { new: true })
        } else {
          return Answer
            .findOneAndUpdate({ _id: req.params.id }, {
              $pull: { upvotes: req.auth_user._id }
            }, { new: true })
        }
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  downVoteAnswer(req, res) {
    Answer
      .findOne({
        _id: req.params.id
      })
      .then(data => {
        let isTrue = data.downvotes.filter(userId => {
          return String(userId) === String(req.auth_user._id);
        });

        if (!isTrue.length || !data.downvotes.length) {
          return Answer
            .findOneAndUpdate({ _id: req.params.id }, {
              $push: { downvotes: req.auth_user._id }
            }, { new: true })
        } else {
          return Answer
            .findOneAndUpdate({ _id: req.params.id }, {
              $pull: { downvotes: req.auth_user._id }
            }, { new: true })
        }
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  findQuestionOfAnswer(req, res) {
    Answer
    .find({
      questionId: req.params.questionId,
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error,
        message: 'Internal server error'
      })
    });
  }
};
