const User = require('../model/auth-model')

exports.userLogin = async(data) => {
  
    try {
      const {user, error} = await User.loginWithEmailAndPassword(data);
      if(error){
        return {error}
      }
      const {token, tError} = await user.generateToken();
      if(tError){
        return {error:tError}
      }
      return {user, token}
    } catch (error) {
      return {error:error.message}
    }
};
