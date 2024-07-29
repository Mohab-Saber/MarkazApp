export { };
var express = require('express');
const router = express.Router();
const { makePdf } = require('../../controller/disclaimerController/disclaimerController')

router
    .get('/', makePdf)
    .post('/', makePdf)
    .put('/', makePdf)
    .delete('/', makePdf)

module.exports = router;