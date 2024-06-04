const express = require('express');
const router = express.Router();
const addModarebController = require('../../controller/addModarebController');

router.post('/', addModarebController.handleAddedModareb);

module.exports = router;