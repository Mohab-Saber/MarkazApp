export { };
var express = require('express');
const router = express.Router();
const { getSubjects, getCount, getCourse, getAllCourses, addCourse, updateCourse, deleteCourse } = require('../../controller/coursesController.js')

router
    .get('/subjects', getSubjects)
    .get('/count', getCount)
    .get('/:id', getCourse)
    .get('/', getAllCourses)
    .post('/', addCourse)
    .put('/', updateCourse)
    .delete('/:id', deleteCourse)

module.exports = router;