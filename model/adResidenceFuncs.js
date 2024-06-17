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


exports.getAllResidence = () => {
    try {
        const sql = `SELECT * FROM Residence;`
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

exports.addToTableSchools = (residence) => {
    if (!residence || typeof residence !== 'object') {
        return { statusCode: 400, error: { message: 'Send a valid Residence' } }
    }
    if (!residence?.residence) { return { statusCode: 400, error: { message: `School Name must be included` } } }
    
    try {

        const insertStmt = db.prepare(`INSERT INTO Residence (residence, unit) VALUES (?, ?);`);


        const dbOpCode = insertStmt.run(e(residence.residence) || null, e(residence.unit) || null);

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

// exports.updateTableAdministrations = (administration) => {
//     try {
//         if (!administration || typeof administration !== 'object') {
//             return { statusCode: 400, error: { message: 'Send a valid Trainee' } }
//         }

//         sql = `UPDATE Administrations SET administration = ? WHERE id = ${id}`
//         updateStmt = db.prepare(sql)
//         dbOpCode = updateStmt.run();


//         if(dbOpCodes.length === 0) { return {statusCode: 200, dbOpCodes : 'Nothing Changed'} }
//         return {
//             statusCode: 200,
//             dbOpCodes
//         }
//     } catch (error) {

//         return {
//             statusCode: 500,
//             error
//         }
//     }
// }

exports.deleteFromResidence = (residence) => {
    try {
        if (!school || typeof school !== 'object') {
            return { statusCode: 400, error: { message: 'Send a valid School' } }
        }
        
        const dbOpCode = db.exec(`DELETE FROM Schools WHERE schoolName IN ('${school.schoolName}')`)

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