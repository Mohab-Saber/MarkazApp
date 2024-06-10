const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
}).all('/',(req, res)=> res.sendStatus(400))

module.exports = router;