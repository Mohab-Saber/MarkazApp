export { };
var express = require('express');
const router = express.Router();
const { getAllTrainees, addTrainee, updateTrainee, deleteTrainee } = require('../../controller/traineesController.js')

router
    .get('/', getAllTrainees)
    .post('/', addTrainee)
    .put('/', updateTrainee)
    .delete('/', deleteTrainee)

module.exports = router;