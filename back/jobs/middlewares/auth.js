const jwt = require("jsonwebtoken");
const statusText = require("../utils/statusText");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: statusText.Error, msg: "Unauthorized", date: null });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: statusText.Error, msg: "No token provided", data: null });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      _id: decoded.user._id,
      name: decoded.user.name,
      email: decoded.user.email,
    };
    next();
  } catch (error) {
    res.status(401).json({
      status: statusText.Error,
      message: error.message,
      code: 401,
      data: null,
    });
  }
};

module.exports = auth;
