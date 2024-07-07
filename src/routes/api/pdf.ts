export { };
var express = require('express');
const router = express.Router();
const { makePdf } = require('../../controller/pdfController.js')

router
    .get('/', makePdf)
    .post('/', makePdf)
    .put('/', makePdf)
    .delete('/', makePdf)

module.exports = router;