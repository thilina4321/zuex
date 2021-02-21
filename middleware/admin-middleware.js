const jwt = require("jsonwebtoken");
const Auth = require("../model/auth-model");
const UserType  = require('../enum/userType')

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken = await jwt.verify(token, process.env.SECURE_KEY);
    const user = await Auth.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!user){
      throw new Error('No access')
    }

    if(user.role != UserType.SUPER_ADMIN){
        throw new Error('Access not allowed')
    }

    // req.customer = user._id
    next();

  } catch (err) {
    res.status(422).send({error:err.message})
  }
};

module.exports = auth;