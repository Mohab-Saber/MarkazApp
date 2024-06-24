const express = require('express');
const router = express.Router();
const {deleteTrainer} = require('../../controller/deleteTrainerController.js')

router.delete('/', deleteTrainer);

module.exports = router;