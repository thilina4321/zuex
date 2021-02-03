exports.userLogin = async(data, Model) => {
  
    try {
      const user = await Model.loginWithEmailAndPassword(data);
      const token = await user.generateToken();
      return {user, token}
    } catch (error) {
      new Error(error.message)
    }
};
