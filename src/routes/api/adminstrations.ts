export { };
var express = require('express');
const router = express.Router();
const { getAllAdminstrations, addAdminstration, updateAdminstration, deleteAdminstration } = require('../../controller/adminstrationsController.js')

router
    .get('/', getAllAdminstrations)
    .post('/', addAdminstration)
    .put('/', updateAdminstration)
    .delete('/', deleteAdminstration)

module.exports = router;