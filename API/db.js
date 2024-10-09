const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3735209',
    password: 'iYPaC2ZRGf',
    database: 'sql3735209'
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

module.exports = db;
