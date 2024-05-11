const pg = require('pg');
const handleAddedModareb = (req, res) => {
    const modareb = req.body
    if(!modareb){return res.statusCode(400).send({err: 'You must send Modarab to be added'})}
    const {name, speciality, balad, email, code} = modareb
    if(!name || !speciality){return res.statusCode(400).send({err: 'You must send a name and a speciality'})}
    
    let client = new pg.Client({
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: 'manga',
        database: 'MarkazDB'
    });

    client.connect();
    let str = `INSERT INTO modareb (nams, takhass, balad, t, email, cod) VALUES ('${name}', '${speciality}','${balad}', ${telephone}, '${email}', '${code}')`
    console.log(`str => ${str}`)
    client.query(str
    , (err, result) => {
    if(err){
        console.error(err);
        client = null
        return res.sendStatus(400)
     }
     console.log(result)
     client = null
     return res.sendStatus(200)
    })
}
module.exports = {handleAddedModareb}