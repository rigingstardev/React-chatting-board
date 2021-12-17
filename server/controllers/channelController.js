const mongoose = require("mongoose");
const Channel = mongoose.model("Channel");

exports.createChannel = async (req, res) => {
  const { name, users, avatar } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Le nom de la chaîne ne peut contenir que des lettres.";
  const channelExists = await Channel.findOne({ name });

  if (channelExists) throw "La chaîne avec ce nom existe déjà!";

  const channel = new Channel({
    name,
    users: [...users, req.user._id],
    avatar,
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

exports.updateChannel = async (req, res) => {
    const { type} = req.body;
    const {name, deleteUser, newGroupName} = req.body.data;

    switch(type){
      case "deleteUser":
        try{
          console.error(type, deleteUser);
          const channel = await Channel.findOne({name});
          channel.users = channel.users.filter(id => id.toString() !== deleteUser._id);
          
          await channel.save();
          res.json({
            message:"Deleted user = " + deleteUser.username + " from " + name     
          })
        } catch(e){}
      
        break;
      case "updateGroupName":
        try{ 
          console.error(type, newGroupName);
          const channel = await Channel.findOne({name});
          channel.name = newGroupName;
          await channel.save();
          res.json({
            message:"Group name changed from " + name + " to " + newGroupName     
          })
        }catch(e){}
        
        break;
      default: break;
    }
}