import express from 'express';
const appServer = express();
const PORT = process.env.PORT || 3060;
import path from 'node:path';
import cors from 'cors';

appServer.use(cors());
// built-in middleware to handle urlencoded form data
appServer.use(express.urlencoded({ extended: false }));
// built-in middleware for json 
appServer.use(express.json());
appServer.use(express.text());



//serve static files
appServer.use('/', express.static(path.join(__dirname, '..', 'views')));
appServer.use('/', require('./routes/root'));

// PROTECTED ROUTES
appServer.use('/api/trainees', require('./routes/api/trainees'));
appServer.use('/api/trainers', require('./routes/api/trainers'));
appServer.use('/api/courses', require('./routes/api/courses'));
appServer.use('/api/schools', require('./routes/api/schools'));
appServer.use('/api/adminstrations', require('./routes/api/adminstrations'));
appServer.use('/api/specialities', require('./routes/api/specialities'));
appServer.use('/api/pdf', require('./routes/api/pdf'));

appServer.listen(3060, () => console.log(`SERVER Runinng 3060`))




module.exports = {appServer};