const express = require('express');
const router = express.Router();
const {addCourse} = require('../../controller/addCourseController.js')

router.post('/', addCourse);

module.exports = router;