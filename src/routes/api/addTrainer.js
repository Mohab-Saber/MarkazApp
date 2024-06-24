const express = require('express');
const router = express.Router();
const {addTrainer} = require('../../controller/addTrainerController.js')

router.post('/', addTrainer);

module.exports = router;