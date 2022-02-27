const express = require('express');
const { userRegister, userLogin } = require('../controllers/auth.controller');
const isAuth = require('../middlewares/passwort-setup')

const Router = express.Router();

Router.post('/register',userRegister)
Router.post('/login',userLogin)

// GET CurrentUser 
Router.get('/currentUser',isAuth(),(req,res)=>{
    res.send(req.user)
}) 

module.exports = Router