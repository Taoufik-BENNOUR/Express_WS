const User = require("../models/User")
const bcrypt = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
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
/* login*/
exports.userLogin = async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
try {
    if(!user) return res.status(403).json({msg:"Brad credentials"})

    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch) return res.status(401).json({msg:'Bad credentials'}) 

    const payload = {
        id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        phone:user.phoneNumber,
        email:user.email,
        adress:user.adress
    }
    const token = await jwt.sign(payload,process.env.secretOrPrivateKey)
    res.status(203).json({token:`Bearer ${token}`})
} catch (error) {
    
res.status(403).json({error:error})
}

}