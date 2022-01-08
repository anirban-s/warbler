require("dotenv").config();
const jwt = require("jsonwebtoken");

// make sure the user is logged in - Authentication
exports.loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (decoded) {
        return next();
      }
      return next({
        status: 401,
        message: "Please login first.",
      });
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please login first.",
    });
  }
};

// make use it is the correct user - Authorization
exports.ensureCorrectuser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, process.env.SECRET_KEY);
    jwt.verify(token, process.env.SECRET_KEY, function (err, docoded) {
      if (docoded && docoded.id === req.params.id) {
        return next();
      }
      return next({
        status: 401,
        message: "Unauthorized",
      });
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized",
    });
  }
};
