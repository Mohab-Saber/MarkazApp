const express = require('express');
const router = express.Router();
const path = require('path');
const addModarebController = require('../controller/addModarebController');

router.post('/', addModarebController.handleAddedModareb);

module.exports = router;