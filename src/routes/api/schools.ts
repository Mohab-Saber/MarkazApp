export { };
var express = require('express');
const router = express.Router();
const { getGrades,getCount, getSchool, getSomeSchools, getAllSchools, addSchool, updateSchool, deleteSchool } = require('../../controller/schoolsController.js')

router
    .get('/grades', getGrades)
    .get('/count', getCount)
    .get('/:id', getSchool)
    .get('/', (req, res) => {
        if(req.query._page){
        getSomeSchools(req, res)
    }else{

        getAllSchools(req, res)
    }})
    .post('/', addSchool)
    .put('(/)||(/:id)', updateSchool)
    .delete('/:id', deleteSchool)

module.exports = router;