const jwt = require("jsonwebtoken");
const Auth = require("../model/auth-model");

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken = await jwt.verify(token, process.env.SECURE_KEY);
    const user = await Auth.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!user){
      return res.status(422).send({error:'no user found'})
    }
    req.user = user._id
    req.token = token
    next();

  } catch (err) {
    return res.status(500).send({error:'Something went wrong'})
  }
};

module.exports = auth;