import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'User email required']
  },
  password: {
    type: Number,
    required: [true, 'password required']
  },
  rollno: {
    type: Number
  }
});

module.exports = mongoose.model("User", userSchema, "Users");
