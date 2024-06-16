const express = require('express');
const router = express.Router();
const deleteTraineeController = require('../../controller/deleteTraineeController.js');

router.delete('/', deleteTraineeController.deleteTrainee);

module.exports = router;