const sqlite = require('better-sqlite3-multiple-ciphers');
const db = new sqlite('./aa.db');
exports.db = db;