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


exports.getAllTrainers = () => {
    try {
        const sql = `SELECT * FROM Trainers;`
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

exports.addToTableTrainers = (trainer) => {
    if (!trainer || typeof trainer !== 'object') {
        return { statusCode: 400, error: { message: 'Send a valid Trainer' } }
    }
    try {
        if (!trainer?.fullName) { return { statusCode: 400, error: { message: `FullName must be included` } } }

        const { fullName, speciality, residence, telephone, email } = trainer;

        const insertStmt = db.prepare(`INSERT INTO Trainers (fullName, speciality, residence, telephone, email) VALUES (?, ?, ?, ?, ?) ;`);

        const dbOpCode = insertStmt.run(e(fullName) || null, e(speciality) || null, e(residence) || null, e(telephone) || null, e(email) || null);

        return {
            statusCode: 200,
            dbOpCode
        }
    } catch (error) {
        return {
            statusCode: 500,
            error
        }
    }

}

exports.updateTableTrainers = (trainer) => {
    try {
        if (!trainer || typeof trainer !== 'object') {
            return { statusCode: 400, error: { message: 'Send a valid Trainer' } }
        }
        if (!trainer.id) { return { statusCode: 400, error: { message: 'ID must be included' } } }
        let id = parseInt(trainer.id);
        if (isNaN(id) || `${id}`.length !== `${trainer.id}`.length || id < 0) { return { statusCode: 400, error: { message: 'Send a valid ID' } } }

        const rows = db.prepare(`SELECT * FROM Trainers WHERE id = ${trainer.id}`).all();
        if (rows.length > 1) { return { statusCode: 500, error: { message: 'ID is not Unique' } } }
        if (rows.length === 0) { return { statusCode: 404, error: { message: `No member with such ID ${id}` } } }
        if (!rows[0]?.fullName) { return { statusCode: 500, error: { message: 'No name ERR' } } }

        const trainerKeys = Object.keys(trainer);

        let updateStmt;
        const dbOpCodes = [];
        let index = 0;
        let sql;
        for (key of trainerKeys) {
            if (key === `id`) { continue }
            sql = `UPDATE Trainers SET ${key} = ? WHERE id = ${id}`
            updateStmt = db.prepare(sql)
            dbOpCodes[index] = updateStmt.run(trainer[key]);
            index += 1;
        }
        if (dbOpCodes.length === 0) { return { statusCode: 200, dbOpCodes: 'Nothing Changed' } }
        return {
            statusCode: 200,
            dbOpCodes
        }
    } catch (error) {

        return {
            statusCode: 500,
            error
        }
    }
}

exports.deleteFromTrainers = (trainer) => {
    try {
        if (!trainer || typeof trainer !== 'object') {
            return { statusCode: 400, error: { message: 'Send a valid Trainer' } }
        }
        if (!trainer.id || !trainer.fullName) { return { statusCode: 400, error: { message: 'You must insert ID and FullName' } } }
        let id = parseInt(trainer.id);
        if (isNaN(id) || `${id}`.length !== `${trainer.id}`.length || id < 0) { return { statusCode: 400, error: { message: 'Send a valid ID' } } }

        const rows = db.prepare(`SELECT * FROM Trainers WHERE id = ${id}`).all();
        if (rows.length > 1) { return { statusCode: 500, error: { message: 'ID is not Unique' } } }
        if (rows.length === 0) { return { statusCode: 404, error: { message: `No member with such ID ${id}` } } }
        if (!rows[0]?.fullName) { return { statusCode: 500, error: { message: 'No name ERR' } } }
        // if (rows.fullName !== fullName) {return res.status(400).send(`FullName doesn't match`);}

        const dbOpCode = db.exec(`DELETE FROM Trainers WHERE id IN ('${id || -1}')`)

        return {
            statusCode: 200,
            dbOpCode
        }

    } catch (error) {

        return {
            statusCode: 500,
            error
        }
    }
}