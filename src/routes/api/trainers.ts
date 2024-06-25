export { };
var express = require('express');
const router = express.Router();
const { getAllTrainers, addTrainer, updateTrainer, deleteTrainer } = require('../../controller/trainersController.js')

router
    .get('/', getAllTrainers)
    .post('/', addTrainer)
    .put('/', updateTrainer)
    .delete('/', deleteTrainer)

module.exports = router;