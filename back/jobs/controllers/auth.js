const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const statusText = require("../utils/statusText");

const register = asyncWrapper(async (req, res) => {
  const user = await User.create(req.body);
  const token = await jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  res.status(200).json({ status: statusText.Success, user, token });
});
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = appError.createError(
      "email is invalid",
      404,
      statusText.Fail
    );
    next(error);
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    const error = appError.createError(
      "Password is incorrect",
      401,
      statusText.Fail
    );
    next(error);
  }
  const token = await jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  res.status(200).json({ status: statusText.Success, user, token });
});

module.exports = { register, login };
