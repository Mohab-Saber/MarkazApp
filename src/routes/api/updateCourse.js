const express = require('express');
const router = express.Router();
const {updateCourse} = require('../../controller/updateCourseController.js')

router.put('/', updateCourse);

module.exports = router;