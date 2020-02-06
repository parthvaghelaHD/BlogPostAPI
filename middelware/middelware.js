const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    jwt.verify(bearerHeader, process.env.SECRET_KEY, function(err, decoded)  {
      if (err) {
        return res.status(500).json({
          message: "invalid verification token"
        });
      } else {
        req.user = decoded.user.userId;
        req.type = decoded.user.type;
        next();
      }
    });
  } else {
    return res.status(500).json({
      message: "invalid verification token"
    });
  }
}

module.exports = { verifyToken };