const express = require('express');
const { userRegister } = require('../controllers/auth.controller');


const Router = express.Router();

Router.post('/regiter',userRegister)

module.exports = Router