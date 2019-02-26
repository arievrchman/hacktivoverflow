const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  description: {
    type: String,
    required: [true, 'Description cannot be blank']
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created_at: {
    type: Date,
    default: new Date
  },
  updated_at: {
    type: Date,
  }
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;