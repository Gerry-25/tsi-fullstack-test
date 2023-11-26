const jwt = require("jsonwebtoken");
User = require("../Models/users");
//const API_SECRET = process.env.TOKEN_SECRET
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET, function (err, decode) {
      if (err) req.user = undefined;
      User.findOne({
          _id: decode.id
        }).exec().then((user)=>{
            req.user = user;
            next();
        }).catch((error)=>{
            res.status(500).send({
                message: error
            });
        })
    });


  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;