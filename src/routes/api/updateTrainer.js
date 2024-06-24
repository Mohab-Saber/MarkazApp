const express = require('express');
const router = express.Router();
const {updateTrainer} = require('../../controller/updateTrainerController.js')

router.put('/', updateTrainer);

module.exports = router;