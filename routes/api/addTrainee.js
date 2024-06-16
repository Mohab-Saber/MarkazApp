const express = require('express');
const router = express.Router();
const addTraineeController = require('../../controller/addTraineeController');

router.post('/', addTraineeController.addTrainee);

module.exports = router;