const express = require('express');
const router = express.Router();
const updateTraineeController = require('../../controller/updateTraineeController');

router.patch('/', updateTraineeController.updateTrainee);

module.exports = router;