export { };
var express = require('express');
const router = express.Router();
const {getGrades, getQualifications, getJobTitles, getSpecialities, getCount, getTrainee, getAllTrainees,getSomeTrainees, addTrainee, updateTrainee, deleteTrainee } = require('../../controller/traineesController.js')

router
    .get('/grades', getGrades)
    .get('/qualifications', getQualifications)
    .get('/jobTitles', getJobTitles)
    .get('/specialities', getSpecialities)
    .get('/count', getCount)
    .get('/:id', getTrainee)
    .get('/', (req, res) => {
        if(req.query._page){
        getSomeTrainees(req, res)
    }else{

        getAllTrainees(req, res)
    }})
    .post('/', addTrainee)
    .put('/', updateTrainee)
    .delete('/:id', deleteTrainee)

module.exports = router;