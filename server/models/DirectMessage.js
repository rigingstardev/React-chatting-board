const mongoose = require("mongoose");

const DirectMessageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: "User is required!",
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: "User is required!",
      ref: "User",
    },
    message: {
      type: String,
      required: "Message is required!",
    },
    isRead: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("DirectMessage", DirectMessageSchema);

module.exports = Message;
