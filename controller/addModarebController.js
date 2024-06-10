const handleAddedModareb = (req, res) => {
    const modareb = req.body
    if(!modareb){return res.statusCode(400).send({err: 'You must send the Modarab to be added'})}
    const {name, speciality,telephone, balad, email, code} = modareb
    if(!name || !speciality){return res.status(400).send({err: 'You must send at least a name and a speciality'})}
    
    let client = new pg.Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.PASSWORD
    });

    client.connect();
    let str = `
    INSERT INTO modareb (nams, takhass, balad, t, email, cod)
     VALUES ('${name}', '${speciality}','${balad}', ${telephone}, '${email}', '${code}')`
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