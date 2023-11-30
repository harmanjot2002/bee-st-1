const mongoose = require('mongoose');
const CommentSchema = require('./CommentSchema');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000,
  },
  author: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    maxlength: 50,
  }],
  Comments:{
    type:Array,
    default:[CommentSchema]
  }
});

module.exports = mongoose.model('Post', postSchema);

