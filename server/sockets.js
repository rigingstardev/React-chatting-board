const mongoose = require("mongoose");
const jwt = require("jwt-then");
// var Sentiment = require("sentiment");

const Message = mongoose.model("Message");
const User = mongoose.model("User");
const Channel = mongoose.model("Channel");

const {
  userJoins,
  userLeaves,
  getCurrentUser,
  getOnlineUsersInChannel,
} = require("./utils/onlineUsers");

let sockets = {};
// let sentiment = new Sentiment();

sockets.init = (server) => {
  const ADMIN_ID = "admin";
  const ADMIN_USERNAME = "";

  const io = require("socket.io")(server);

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.SECRET);
      socket.userId = payload.id;
      socket.user = await User.findById(payload.id, { password: 0 });
      next();
    } catch (err) { }
  });

  // When user connects
  io.on("connection", async (socket) => {
    console.log('---Socket connected---');

    const chans = await Channel.find().select(['_id']);
    chans.map(async chan => {
      const users = await getOnlineUsersInChannel(chan._id);
      if (users.length) {
        console.log('---+++----')
        io.emit("onlineUsers", {
          users: users,
          channelId: chan._id
        });
      }
    })
    // When user disconnects
    socket.on("disconnect", async ({ channelId }) => {
      console.log('---Socket disconnect---');
      const user = getCurrentUser(socket.userId);
      if (user) {
        socket.leave(user.channelId);
        userLeaves(socket.userId);
        const newMessage = {
          type: 'System',
          message: user.username + " left the channel!",
          username: ADMIN_USERNAME,
          userId: ADMIN_ID,
        };
        socket.broadcast.to(user.channelId).emit("newMessage", newMessage);
        io.to(user.channelId).emit("onlineUsers", {
          users: getOnlineUsersInChannel(user.channelId),
          channelId: user.channelId
        });
      }
    });

    // When user joins a channel
    socket.on("joinChannel", async ({ username, channelId }) => {
      socket.join(channelId);
      await userJoins(socket.userId, username, channelId);
      const newMessage = {
        type: "System",
        message: username + " joined the channel!",
        username: ADMIN_USERNAME,
        userId: ADMIN_ID,
      };
      socket.broadcast.to(channelId).emit("newMessage", newMessage);
      io.emit("onlineUsers", {
        users: getOnlineUsersInChannel(channelId),
        channelId: channelId
      });
    });

    // When user leaves a channel
    socket.on("leaveChannel", async ({ username, channelId }) => {
      socket.leave(channelId);
      userLeaves(socket.userId);
      const newMessage = {
        type: "System",
        message: username + " left the channel!",
        username: ADMIN_USERNAME,
        userId: ADMIN_ID,
      };
      socket.broadcast.to(channelId).emit("newMessage", newMessage);
      io.emit("onlineUsers", {
        users: getOnlineUsersInChannel(channelId),
        channelId: channelId
      });
    });

    // When user creates a new channel
    socket.on("newChannel", async ({ channelName }) => {
      const channel = await Channel.findOne({ name: channelName });
      if (channel) io.emit("newChannel", { channel });
    });

    // When user sends a new message
    socket.on("newMessage", async ({ username, channelId, message }) => {
      // Blank messages are ignored
      try {

        if (message.trim().length > 0) {

          const newMessage = new Message({
            channel: channelId,
            user: socket.userId,
            message,
          });

          await newMessage.save();

          io.to(channelId).emit("newMessage", {
            type: "Message",
            message,
            username: username,
            userId: socket.userId,
            user: socket.user,
            newMessage
          });

          const channel = await Channel.findOne({ _id: channelId });

          io.to(channelId).emit(
            "updateSentiment",
            getCurrentSentiment(channel)
          );

          Channel.updateOne(
            { _id: channelId },
            {
              $set: getCurrentSentiment(channel),
            },
            function (err, affected, resp) { }
          );

          const user = await User.findOne({ _id: socket.userId });
          User.updateOne(
            { _id: socket.userId },
            {
              $set: getCurrentSentiment(user),
            },
            function (err, affected, resp) { }
          );
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
};

const getCurrentSentiment = (entity) => {
  return {
    totalMessages: entity.totalMessages + 1
  };
};

module.exports = sockets;
