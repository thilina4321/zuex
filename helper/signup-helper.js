const bcrypt = require('bcryptjs')
const User = require('../model/auth-model')

exports.userSignUp = async(email, password, contactNumber, userName, role)=>{
    try {
        const hashedPassword = await bcrypt.hash(password, 8)
        const newUser = new User({
            email,
            password:hashedPassword,
            contactNumber,
            userName,
            role
        })
        const user = await newUser.save()
        return {user}
        
    } catch (error) {
        if(error.code == 11000){
            return {error:'Email is already taken'}
        }
        return {error:error.message}
    }
}