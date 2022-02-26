const User = require("../models/User")
const bcrypt = require('jsonwebtoken')
///User register
exports.userRegister = async (req,res) =>{
    const newUser = await new User({...req.body})
    const email = newUser.email
    
    try {
        const user = await User.findOne({email}) //email : email
        if(user) return res.status(402).json({msg:'User already exist'}) 
// hashage algorithm complexity
        const salt = await bcrypt.genSalt(10)
// Hashed password
        const hash = await bcrypt.hash(newUser.password,salt);

        newUser.password = hash;

        newUser.save()
    res.status(202).json({msg:"user resgistred successfully"})
    } catch (error) {
        res.status(401).json({msg:'cant register',error:error})
    }
}