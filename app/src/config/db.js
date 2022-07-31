const mysql = require("mysql");

const db = mysql.createConnection({
    host: "capstone-server.clddzxzcqoft.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    database: "capstone_server",
});

db.connect();

module.exports = db;