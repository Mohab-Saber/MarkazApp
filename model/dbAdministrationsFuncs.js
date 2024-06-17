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


exports.getAllAdministrations = () => {
    try {
        const sql = `SELECT * FROM Administrations;`
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

exports.addToTableAdministrations = (administration) => {
    if (!administration || typeof administration !== 'object') {
        return { statusCode: 400, error: { message: 'Send a valid Administration' } }
    }
    try {


        const insertStmt = db.prepare(`INSERT INTO Administrations (administration) VALUES (?);`);

        const dbOpCode = insertStmt.run(e(administration.administration) || null);

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

exports.deleteFromAdministrations = (administration) => {
    try {
        if (!administration || typeof administration !== 'object') {
            return { statusCode: 400, error: { message: 'Send a valid Administration' } }
        }
        
        const dbOpCode = db.exec(`DELETE FROM Administrations WHERE administration IN ('${administration.administration}')`)

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