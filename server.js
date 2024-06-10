const express = require('express');
const app = express();
const PORT = process.env.PORT || 3060;
const cors = require('cors');
const path = require('path');
const verifyJWT = require('./middleware/verifyJWT');
require('dotenv').config();

// MiddleWares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('(^/$)|(/index(.html)?)|(/parent)|(/gallery)|(/proj)', require('./routes/root'));

app.use(express.static(path.join(__dirname, 'views')));
app.use('/auth', require('./routes/auth'));

app.use(verifyJWT);

app.use('/api/getmodareb', require('./routes/api/getmodareb'));
app.use('/api/addmodareb', require('./routes/api/addmodareb'));

app.listen(PORT, () => { console.log(`Server Running on PORT =>(3060)<= `) })