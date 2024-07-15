export { };
var express = require('express');
const router = express.Router();
const {getCount, getTrainee, getAllTrainees,getSomeTrainees, addTrainee, updateTrainee, deleteTrainee } = require('../../controller/traineesController.js')

router
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