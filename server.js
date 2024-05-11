const express = require('express');
const app = express();
const PORT = process.env.PORT || 3060;
const pg = require('pg');
const cors = require('cors');
const path = require('path');
const verifyJWT = require('verifyJWT');
const cookieParser = require('cookie-parser');
require('dotenv').config();


// MiddleWares
app.use(cors());
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('^/$|/index(.html)?', require('./routes/root'));
app.use('/auth', require('./routes/auth'))

app.use('/addmodareb', require('./routes/addmodareb'))


app.listen(PORT, ()=>{console.log(`Server Running on PORT =>(3060)<= `)})