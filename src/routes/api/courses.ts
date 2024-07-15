export { };
var express = require('express');
const router = express.Router();
const { getCourse, getAllCourses, addCourse, updateCourse, deleteCourse } = require('../../controller/coursesController.js')

router
    .get('/:id', getCourse)
    .get('/', getAllCourses)
    .post('/', addCourse)
    .put('/', updateCourse)
    .delete('/', deleteCourse)

module.exports = router;