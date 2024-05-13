const express = require('express');
const router = express.Router()
const authController = require('../controller/authController.js')

router.all('/', authController.handleLogin);

module.exports =  router ;
