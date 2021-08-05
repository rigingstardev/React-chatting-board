const mongoose = require("mongoose");
const Message = mongoose.model("Message");
const DirectMessage = mongoose.model("DirectMessage");

exports.getAllMessagesInChannel = async (req, res) => {
  try {
    const messages = await Message.find({
      channel: req.params.channelId,
    }).populate('user', { password: 0 });
    res.json(
      messages.map((currMessage) => {
        return {
          type: "ChannelMessage",
          user: currMessage.user,
          message: currMessage
        };
      })
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.getAllDirectMessage = async (req, res) => {
  try {
    const messages = await DirectMessage.find({
      $or: [
        {
          from: req.params.fromUser,
          to: req.user._id
        },
        {
          from: req.user._id,
          to: req.params.fromUser
        },
      ]
    }).populate('from', { password: 0 }).populate('to', { password: 0 });

    res.json(
      messages.map((currMessage) => {
        return {
          type: "DirectMessage",
          message: currMessage
        };
      })
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.readChannelMessage = async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, {
      $set: {
        isRead: true
      }
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.readDirectMessage = async (req, res) => {
  try {
    await DirectMessage.updateMany({ from: req.params.id, to: req.user._id }, {
      $set: {
        isRead: true
      }
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
