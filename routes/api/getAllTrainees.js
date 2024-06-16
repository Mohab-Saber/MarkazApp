const express= require('express');
const router = express.Router();
const getAllTraineesController = require('../../controller/getAllTraineesController')

router.get('*', getAllTraineesController.getAllTrainees)

module.exports = router;