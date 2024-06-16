const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401) // unauthorized
    const token = authHeader.split(' ')[1];
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).send('Expired token') // Forbidden
            req.user = decoded.UserInfo;
            next();
        }
    )
};



module.exports =  verifyJWT;