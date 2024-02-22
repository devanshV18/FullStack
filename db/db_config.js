const mysql = require("mysql2");  //mysql module is decalred as const to not change it throughout app lifecycle from mysql2 lib

const connection = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"dbop",
    database:"movies",
})


