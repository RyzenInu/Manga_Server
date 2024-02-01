const mysql = require('mysql')
const busboy = require('connect-busboy')
var path = require('path')
var fs = require('fs')
const bodyParser = require("body-parser")
const options = require('../options.json')

const userCreate = (req, res) => {
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
            where email = '${email}' or nome_utilizador = '${username}'`, (err, result) => {
            if (err) {
                res.json({ registered: false, error: err.message })
                con.end();
            } else if (result.length === 0) {
                let queryUser = mysql.format(`insert into utilizador (nome, apelido, email, id_lab) values(?,?,?,1)`, [firstname, lastname, email]);
                con.query(queryUser, (err, results) => {
                    if (err) {
                        res.json({ registered: false, error: err.message });
                        con.end();
                    }
                    else {
                        userId = results.insertId;
                        let queryLogin = mysql.format(`insert into login (nome_utilizador, pass_word) values (?,?);`, [username, password]);
                        con.query(queryLogin, (err, results) => {
                            if (err) {
                                res.json({ registered: false, error: err.message, query: queryLogin })
                                con.end();
                            }
                            else {
                                loginId = results.insertId;
                                let queryLoginUser = mysql.format(`insert into login_utilizador (id_login, id_utilizador) values(?,?);`, [loginId, userId]);
                                con.query(queryLoginUser, (err, results) => {
                                    if (err) { res.json({ registered: false, error: err.message }) }
                                    else {
                                        res.json({ registered: true });
                                    }
                                    con.end();
                                });
                            }
                        });
                    }
                })
            } else {
                res.json({ registered: false, error: "Account already exists." });
                con.end();
            }
        });
    }))
}

const userUpdate = (req, res) => {
    let update = req.body;
    let firstname = update.firstname;
    let lastname = update.lastname;
    let username = update.username;
    let email = update.email;
    let password = update.password;
    let img = update.img;

    let loginId;
    let userId = parseInt(req.params.id);

    let con = mysql.createConnection(options.database);
    con.connect((err => {
        if (err) res.json({ error: err.message, updated: false })
        else {
            let queryGetLoginId = mysql.format(`select id_login from login_utilizador where id_utilizador = ?`, [userId]);
            con.query(queryGetLoginId, (err, result) => {
                if (err) {
                    res.json({ error: err.message, updated: false })
                    con.end();
                    return;
                } else if (result.length === 1) {
                    loginId = result[0].id_login;

                    let queryUpdateLogin = mysql.format(`
                        update login
                        set nome_utilizador = ?, pass_word = ?
                        where id_login = ?
                        `, [username, password, loginId]);
                    con.query(queryUpdateLogin, (err, result) => {
                        if (err) {
                            res.json({ error: err.message, updated: false })
                            con.end();
                            return;
                        } else {
                            let queryUpdateLogin = mysql.format(`
                                update utilizador
                                set nome = ?, apelido = ?, email = ?, img = ?
                                where id_utilizador = ?
                                `, [firstname, lastname, email, img, userId]);
                            con.query(queryUpdateLogin, (err, result) => {
                                if (err) {
                                    res.json({ error: err.message, updated: false })
                                    con.end();
                                    return;
                                } else {
                                    res.json({ updated: true })
                                }
                            });
                        }
                    })
                } else {
                    res.json({ error: "Couldn't get login for this user." })
                    con.end();
                    return;
                }
            });
        }
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
            let query = mysql.format(`select * from login where nome_utilizador = ? and pass_word = ?`, [username, password]);
            con.query(query, (err, result) => {
                if (err) {
                    res.json({ logged: false, error: err.message })
                    console.log(err.message)
                    con.end();
                } else {
                    if (result.length === 0) {
                        res.json({ logged: false, error: "No Login found with these credentials." });
                    } else if (result.length === 1) {
                        let loginId = result[0].id_login;

                        con.query(`select id_utilizador from login_utilizador where id_login = '${loginId}'`, (err, result) => {
                            if (err) {
                                res.json({ logged: false, error: err.message })
                                con.end();
                            } else {
                                res.json({ logged: true, userId: result[0].id_utilizador })
                            }
                        })
                    }
                }
                con.end();
            });
        }
    }))
}

const userGet = (req, res) => {
    let con = mysql.createConnection(options.database);
    con.connect((err => {
        if (err) res.json({ error: err.message })
        else {
            if (Number(req.params.id) != NaN) {
                let query = mysql.format(`select utilizador.img, login.nome_utilizador as username, utilizador.nome as firstname, utilizador.apelido as lastname, utilizador.email, lab.nome as lab from utilizador inner join lab on utilizador.id_lab = lab.id_lab inner join login_utilizador on utilizador.id_utilizador = login_utilizador.id_utilizador inner join login on login.id_login = login_utilizador.id_login where utilizador.id_utilizador = ?;`, [req.params.id]);
                con.query(query, (err, result) => {
                    if (err) {
                        res.json({ error: err.message })
                        con.end();
                    } else if (result.length > 0) {
                        let user = result[0];
                        res.json({
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            email: user.email,
                            lab: user.lab,
                            img: user.img
                        })
                    }
                    con.end();
                })
            } else {
                res.json({ error: "Failed to get user data: ID is NaN." });
                con.end();
            }
        }
    }))
}

const userUploadImg = (req, res) => {
    //console.log(req);
    let username;
    req.pipe(req.busboy); // Pipe it trough busboy
    req.busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
        //console.log("val: " + val)
        username = val;
    })
    req.busboy.on('file', (fieldname, file, info) => {
        //console.log(`Upload of '${info.filename}' started`);
        //console.log(info)
        while (username == undefined) {
        }
        //console.log("username: " + username)
        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(__dirname, "..", "\\public\\images\\users\\", ("img_" + username + path.extname(info.filename)) /*info.filename)*/));

        // Pipe it trough
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            //console.log(`Upload of '${info.filename}' finished`);
            res.json({});
        });
    });
}

const usersGet = (req, res) => {
    let con = mysql.createConnection(options.database);
    con.connect((err => {
        if (err) res.json({ error: err.message })
        else {
            let query = `select utilizador.img, utilizador.nome as firstname, utilizador.apelido as lastname, utilizador.email, lab.nome as lab from utilizador inner join lab on utilizador.id_lab = lab.id_lab inner join login_utilizador on utilizador.id_utilizador = login_utilizador.id_utilizador inner join login on login.id_login = login_utilizador.id_login;`;
            con.query(query, (err, result) => {
                if (err) {
                    res.json({ error: err.message })
                    con.end();
                } else if (result.length > 0) {
                    res.json(result)
                }
                con.end();
            })
        }
    }))
}

module.exports.usersGet = usersGet;
module.exports.userCreate = userCreate;
module.exports.userLogin = userLogin;
module.exports.userGet = userGet;
module.exports.userUpdate = userUpdate;
module.exports.userUploadImg = userUploadImg;