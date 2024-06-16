const DB_NAME = process.env.DB_NAME;
const DB_KEY = process.env.DB_KEY;

const eliminateWhiteSpace = (str) => {
    if (typeof str == 'string') {
        return str.replace(/\s+/g, ' ').trim();
    } else {
        return null
    }
}
const e = eliminateWhiteSpace;

const updateTrainee = async (req, res) => {
    try {
        const db = require('better-sqlite3-multiple-ciphers')(DB_NAME || 'actualDB.db');
        db.pragma(`cipher='sqlcipher'`);
        db.pragma(`legacy=4`);
        // db.pragma(`key='${DBkey}'`);
        const trainee = req.body;
        if (!trainee) { return res.status(400).send(`Send some Data to be PATCHed`); }
        if (!trainee.id) { return res.status(400).send(`ID must be included`); }
        let id = parseInt(trainee.id);
        if (isNaN(id) || `${id}`.length !== `${trainee.id}`.length) { return res.status(400).send(`Send a valid id`) }

        const rows = db.prepare(`SELECT * FROM Trainee WHERE id = ${trainee.id}`).all();
        if (rows.length > 1) { return res.status(500).send(`ID is not unique`); }
        if (rows.length === 0) { return res.status(404).send(`No member with this ID`); }
        if (!rows[0]?.fullName) { return res.status(500).send(`No name ERR`); }

        const traineeKeys = Object.keys(trainee);

        // const traineeAttributes = [
        //     trainee.fullName, trainee.jobTitle, trainee.speciality, trainee.qualification, trainee.graduationDate, trainee.birthDate, trainee.hiringDate, trainee.courses, trainee.school, trainee.gradeLevel, trainee.administration, trainee.teachersCode, trainee.nationalId, trainee.residence, trainee.telephone, trainee.email];

        let updateStmt; 
        const dbOpCodes = [];
        let index = 0;
        let sql;
        for (key of traineeKeys) {
            if (key === `id`) { continue}
            sql = `UPDATE Trainee SET ${key} = ? WHERE id = ${trainee.id}`


            updateStmt = db.prepare(sql)
            dbOpCodes[index] = updateStmt.run(trainee[key]);
            index += 1;
        }


        // const insertStmt = db.prepare(`INSERT INTO Trainee (fullName, jobTitle, speciality, qualification, graduationDate, birthDate, hiringDate, courses, school, gradeLevel, administration, teachersCode, nationalId, residence, telephone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;`);

        // const dbOpCode = insertStmt.run(e(fullName) || null, e(jobTitle) || null, e(speciality) || null, e(qualification) || null, e(graduationDate) || null, e(birthDate) || null, e(hiringDate) || null, e(courses) || null, e(school) || null, e(gradeLevel) || null, e(administration) || null, e(teachersCode) || null, e(nationalId) || null, e(residence) || null, e(telephone) || null, e(email) || 'mango@gmail.com');


        db.close()
        return res.status(200).send(dbOpCodes);
    } catch (err) {


        return res.status(400).send(err.message)
    }
};
module.exports = { updateTrainee };