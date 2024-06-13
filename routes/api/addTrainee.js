const express = require('express');
const router = express.Router();
const addTrainerController = require('../../controller/addTrainerController');

router.post('/', addTrainerController.handleAddedModareb);

module.exports = router;