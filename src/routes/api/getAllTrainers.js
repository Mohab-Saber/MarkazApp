const express = require('express');
const router = express.Router();
const {getAllTrainers} = require('../../controller/getAllTrainersController.js')

router.get('/', getAllTrainers);

module.exports = router;