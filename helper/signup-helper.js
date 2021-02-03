const bcrypt = require('bcryptjs')

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
        return user
        
    } catch (error) {
        new Error(error.message)
    }
}