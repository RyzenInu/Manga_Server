const mysql = require('mysql')
const options = require('../options.json')

const userCreate = () => {
    let register = req.body;
    let firstname = register.firstname;
    let lastname = register.lastname;
    let username = register.username;
    let email = register.email;
    let password = register.password;

    let loginId;
    let userId;

    let con = mysql.createConnection(options.database);
    con.connect((err => {
        if (err) throw err
        con.query(`
            select email, nome_utilizador from login 
            inner join login_utilizador on login.id_login = login_utilizador.id_login 
            inner join utilizador on login_utilizador.id_utilizador = utilizador.id_utilizador
            where email = '${email}' or nome_utilizador = '${username}'
        `, async (err, result) => {
            if (err) {
                res.json({ error: err.message })
                console.log(err.message)
            } else if (result.length === 0) {
                let queryUser = mysql.format(`insert into utilizador (nome, apelido, email, id_laboratorio) values(?,?,?,1)`, [firstname, lastname, email]);
                con.query(queryUser, (err, results) => {
                    if (err) res.json({ error: err.message })
                    else {
                        userId = results.insertId;
                        let queryLogin = mysql.format(`insert into login (nome_utilizador, pass_word) values (?,?);`, [username, password]);
                        con.query(queryLogin, (err, results) => {
                            if (err) res.json({ error: err.message })
                            else {
                                loginId = results.insertId;
                                let queryLoginUser = mysql.format(`insert into login_utilizador (id_login, id_utilizador) values(?,?);`, [loginId, userId]);
                                con.query(queryLoginUser, (err, results) => {
                                    if (err) { res.json({ error: err.message }) }
                                    else {
                                        res.json({ registered: true });
                                    }
                                });
                            }
                        });
                    }
                })
            } else {

            }
            con.end();
        });
    }))
}

const userLogin = (req, res) => {
    let login = req.body;
    let username = login.username;
    let password = login.password;

    let con = mysql.createConnection(options.database);
    con.connect((err => {
        if (err) res.json({ error: err.message })
        else {
            con.query(`select * from login where nome_utilizador = '${username}' and pass_word = '${password}'`, (err, result) => {
                if (err) {
                    res.json({ error: err.message })
                    console.log(err.message)
                } else {
                    if (result.length === 0) {
                        res.json({ logged: false });
                        console.log(result);
                    } else if (result.length === 1) {
                        let loginId = result[0].id_login;
                        let userId;
                        con.query(`select id_utilizador from login_utilizador where id_login = '${loginId}'`, (err, result) => {
                            if (err) {
                                console.log(err.message)
                            } else {
                                userId = result[0].id_utilizador;
                            }
                        })
                        res.json({ logged: true, userId: userId })
                    }
                }
                con.end();
            });
        }
    }))
}

module.exports.userCreate = userCreate;
module.exports.userLogin = userLogin;