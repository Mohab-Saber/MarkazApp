const express = require('express');
const router = express.Router();
const {deleteCourse} = require('../../controller/deleteTrainerController.js')

router.delete('/', deleteCourse);

module.exports = router;