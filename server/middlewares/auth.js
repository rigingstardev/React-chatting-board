const jwt = require("jwt-then");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, process.env.SECRET);
    req.payload = payload;
    req.user = await User.findById(payload.id, { password: 0 });
    next();
  } catch (err) {
    res.status(401).json({
      message: "Forbidden 🚫🚫🚫",
    });
  }
};
