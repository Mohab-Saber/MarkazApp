const dbManager = require('./dbManger');
const db = dbManager.db;
db.pragma(`cipher='sqlcipher'`);
db.pragma(`legacy=4`);
// db.pragma(`key='SECRET_KEY'`);
const eliminateWhiteSpaceFromString = (item) => {
    if (typeof item === 'string') {
        return item.replace(/\s+/g, ' ').trim();
    } else {
        return item
    }
}
const e = eliminateWhiteSpaceFromString;


exports.getAllTrainees = (tableName) => {
    if (typeof tableName !== 'string') return 'enter a valid table Name'
    try {
        const sql = `SELECT * FROM ${tableName};`
        let response = db.prepare(sql).all();

        return {
            statusCode: 200,
            response
        }

    } catch (error) {
        return {
            statusCode: 500,
            error
        }
    }
}

exports.addToTableTrainee = (trainee) => {
    if (!trainee || typeof trainee !== 'object') {
        return { statusCode: 400, error: { message: 'Send a valid Trainee' } }
    }
    try {
        if (!trainee?.fullName) { return { statusCode: 400, error: { message: `FullName must be included` } } }

        const { fullName, jobTitle, speciality, qualification, graduationDate, birthDate, hiringDate, courses, school, gradeLevel, administration, teachersCode, nationalId, residence, telephone, email } = trainee;

        const insertStmt = db.prepare(`INSERT INTO Trainee (fullName, jobTitle, speciality, qualification, graduationDate, birthDate, hiringDate, courses, school, gradeLevel, administration, teachersCode, nationalId, residence, telephone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;`);

        const dbOpCode = insertStmt.run(e(fullName) || null, e(jobTitle) || null, e(speciality) || null, e(qualification) || null, e(graduationDate) || null, e(birthDate) || null, e(hiringDate) || null, e(courses) || null, e(school) || null, e(gradeLevel) || null, e(administration) || null, e(teachersCode) || null, e(nationalId) || null, e(residence) || null, e(telephone) || null, e(email) || 'mango@gmail.com');

        return {
            statusCode: 200,
            dbOpCode
        }
    } catch (err) {
        return {
            statusCode: 500,
            error
        }
    }

}

exports.updateTableTrainee = (trainee) => {
    try {
        if (!trainee || typeof trainee !== 'object') {
            return { statusCode: 400, error: { message: 'Send a valid Trainee' } }
        }
        if (!trainee.id) { return { statusCode: 400, error: { message: 'ID must be included' } } }
        let id = parseInt(trainee.id);
        if (isNaN(id) || `${id}`.length !== `${trainee.id}`.length || id < 0) { return { statusCode: 400, error: { message: 'Send a valid ID' } } }

        const rows = db.prepare(`SELECT * FROM Trainee WHERE id = ${trainee.id}`).all();
        if (rows.length > 1) { return { statusCode: 500, error: { message: 'ID is not Unique' } } }
        if (rows.length === 0) { return { statusCode: 404, error: { message: `No member with such ID ${id}` } } }
        if (!rows[0]?.fullName) { return { statusCode: 500, error: { message: 'No name ERR' } } }

        const traineeKeys = Object.keys(trainee);

        let updateStmt;
        const dbOpCodes = [];
        let index = 0;
        let sql;
        for (key of traineeKeys) {
            if (key === `id`) { continue }
            sql = `UPDATE Trainee SET ${key} = ? WHERE id = ${id}`
            updateStmt = db.prepare(sql)
            dbOpCodes[index] = updateStmt.run(trainee[key]);
            index += 1;
        }
        if(dbOpCodes.length === 0) { return {statusCode: 200, dbOpCodes : 'Nothing Changed'} }
        return {
            statusCode: 200,
            dbOpCodes
        }
    } catch (err) {

        return {
            statusCode: 500,
            error
        }
    }
}

exports.deleteTrainee = (trainee) => {
    try {
        if (!trainee || typeof trainee !== 'object') {
            return { statusCode: 400, error: { message: 'Send a valid Trainee' } }
        }
        if (!trainee.id || !trainee.fullName) { return { statusCode: 400, error: { message: 'You must insert ID and FullName' } } }
        let id = parseInt(trainee.id);
        if (isNaN(id) || `${id}`.length !== `${trainee.id}`.length || id < 0) { return { statusCode: 400, error: { message: 'Send a valid ID' } } }

        const rows = db.prepare(`SELECT * FROM Trainee WHERE id = ${id}`).all();
        if (rows.length > 1) { return { statusCode: 500, error: { message: 'ID is not Unique' } } }
        if (rows.length === 0) { return { statusCode: 404, error: { message: `No member with such ID ${id}` } } }
        if (!rows[0]?.fullName) { return { statusCode: 500, error: { message: 'No name ERR' } } }
        // if (rows.fullName !== fullName) {return res.status(400).send(`FullName doesn't match`);}

        const dbOpCode = db.exec(`DELETE FROM Trainee WHERE id IN ('${id || -1}')`)

        return {
            statusCode: 200,
            dbOpCode
        }

    } catch (err) {

        return {
            statusCode: 500,
            error
        }
    }
}