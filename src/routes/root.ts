export {};
var express = require('express');
var path = require('path');
const router = express.Router();

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'));
});

module.exports = router;