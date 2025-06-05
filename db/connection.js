const mysql = require('mysql2/promise');

const poolConnection = mysql.createPool({
    host: "bealqultwxxflsryaa6q-mysql.services.clever-cloud.com",
    user: "ujaslinz9d1fhwr6",
    password: "wFsfOtbR8ZoU39CIQ4eD",
    database: "bealqultwxxflsryaa6q",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = poolConnection;