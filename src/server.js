const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('node:path')

//serve static files
app.use('/', express.static(path.join(__dirname, '..', 'views')));
app.use('/', require('./routes/root.js'));

// PROTECTED ROUTES
// app.use('/api/getAllTrainees', require('./routes/api/getAllTrainees.js'));
// app.use('/api/getAllTrainers', require('./routes/api/getAllTrainers.js'));
// app.use('/api/getAllCourses', require('./routes/api/getAllCourses.js'));

// app.use('/api/addTrainee', require('./routes/api/addTrainee.js'));
// app.use('/api/addTrainer', require('./routes/api/addTrainer.js'));
// app.use('/api/addCourse', require('./routes/api/addCourse.js'));

// app.use('/api/updateTrainee', require('./routes/api/updateTrainee.js'));
// app.use('/api/updateTrainer', require('./routes/api/updateTrainer.js'));
// app.use('/api/updateCourse', require('./routes/api/updateCourse.js'));


// app.use('/api/deleteTrainee', require('./routes/api/deleteTrainee.js'));
// app.use('/api/deleteTrainer', require('./routes/api/deleteTrainer.js'));
// app.use('/api/deleteCourse', require('./routes/api/deleteCourse.js'));

app.use('/api/Trainees', require('./routes/api/Trainees.js'));
app.use('/api/Trainers', require('./routes/api/Trainers.js'));
app.use('/api/Courses', require('./routes/api/Courses.js'));









app.listen(PORT , () => {console.log(`Server running on PORT ${PORT}`)});