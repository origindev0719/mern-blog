import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: [true, 'User email required']
  },
  img: {
    type: String,
    required: [false, 'password required']
  },
  category: {
    type: String,
    required: [true, 'password required']
  },
  date: {
    type: String,
    required: [true, 'password required']
  },
  user_id: {
    type: String,
    required: [false, 'user id required']
  },
  comment_count: {
    type: Number,
    default: 0
  },
  comment: [
    {
        user_id: {type: String},
        timestamp: {type: String, default: new Date()} ,
        content: {type: String, required: false}
    }
  ]
});

module.exports = mongoose.model("Blog", blogSchema, "Blogs");
