export { };
var express = require('express');
const router = express.Router();
const { getSubjects, getCourseLevels, getCount, getCourse, getSomeCourses, getAllCourses, addCourse, updateCourse, deleteCourse } = require('../../controller/coursesController.js')

router
    .get('/subjects', getSubjects)
    .get('/courseLevels', getCourseLevels)
    .get('/count', getCount)
    .get('/:id', getCourse)
    .get('/', (req, res) => {
        if(req.query._page){
        getSomeCourses(req, res)
    }else{

        getAllCourses(req, res)
    }})
    .post('/', addCourse)
    .put('/', updateCourse)
    .delete('/:id', deleteCourse)

module.exports = router;