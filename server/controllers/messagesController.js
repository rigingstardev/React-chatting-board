const mongoose = require("mongoose");
const Message = mongoose.model("Message");

exports.getAllMessagesInRoom = async (req, res) => {
  try {

    const messages = await Message.find({
      channel: req.params.channelId,
    }).populate({
      path: "user",
    });

    res.json(
      messages.map((currMessage) => {
        return {
          message: currMessage.message,
          username: currMessage.user.username,
          userId: currMessage.user._id,
          user: currMessage.user,
          newMessage: currMessage
        };
      })
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
