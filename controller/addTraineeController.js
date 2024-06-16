const DB_NAME = process.env.DB_NAME;
const DB_KEY = process.env.DB_KEY;

const eliminateWhiteSpaceFromString = (item) => {
    if (typeof item === 'string') {
        return item.replace(/\s+/g, ' ').trim();
    } else {
        return item
    }
}
const e = eliminateWhiteSpaceFromString;

const addTrainee = async (req, res) => {
    try {
        const db = require('better-sqlite3-multiple-ciphers')(DB_NAME || 'actualDB.db');
        db.pragma(`cipher='sqlcipher'`);
        db.pragma(`legacy=4`);
        // db.pragma(`key='${DBkey}'`);

        const trainee = req.body;
        if (!trainee) { return res.status(400).send(`Send some Data to be POSTed`); }
        if (!trainee.fullName) { return res.status(400).send(`FullName must be included`); }

        const { fullName, jobTitle, speciality, qualification, graduationDate, birthDate, hiringDate, courses, school, gradeLevel, administration, teachersCode, nationalId, residence, telephone, email } = trainee;

        const insertStmt = db.prepare(`INSERT INTO Trainee (fullName, jobTitle, speciality, qualification, graduationDate, birthDate, hiringDate, courses, school, gradeLevel, administration, teachersCode, nationalId, residence, telephone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;`);

        const dbOpCode = insertStmt.run(e(fullName) || null, e(jobTitle) || null, e(speciality) || null, e(qualification) || null, e(graduationDate) || null, e(birthDate) || null, e(hiringDate) || null, e(courses) || null, e(school) || null, e(gradeLevel) || null, e(administration) || null, e(teachersCode) || null, e(nationalId) || null, e(residence) || null, e(telephone) || null, e(email) || 'mango@gmail.com');


        db.close()
        return res.status(200).send(dbOpCode);
    } catch (err) {

        console.log(`====>ERROR`)
        console.log(err)
        return res.status(400).send(err.message)
    }
};
module.exports = { addTrainee };