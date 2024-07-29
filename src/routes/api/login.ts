export { };
var express = require('express');
const router = express.Router();
const { getUser, updateUser} = require('../../controller/loginController.js')

router
    .get('/', getUser)
    .patch('/', updateUser)


module.exports = router;