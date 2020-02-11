const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const headers = req.cookies.token;
  console.log('headers', headers)
  if (typeof headers != 'undefined') {
    jwt.verify(headers, process.env.SECRET_KEY, (err, decode) => {
     if (err) return res.status(401).send({ message: 'No token is provided.' });
      console.log(decode)
      req.user = decode.user.userName;      
      req.type = decode.user.type;
      next();
    });
  } else {
    res.status(400).json({
      Message: 'Invalid Token'
    });
  }
}

module.exports = { verifyToken }