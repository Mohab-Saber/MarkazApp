import express from 'express';
const appServer = express();
const PORT = process.env.PORT || 3060;
import path from 'node:path';
import cors from 'cors';

appServer.use(cors());
// built-in middleware to handle urlencoded form data
appServer.use(express.urlencoded({ extended: false }));
// built-in middleware for json 
appServer.use(express.json({limit: '500mb'}));
appServer.use(express.text());


appServer.use('/check', (req, res) => (res.sendStatus(200)));

// Serve static files
appServer.use('/', express.static(path.join(__dirname, '..', 'views')));
appServer.use(/^\/(trainee|trainer|course|courseform|pdf|school|admin|courseview)$/, require('./routes/root'));
appServer.use('/login', require('./routes/login'));

// Login
appServer.use('/api/login', require('./routes/api/login'));

// PROTECTED ROUTES (really?)
appServer.use('/api/trainees', require('./routes/api/trainees'));
appServer.use('/api/trainers', require('./routes/api/trainers'));
appServer.use('/api/courses', require('./routes/api/courses'));
appServer.use('/api/schools', require('./routes/api/schools'));
appServer.use('/api/adminstrations', require('./routes/api/adminstrations'));
appServer.use('/api/pdf', require('./routes/api/pdf'));
appServer.use('/api/disclaimer', require('./routes/api/disclaimer'));

appServer.listen(PORT, () => console.log(`SERVER Runinng ${PORT}`))




module.exports = {appServer};