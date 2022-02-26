require("dotenv").config({path:"./config/.env"})
const express = require('express');
const connectDB = require('./config/connectDB')
///local middleware

const logger = (req,res,next)=>{
    true ? next() : res.send('blocked')
}
const app = express()
connectDB()
app.use(express.json())
app.use(logger)
const port = 8000;

let phones =[
    {
        id:1,
        brand:"apple",
        model:'iphone 7'
    },
    {
        id:2,
        brand:"apple",
        model:'iphone 7'
    },
    {
        id:3,
        brand:"asus",
        model:'iphonae 7'
    }
]
// // create end point 
// app.get('/',(req,res)=>{
//     // res.send('welcome to express Introduction');
//     res.json({msg:'welcome to express Introduction'});
// })
app.get('/phones',(req,res)=>{
    try {
        res.status(201).json({phone:phones})
        
    } catch (error) {
        res.status(401).json({errors:error})
        
    }
})

app.post('/phones',(req,res)=>{
    try {
        let newPhone = {...req.body,id:Math.random()}
   phones = phones.push(newPhone)
    res.status(201).json({msg:'phones added with success',phones})
    } catch (error) {
        res.status(401).json({msh:'adding phone failed',error:error})
        
    }
})
///update a phone
//put /phones/:id
app.put('/phones/:id',(req,res)=>{
    let id = +req.params.id
    phones = phones.map((phone)=>phone.id === id?{...phone,...req.body}:phone)
    try {
        res.status(200).json({msg:"phone update",phones})
    } catch (error) {
        res.status(401).json({msg:"cant update",error:error})
    }
})
app.delete('/phones/:id',(req,res)=>{
    try {
        let id= +req.params.id
        phones = phones.filter(phone=>phone.id !== id)
        res.status(201).json({msg:"deleted",phones})
    } catch (error) {
        res.status(401).json({msg:"cant delete",error:error})
        
    }
})


//listen
app.listen(process.env.port,(err)=>{
    err? console.log('server connection failed',err):
    // console.log('server connected' + port)
    console.log(
        `The server is running on http://localhost:${process.env.PORT}`
      )
})