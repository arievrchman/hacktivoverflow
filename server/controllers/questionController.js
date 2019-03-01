const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');

module.exports = {
  postQuestion(req, res) {
    Question
      .create({
        owner: req.auth_user._id,
        title: req.body.title,
        description: req.body.description
      })
      .then(data => {
        res.status(201).json({
          data,
          message: 'Your question has been added'
        })
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  findAllQuestion(req, res) {
    Question
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
      });
  },
  findOneQuestion(req, res) {
    Question
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
  updateQuestion(req, res) {
    // console.log(req.params.id);
    Question
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        updated_at: new Date
      }, { new: true })
      .then(data => {
        res.status(200).json({
          data,
          message: 'Your question has been updated'
        });
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  deleteQuestion(req, res) {
    Question
      .findByIdAndDelete(req.params.id)
      .then(data => {
        res.status(200).json({
          data,
          message: 'Your question has been deleted'
        });
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  upVoteQuestion(req, res) {
    // console.log(req.auth_user._id, '=========>');
    Question
      .findOne({
        _id: req.params.id
      })
      .then(data => {
        // console.log(data.upvotes);
        let isTrue = data.upvotes.filter(userId => {
          // console.log(userId);
          // console.log(req.auth_user._id);
          return String(userId) === String(req.auth_user._id);
        });
        // console.log(isTrue);
        if (!isTrue.length || !data.upvotes.length) {
          return Question
            .findOneAndUpdate({ _id: req.params.id }, {
              $push: { upvotes: req.auth_user._id }
            }, { new: true })
        } else {
          return Question
            .findOneAndUpdate({ _id: req.params.id }, {
              $pull: { upvotes: req.auth_user._id }
            }, { new: true })
        }

      })
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  downVoteQuestion(req, res) {
    Question
      .findOne({
        _id: req.params.id
      })
      .then(data => {
        let isTrue = data.downvotes.filter(userId => {
          // console.log(userId);
          // console.log(req.auth_user._id);
          return String(userId) === String(req.auth_user._id)
        });

        if (!isTrue.length || !data.downvotes.length) {

          const idx = data.upvotes.indexOf(req.auth_user._id);
          data.upvotes.splice(0, idx);

          // console.log(data);

          return Question
            .findOneAndUpdate({ _id: req.params.id }, {
              $push: { downvotes: req.auth_user._id }
            }, { new: true })
        } else {
          return Question
            .findOneAndUpdate({ _id: req.params.id }, {
              $pull: { downvotes: req.auth_user._id }
            }, { new: true })
        }

      })
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(error => {
        res.status(500).json({
          error,
          message: 'Internal server error'
        });
      });
  },
  // findTheAnswers(req, res) {
  //   Answer
  //   .find({
  //     questionId: req.params.questionId,
  //   })
  //   .then(response => {
  //     res.status(200).json(response);
  //   })
  //   .catch(error => {
  //     res.status(500).json({
  //       error,
  //       message: 'Internal server error'
  //     })
  //   });
  // }
};
