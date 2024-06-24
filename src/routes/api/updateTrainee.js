const express = require('express');
const router = express.Router();
const {updateTrainee} = require('../../controller/updateTraineeController.js')

router.put('/', updateTrainee);

module.exports = router;