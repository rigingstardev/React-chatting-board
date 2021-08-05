const mongoose = require("mongoose");
const Channel = mongoose.model("Channel");

exports.createChannel = async (req, res) => {
  const { name, users } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Le nom de la chaîne ne peut contenir que des lettres.";
  const channelExists = await Channel.findOne({ name });

  if (channelExists) throw "La chaîne avec ce nom existe déjà!";

  const channel = new Channel({
    name,
    users: [...users, req.user._id]
  });

  await channel.save();

  res.json({
    message: "Channel created!",
  });
};

exports.addUser = async (req, res) => {
  const { users } = req.body;
  const channel = await Channel.findById(req.params.id).populate('User');
}

exports.getChannelSentiment = async (req, res) => {
  const channel = await Channel.findOne({
    _id: req.params.id,
  });

  if (!channel) throw "Cette chaîne n'existe pas!";

  res.json({
    totalMessages: channel.totalMessages,
  });
};

exports.getAllChannels = async (req, res) => {
  const channels = await Channel.find({ users: req.user._id }).populate('users', { password: 0 }, { _id: { $ne: req.user._id } });
  res.json(channels);
};
