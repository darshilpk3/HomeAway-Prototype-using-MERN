var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'homeaway'
})


module.exports = pool;