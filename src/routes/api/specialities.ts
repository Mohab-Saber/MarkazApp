export { };
var express = require('express');
const router = express.Router();
const {getCount, getSpeciality, getAllSpecialities,getSomeSpecialities, addSpeciality, updateSpeciality, deleteSpeciality } = require('../../controller/specialitiesController.js')

router
    .get('/count', getCount)
    .get('/:id', getSpeciality)
    .get('/', (req, res) => {
        if(req.query._page){
        getSomeSpecialities(req, res)
    }else{

        getAllSpecialities(req, res)
    }})
    .post('/', addSpeciality)
    .put('/', updateSpeciality)
    .delete('/:id', deleteSpeciality)

module.exports = router;

