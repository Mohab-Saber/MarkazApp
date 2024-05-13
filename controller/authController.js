const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pg = require('pg');
const fsPromises = require('fs').promises;
const credentials = require('../model/credentials.json');
const path = require('path');
require('dotenv').config()

const handleLogin = async (req, res) => {
    const {user, password} = req.body;
    
    if(!user || !password){return res.status(400).send('Missing Username or Password')}
    const client = new pg.Client({
        host : process.env.DB_HOST || 'localhost',
        port : process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'MarkazDB',
        user: user,
        password: password,
        idle_in_transaction_session_timeout: 10000,
    })
    try{
        await client.connect()
        
    }catch(err){
        // Case False Credentials
        console.log(err);
        client.end()
        return res.sendStatus(401)
    }
    client.end()
    process.env.USERNAME = user;
    process.env.PASSWORD = password;


    const accessToken = jwt.sign(
        {
            "UserInfo": {
                user: 'markaz_user',
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '40s'}
    )
    const refreshToken = jwt.sign(
        {
            "UserInfo": {
                user: 'markaz_user',
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    )
    res.cookie('jwtRefreshToken', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 86400000 });
    res.status(200).send(accessToken)
    
}

module.exports = {handleLogin}