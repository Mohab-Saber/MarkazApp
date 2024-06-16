const DB_NAME = process.env.DB_NAME;
const DB_KEY = process.env.DB_KEY;

const getAllTrainees = async (req, res) => {

    const db = require('better-sqlite3-multiple-ciphers')(DB_NAME || 'actualDB.db');
    db.pragma(`cipher='sqlcipher'`);
    db.pragma(`legacy=4`);

    try {
        const rows = db.prepare('SELECT * FROM Trainee').all();
        res.status(200).send(rows)
        return db.close();
    } catch (err) {
        console.log(err);
        res.status(400).send(err)
        return db.close();
    }
}
module.exports = { getAllTrainees };