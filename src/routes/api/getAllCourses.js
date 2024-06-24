const express = require('express');
const router = express.Router();
const {getAllCourses} = require('../../controller/getAllCoursesController.js')

router.get('/', getAllCourses);

module.exports = router;