const mysql = require("mysql2");  //mysql module is decalred as const to not change it throughout app lifecycle from mysql2 lib

const connection = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"dbop",
    database:"movies",
})

//err is the callback for reject as per callabck syntax
connection.connect((err) => {
    if(err){
        console.log(`Database Connection Error : ${err}`);
    }
    else{
        console.log(`Database Connection Successful`);
    }
});

module.exports = { connection };