const express = require('express');
const router = express.Router();
const {getAllTrainees} = require('../../controller/getAllTraineesController.js')

router.get('/', getAllTrainees);

module.exports = router;