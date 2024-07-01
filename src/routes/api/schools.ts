export { };
var express = require('express');
const router = express.Router();
const { getAllSchools, addSchool, updateSchool, deleteSchool } = require('../../controller/schoolsController.js')

router
    .get('/', getAllSchools)
    .post('/', addSchool)
    .put('/', updateSchool)
    .delete('/', deleteSchool)

module.exports = router;