const path = require('path');
const DBname = process.env.DB_NAME;
const DBpass = process.env.DB_PASS;

const addTrainee = async (req, res) => {
    const db = require('better-sqlite3-multiple-ciphers')('data/actualDB.db');
    const trainee = req.body;
    if (!trainee) { return res.status(400).send(`Send some Data to be POSTed`); }

    const { fullName, jobTitle, speciality, qualification, graduationDate, birthDate, hiringDate, courses, school, gradeLevel, administration, teachersCode, nationalId, residence, telephone, email } = trainee;

    try {
        db.pragma(`cipher='sqlcipher'`);
        db.pragma(`legacy=4`);
        db.pragma(`key='11'`);

        const insertStmt = db.prepare(`INSERT INTO Trainee (fullName, jobTitle, speciality, qualification, graduationDate, birthDate, hiringDate, courses, school, gradeLevel, administration, teachersCode, nationalId, residence, telephone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;`);

        const dbOpCode = insertStmt.run(fullName || null, jobTitle || null, speciality || null, qualification || null, graduationDate || null, birthDate || null, hiringDate || null, courses || null, school || null, gradeLevel || null, administration || null, teachersCode || null, nationalId || null, residence || null, telephone || null, email || 'mango@gmail.com');

        console.log(`=====TestValue`)
        console.log(dbOpCode)
        console.log(`=====`)
        db.close()
        return res.status(200).send(dbOpCode);
    } catch (err) {

        console.log(`====>ERROR`)
        console.log(err)
        return res.status(400).send(err.message)
    }
};
module.exports = { addTrainee };