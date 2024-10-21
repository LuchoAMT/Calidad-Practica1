const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'mysql-juanpablom.alwaysdata.net',
    user: '381177',
    password: 'UCB-MERKA-12345',
    database: 'juanpablom_merka2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool;