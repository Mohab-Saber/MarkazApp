export { };
var express = require('express');
const router = express.Router();
const {getWehda_names, getBalad_names, getCount, getAdminstration,getSomeAdminstrations, getAllAdminstrations, addAdminstration, updateAdminstration, deleteAdminstration } = require('../../controller/adminstrationsController.js')

router
.get('/count', getCount)
.get('/wehda_names', getWehda_names)
.get('/balad_names', getBalad_names)
.get('/:id', getAdminstration)
.get('/', (req, res) => {
    if(req.query._page){
    getSomeAdminstrations(req, res)
}else{

    getAllAdminstrations(req, res)
}})
.post('/', addAdminstration)
.put('/:id', updateAdminstration)
.delete('/:id', deleteAdminstration)
module.exports = router;