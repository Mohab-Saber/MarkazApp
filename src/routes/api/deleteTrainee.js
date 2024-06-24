const express = require('express');
const router = express.Router();
const {deleteTrainee} = require('../../controller/deleteTraineeController.js')

router.delete('/', deleteTrainee);

module.exports = router;