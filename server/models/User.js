const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: "Username is required!",
    },
    email: {
      type: String,
      required: "Email is required!",
    },
    password: {
      type: String,
      // required: "Password is required!",
    },
    totalMessages: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
    },
    avatar: {
      type: String,
    },
    photo: {
      type: String,
    },
    profession: {
      type: String,
    },
    field: {
      type: String,
    },
    industry: {
      type: String,
    },
    state: {
      type: String,
    },
    note: {
      type: String,
    },
    city: {
      type: String,
    },
    telephone: {
      type: String,
    },
    phone: {
      type: String,
    },
    fax: {
      type: String
    },
    website: {
      type: String,
    },
    socketId: {
      type: String,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
