const express = require('express');
const router = express.Router();
const { getAllTrainees } = require('../../controller/TraineesController.js')

router
    .get('/', getAllTrainees)
    .post('/', getAllTrainees)
    .put('/', getAllTrainees)
    .delete('/', getAllTrainees)

module.exports = router;