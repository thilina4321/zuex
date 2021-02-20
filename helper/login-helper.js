const User = require('../model/auth-model')

exports.userLogin = async(data) => {
  
    try {
      const user = await User.loginWithEmailAndPassword(data);
      const token = await user.generateToken();
      return {user, token}
    } catch (error) {
      console.log(error.message);
      return {error:error.message}
    }
};
