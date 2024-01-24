const mysql = require('mysql')
const options = require('../options.json')

const userCreate = () => {
    
}

const userLogin = (req, res) => {
    let login = req.body; 
    let username = login.username;
    let password = login.password;
    
    let con = mysql.createConnection(options.database);
    con.connect((err => {
        con.query("select ")
    }))
}

module.exports.userCreate = userCreate;
module.exports.userLogin = userLogin;