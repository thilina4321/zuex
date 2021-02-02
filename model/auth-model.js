const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validation')
const UserType = require('../enum/userType')

const user = new Schema({
    email:{
        type:String,
        required:[true, 'Email required'],
        unique:[true, 'Email already taken'],
        validate(value){
            if(!validator.Email(value)){
                new Error('Please Enter valid Email')
            }
        }
    },
    password:{
        type:String,
        required:[true, 'Password required'],
        validate(value){
            if(value.length < 5){
                new Error('Password should contain at least 5 characters')
            }
        }
    },
    userName:{type:String, required:[true, 'User name required']},
    contactNumber:{type:String},
    role:UserType
})


user.statics.loginWithEmailAndPassword = async (data) => {
    const user = await Customer.findOne({ email: data.email });
    if (!user) {
      throw new Error("Loging failed");
    }
  
      const compare = await bcrypt.compare(data.password, user.password);
      if (!compare) {
        throw new Error("Invalid password");
      }
  
      return user;
  
  }
  
  user.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
  
    delete userObject.tokens
    delete userObject.password
  
    return userObject
  }
  
  user.methods.generateToken = async function(){
    const user = this
  
    const token = jwt.sign({id:user._id},'thisisthesecretkey', {expiresIn:'1h'})
    admin.tokens = user.tokens.concat({token})
    await user.save()
    return token
  }
  
  const User = mongoose.model("customer", user);
  
  module.exports = User;