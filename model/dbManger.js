const sqlite = require('better-sqlite3-multiple-ciphers');
const db = new sqlite('./actualDB.db');
exports.db = db;