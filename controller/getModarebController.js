const pg = require('pg');

const handleGetmodareb = async (req, res) => {
    if(!process.env.USER || !process.env.PASSWORD){return res.status(403).send('Login first')}
    let options = req.body;
    let limit;
    if(options) {limit = options.limit;}

    let client = new pg.Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.USER,
        password: process.env.PASSWORD
    });
    try{
        await client.connect();
    }catch(err){
        console.log(err);
        await client.end();
        client = null;
        return res.status(500).send('Internal Server Error');
    }
    let command = `SELECT * FROM modareb`
    let str = `${command} ${limit ? `LIMIT ${parseInt(limit)}` : ``};`
    console.log(`str => ${str}`)
    client.query(str,
        (err, result) => {
            if(err){
                console.error(err);
                client = null;
                return res.sendStatus(400)
            }else{
                client = null;
                return res.status(200).send(result)
            }
        })
}

module.exports = {handleGetmodareb}