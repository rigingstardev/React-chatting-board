const mongoose = require("mongoose");
const User = mongoose.model("User");
const DirectMessage = mongoose.model("DirectMessage");
const Token = mongoose.model("Token");
const crypto = require("crypto");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jwt-then");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

const sendEmail = require("../utils/sendMail");

exports.register = async (req, res) => {

  const form = formidable.IncomingForm();

  const uploadFolder = path.join(__dirname, "../", "public", "files");

  // form.multiples = true;
  // form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.uploadDir = uploadFolder;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("Error parsing the files");
      return res.status(400).json({
        success: false,
        message: "There was an error parsing the files",
        error: err,
      });
    }
    
    const {
      username,
      email,
      password,
      profession,
      field,
      industry,
      country,
      state,
      city,
      note,
      telephone,
      phone,
      fax,
      website
    } = fields;

    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com|@mail.ru/;

    // if (!emailRegex.test(email)) return res.status(400).json({
    //   success: false,
    //   errors: {
    //     email: "Les e-mails ne sont pas pris en charge depuis votre domaine."
    //   }
    // });

    // if (password.length < 6) throw "Le mot de passe doit contenir au moins 6 caractères.";

    // const usernameExists = await User.findOne({
    //   username,
    // });

    // if (usernameExists) return res.status(400).json({
    //   success: false,
    //   errors: {
    //     username: "Un utilisateur avec le même nom d'utilisateur existe déjà."
    //   }
    // });

    // const emailExists = await User.findOne({
    //   email,
    // });

    // if (emailExists) return res.status(400).json({
    //   success: false,
    //   errors: {
    //     email: "L'utilisateur avec le même e-mail existe déjà."
    //   }
    // });

    const hashedPassword = await bcrypt.hash(password, 10);
    let avatar = "";
    let photo = "";
    try {
      let avatarFile = fields.avatar;
      let photoFile = fields.photo;
      // renames the file in the directory
      if (avatarFile) {
        // fs.renameSync(avatarFile.path, path.join(uploadFolder, `${username}-${avatarFile.name}`));
        const imageFile = avatarFile.replace(/^data:image\/jpeg;base64,/, "");
        console.error("avatar = ", imageFile);
        fs.writeFileSync(path.join(uploadFolder, `${username}-avatar.jpg`), imageFile, 'base64');
        avatar = `${username}-avatar.jpg`;
      }
      if (photoFile) {
        // fs.renameSync(photoFile.path, path.join(uploadFolder, `${username}-${photoFile.name}`));
        const imageFile = photoFile.replace(/^data:image\/jpeg;base64,/, "");
        console.error("image = ", imageFile);
        fs.writeFileSync(path.join(uploadFolder, `${username}-photo.jpg`), imageFile, 'base64');
        photo = `${username}-photo.jpg`;
      }
    } catch (error) {
      console.log(error);
    }
    res.json({
      uploadFolder: uploadFolder,
      imageFile: imageFile
    });

    const user = new User({
      username,
      email,
      password: hashedPassword,
      profession,
      field,
      industry,
      country,
      state,
      city,
      note,
      telephone,
      phone,
      fax,
      avatar,
      photo,
      website,
    });

    await user.save();

    res.json({
      message: "Utilisatrice [" + username + "] enregistré avec succès!",
    });
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
      email: "Ce mot de passe n'est pas correct."
    }
  });

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);
  res.json({
    message: "Connecté avec succès!",
    token,
    user
  });
};

exports.me = (req, res) => {
  res.json(req.user);
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) throw "Cet utilisateur n'existe pas!";

  res.json(user);
};
exports.getUserByName = async (req, res) => {

  const user = await User.findOne({username: req.body.username});

  if (!user) throw "Cet utilisateur n'existe pas!";

  res.json(user);
};

// exports.contact = async ( req, res) => {
//     const data = req.body.data;
//     const name = data.name;
//     const email = data.email;
//     const message = data.message;
//     sendEmail(email, message);
// };
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }, { password: 0 }).sort({ socketId: -1 });
    let resData = users.map(async ({
      totalMessages,
      _id,
      username,
      email,
      profession,
      field,
      industry,
      country,
      state,
      city,
      note,
      telephone,
      phone,
      fax,
      avatar,
      photo,
      socketId,
      website,
      createdAt,
      updatedAt, }) => {
      const count = await DirectMessage.count({ from: _id, to: req.user._id, isRead: false });

      return ({
        totalMessages,
        _id,
        username,
        email,
        profession,
        field,
        industry,
        country,
        state,
        city,
        note,
        telephone,
        phone,
        fax,
        avatar,
        photo,
        website,
        socketId,
        createdAt,
        updatedAt,
        count
      });
    });
    Promise.all(resData).then(result => {
      res.json(result);
    })
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({
      success: false,
      errors: {
        email: error.details[0].message
      }
    });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({
        success: false,
        errors: {
          email: "L'utilisateur avec e-mail donnée n'existe pas"
        }
      });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.FRONTEND_URL}auth/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.json({
      success: true
    });
  } catch (error) {
    res.status(400).json({ errors: { email: "An error occured" } });
    console.log(error);
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("Lien invalide ou expiré.");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Lien invalide ou expiré.");

    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");

  } catch (error) {
    res.status(400).send("Lien invalide ou expiré.");
    console.log(error);
  }
};