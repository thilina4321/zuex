const jwt = require("jsonwebtoken");
const Auth = require("../model/auth-model");
const UserType  = require('../enum/userType')

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken = await jwt.verify(token, "thisisthesecretkey");
    const user = await Auth.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!user){
      throw new Error('No access')
    }

    if(user.role != UserType.SERVICE_AGENT){
        new Error('Access not allowed')
    }

    req.serviceAgent = user._id
    next();

  } catch (err) {
    throw new Error(err);
  }
};

module.exports = auth;