import express from 'express';
const appServer = express();
const PORT = process.env.PORT || 3060;
import path from 'node:path';


// built-in middleware to handle urlencoded form data
appServer.use(express.urlencoded({ extended: false }));
// built-in middleware for json 
appServer.use(express.json());

//serve static files
appServer.use('/', express.static(path.join(__dirname, '..', 'views')));
appServer.use('/', require('./routes/root.js'));

// PROTECTED ROUTES
appServer.use('/api/trainees', require('./routes/api/trainees.js'));
appServer.use('/api/trainers', require('./routes/api/trainers.js'));
appServer.use('/api/courses', require('./routes/api/courses.js'));






module.exports = {appServer};