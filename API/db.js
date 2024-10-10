const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'sql5.freesqldatabase.com',
    user: 'sql5736832',
    password: 'GESwtynrVD',
    database: 'sql5736832',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
module.exports = pool;