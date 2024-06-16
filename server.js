const express = require('express');
const app = express();
const PORT = process.env.PORT || 3060;
const cors = require('cors');
const path = require('path');
const verifyJWT = require('./middleware/verifyJWT');
require('dotenv').config();

// MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Error handler middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err && err.status === 400) {
      res.status(400).send({ error: 'Invalid JSON' });
    } else {
      next(err);
    }
  });

app.use('(^/$)|(/index(.html)?)|(/parent)|(/gallery)|(/proj)', require('./routes/root'));

app.use(express.static(path.join(__dirname, 'views')));
app.use('/auth', require('./routes/auth'));

// app.use(verifyJWT);

app.use('/api/getAllTrainees', require('./routes/api/getAllTrainees.js'));
app.use('/api/addTrainee', require('./routes/api/addTrainee.js'));
app.use('/api/updateTrainee', require('./routes/api/updateTrainee.js'));
app.use('/api/deleteTrainee', require('./routes/api/deleteTrainee.js'));

app.listen(PORT, () => { console.log(`Server Running on PORT =>(3060)<= `) })