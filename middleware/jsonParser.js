const body_parser = require('body-parser');
const router = require('express').Router();

router.use( (req, res, next)=>{
    body_parser.json();
    if(0){
        res.sendStatus(400)
    }else{
        console.log('sssa')
        next()
    }

})

module.exports = router;