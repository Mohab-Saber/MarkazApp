export { };
var express = require('express');
const router = express.Router();
const {getSpecialities, getCount, getTrainer, getAllTrainers,getSomeTrainers, addTrainer, updateTrainer, deleteTrainer } = require('../../controller/trainersController.js')

router
    .get('/specialities', getSpecialities)
    .get('/count', getCount)
    .get('/:id', getTrainer)
    .get('/', (req, res) => {
        if(req.query._page){
        getSomeTrainers(req, res)
    }else{

        getAllTrainers(req, res)
    }})
    .post('/', addTrainer)
    .put('/:id', updateTrainer)
    .delete('/:id', deleteTrainer)

module.exports = router;

