const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const headers = req.cookies.token;
  if (typeof headers != 'undefined') {
    jwt.verify(headers, process.env.SECRET_KEY, (err, decode) => {
      if (err) return res.status(401).send({ message: 'No token provided.' });
      console.log(decode)
      req.id = decode.user._id;
      req.user = decode.user.userName;
      req.discription = decode.user.description;
      req.type = decode.user.type;
      next();
    });
  } else {
    req.flash('Error', "User must Login")
    res.redirect('/user/login');
  }
}

module.exports = { verifyToken };
