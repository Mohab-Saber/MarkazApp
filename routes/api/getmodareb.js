const express= require('express');
const router = express.Router();
const getModarebController = require('../../controller/getModarebController')

router.get('*', getModarebController.handleGetmodareb)

module.exports = router;