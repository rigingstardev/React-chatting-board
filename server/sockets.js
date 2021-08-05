const mongoose = require("mongoose");
const jwt = require("jwt-then");
// var Sentiment = require("sentiment");

const Message = mongoose.model("Message");
const DirectMessage = mongoose.model("DirectMessage");
const User = mongoose.model("User");
const Channel = mongoose.model("Channel");

// const {
//   userJoins,
//   userLeaves,
//   getCurrentUser,
//   getOnlineUsersInChannel,
// } = require("./utils/onlineUsers");

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
      const user = await User.findById(payload.id, { password: 0 });
      user.socketId = socket.id;
      await user.save();
      socket.user = user;
      next();
    } catch (err) { }
  });

  // When user connects
  io.on("connection", async (socket) => {
    console.log('---Socket connected---');
    let channels = await Channel.find({ users: socket.user._id }).select('_id');
    channels.map(chan => {
      socket.join(chan._id);
      // socket.broadcast.to(chan._id).emit("newMessage", newMessage);
    });
    io.emit("checkOnlineUsers");
    // const chans = await Channel.find().select(['_id']);
    // chans.map(async chan => {
    //   const users = await getOnlineUsersInChannel(chan._id);
    //   if (users.length) {
    //     console.log('---+++----')
    //     io.emit("onlineUsers", {
    //       users: users,
    //       channelId: chan._id
    //     });
    //   }
    // })
    // When user disconnects

    socket.on("disconnect", async () => {
      console.log('---Socket disconnect---');
      let user = socket.user;
      user.socketId = undefined;
      await user.save();

      // const newMessage = {
      //   type: 'System',
      //   message: user.username + " left the channel!",
      // };

      let channels = await Channel.find({ users: user._id }).select('_id');
      channels.map(chan => {
        socket.leave(chan._id);
        // socket.broadcast.to(chan._id).emit("newMessage", newMessage);
      });
      io.emit("checkOnlineUsers");
    });

    // // When user joins a channel
    // socket.on("joinChannel", async ({ username, channelId }) => {
    //   socket.join(channelId);
    //   await userJoins(socket.userId, username, channelId);
    //   const newMessage = {
    //     type: "System",
    //     message: username + " joined the channel!",
    //     username: ADMIN_USERNAME,
    //     userId: ADMIN_ID,
    //   };
    //   socket.broadcast.to(channelId).emit("newMessage", newMessage);
    //   io.emit("onlineUsers", {
    //     users: getOnlineUsersInChannel(channelId),
    //     channelId: channelId
    //   });
    // });

    // // When user leaves a channel
    // socket.on("leaveChannel", async ({ username, channelId }) => {
    //   socket.leave(channelId);
    //   userLeaves(socket.userId);
    //   const newMessage = {
    //     type: "System",
    //     message: username + " left the channel!",
    //     username: ADMIN_USERNAME,
    //     userId: ADMIN_ID,
    //   };
    //   socket.broadcast.to(channelId).emit("newMessage", newMessage);
    //   io.emit("onlineUsers", {
    //     users: getOnlineUsersInChannel(channelId),
    //     channelId: channelId
    //   });
    // });

    // When user creates a new channel
    socket.on("newChannel", async ({ channelName }) => {
      const channel = await Channel.findOne({ name: channelName }).populate('users');
      if (channel) {
        channel.users.map(user => {
          if (user.socketId) {
            io.sockets.connected[user.socketId].join(channel._id);
          }
        })
        io.emit("newChannel", { channel });
      }
    });

    // When user sends a new message in channel
    socket.on("newChannelMessage", async ({ channelId, message }) => {
      // Blank messages are ignored
      try {

        if (message.trim().length > 0) {

          const newMessage = new Message({
            channel: channelId,
            user: socket.user._id,
            message,
          });

          await newMessage.save();

          io.to(channelId).emit("newChannelMessage", {
            type: "ChannelMessage",
            user: socket.user,
            message: newMessage
          });

          const channel = await Channel.findById(channelId);

          // io.to(channelId).emit(
          //   "updateSentiment",
          //   getCurrentSentiment(channel)
          // );
          channel.totalMessages += 1;
          channel.save();

          const user = await User.findById(socket.user._id);
          user.totalMessages += 1;
          user.save();
        }
      } catch (error) {
        console.log(error);
      }
    });

    // When user sends a private message
    socket.on("newDirectMessage", async ({ toUser, message }) => {
      // Blank messages are ignored
      try {

        if (message.trim().length > 0) {

          const newMessage = new DirectMessage({
            from: socket.user._id,
            to: toUser,
            message,
          });

          await newMessage.save();
          const data = await newMessage.populate('from', { password: 0 }).populate('to', { password: 0 }).execPopulate();

          // const messageNew = await DirectMessage.findById(newMessage._id).populate('from', { password: 0 }).populate('to', { password: 0 });

          // console.log(data, '---')

          socket.emit("newDirectMessage", {
            type: "DirectMessage",
            message: data
          });

          let toU = await User.findById(toUser);
          if (toU && toU.socketId) {
            io.to(toU.socketId).emit("newDirectMessage", {
              type: "DirectMessage",
              message: data
            });
          }
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
