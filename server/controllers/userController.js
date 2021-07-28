const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com|@mail.ru/;

  if (!emailRegex.test(email)) return res.status(400).json({
    success: false,
    errors: {
      email: "Email is not supported from your domain."
    }
  });
  if (password.length < 6) throw "Password must be atleast 6 characters long.";

  const usernameExists = await User.findOne({
    username,
  });

  if (usernameExists) return res.status(400).json({
    success: false,
    errors: {
      username: "User with same username already exits."
    }
  });

  const emailExists = await User.findOne({
    email,
  });

  if (emailExists) return res.status(400).json({
    success: false,
    errors: {
      email: "User with same email already exits."
    }
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.json({
    message: "User [" + username + "] registered successfully!",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) return res.status(401).json({
    success: false,
    errors: {
      email: "This credential is not correct."
    }
  });
  const hashedPassword = await bcrypt.hash(password, 10);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) return res.status(401).json({
    success: false,
    errors: {
      email: "This credential is not correct."
    }
  });

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: "Logged in successfully!",
    token,
    user
  });
};
exports.me = async (req, res) => {
  res.json(req.user);
}
exports.getUser = async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });

  if (!user) throw "This user does not exists!";

  res.json(user);
};
