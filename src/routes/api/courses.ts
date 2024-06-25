export { };
var express = require('express');
const router = express.Router();
const { getAllCourses, addCourse, updateCourse, deleteCourse } = require('../../controller/coursesController.js')

router
    .get('/', getAllCourses)
    .post('/', addCourse)
    .put('/', updateCourse)
    .delete('/', deleteCourse)

module.exports = router;