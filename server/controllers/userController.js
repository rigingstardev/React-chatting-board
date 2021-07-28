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
      email: "Les e-mails ne sont pas pris en charge depuis votre domaine."
    }
  });
  if (password.length < 6) throw "Le mot de passe doit contenir au moins 6 caractères.";

  const usernameExists = await User.findOne({
    username,
  });

  if (usernameExists) return res.status(400).json({
    success: false,
    errors: {
      username: "Un utilisateur avec le même nom d'utilisateur existe déjà."
    }
  });

  const emailExists = await User.findOne({
    email,
  });

  if (emailExists) return res.status(400).json({
    success: false,
    errors: {
      email: "L'utilisateur avec le même e-mail existe déjà."
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
    message: "Utilisatrice [" + username + "] enregistré avec succès!",
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
      email: "Cette information d'identification n'est pas correcte."
    }
  });
  const hashedPassword = await bcrypt.hash(password, 10);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) return res.status(401).json({
    success: false,
    errors: {
      email: "Cette information d'identification n'est pas correcte."
    }
  });

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: "Connecté avec succès!",
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

  if (!user) throw "Cet utilisateur n'existe pas!";

  res.json(user);
};
