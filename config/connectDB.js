const mongoose = require('mongoose')

const connectDB = async()=>{
try {
  await mongoose.connect(process.env.MONGO_URI)
    console.log("DB connected succesfully")
} catch (error) {
    console.log("DB conenction failed",error)
    
}
}
module.exports = connectDB