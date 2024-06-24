const express = require('express');
const router = express.Router();
const {addTrainee} = require('../../controller/addTraineeController.js')

router.post('/', addTrainee);

module.exports = router;