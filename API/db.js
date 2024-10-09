const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3735209',
    password: 'iYPaC2ZRGf',
    database: 'sql3735209',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool;
