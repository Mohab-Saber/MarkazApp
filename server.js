const express = require('express');
const app = express();
const PORT = process.env.PORT || 3060;
const pg = require('pg');
const cors = require('cors');
const corsOptions = require('./serverConfig/serverConfig.js');
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendStatus(404);
})

app.post('/addmodareb', (req, res) => {
    const modareb = req.body
    console.log((modareb))
    if(!modareb?.name){return res.sendStatus(400)}
    
    let client = new pg.Client({
        host: 'localhost',
        user: 'postgres',
        port: 5432,
        password: 'manga',
        database: 'MarkazDB'
    });

    client.connect();
    let str = `INSERT INTO modareb (nams, takhass, balad, t, email, cod) VALUES ('${modareb.name}', '${modareb.speciality}','${modareb.balad}', ${modareb.telephone}, '${modareb.email}', '${modareb.code}')`
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
})


app.listen(PORT, ()=>{})