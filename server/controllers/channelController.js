const mongoose = require("mongoose");
const Channel = mongoose.model("Channel");

exports.createChannel = async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Le nom de la chaîne ne peut contenir que des lettres.";
  const channelExists = await Channel.findOne({ name });

  if (channelExists) throw "La chaîne avec ce nom existe déjà!";

  const channel = new Channel({
    name,
  });

  await channel.save();

  res.json({
    message: "Channel created!",
  });
};

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
  const channels = await Channel.find({});

  res.json(channels);
};
