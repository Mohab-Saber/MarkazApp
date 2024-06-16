const DB_NAME = process.env.DB_NAME;
const DB_KEY = process.env.DB_KEY;

const deleteTrainee = (req, res) => {
    try {
        const db = require('better-sqlite3-multiple-ciphers')(DB_NAME || 'actualDB.db');
        db.pragma(`cipher='sqlcipher'`);
        db.pragma(`legacy=4`);

        let { id, fullName } = req.body;
        if (id === undefined || !fullName) { return res.status(400).send('You must insert ID and FullName for the trainee to be deleted'); }

        id = parseInt(req.body.id);
        if(isNaN(id) || `${id}`.length !== `${req.body.id}`.length){return res.status(400).send(`Send a valid id`)}

        

        const rows = db.prepare(`SELECT * FROM Trainee WHERE id = ${id}`).all();
        if (rows.length > 1) { return res.status(500).send(`ID is not unique`); }
        if (rows.length === 0) { return res.status(404).send(`No member with this ID`); }
        if (!rows[0]?.fullName) { return res.status(500).send(`No name ERR`); }
        // if (rows.fullName !== fullName) {return res.status(400).send(`FullName doesn't match`);}

        const dbOpCode = db.exec(`DELETE FROM Trainee WHERE id IN ('${id || -1}')`)

        return res.status(200).send(dbOpCode)


    } catch (err) {
        console.log(`====>ERROR`)
        console.log(err)
        return res.status(400).send(err.message)
    }

}

module.exports = { deleteTrainee }