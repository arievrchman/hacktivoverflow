const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: [true, 'Title cannot be blank']
  },
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



const Question = mongoose.model('Question', questionSchema);
module.exports = Question;