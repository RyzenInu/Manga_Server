const express = require("express")
const requestHandlers = require("./scripts/requestHandlers")
const bodyParser = require("body-parser")
const app = express()
const MqttHandler = require("./scripts/mqttHandler");
const options = require("./options.json");
const busboy = require('connect-busboy');
const path = require('path');
const fs = require('fs');
const { request, STATUS_CODES } = require("http");
const mysql = require("mysql")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("./public"))
//app.use(express.static("images/users"))

app.use(busboy());

app.set('view engine', 'ejs')
app.set("views", "./views")

const mqtt = new MqttHandler(
    (options.mqtt.protocol + options.mqtt.host),
    options.mqtt.clientId,
    options.mqtt.username,
    options.mqtt.password
);

// mqtt
mqtt.connect();
app.post("/mqtt/send/:topic/:device/:message", (req, res) => {
    let topic = req.params.topic;
    let message = req.params.message;
    let device = req.params.device;

    let payload = { device: device, message: message }
    mqtt.sendMessage(topic, payload);
    res.sendStatus(200);
});
//mqtt.sendMessage("peltierControl", "ON");

// Test function to create fictional, random, data and send it to the database.
//
// setInterval(async () => {
//     let randomNum = (Math.random() * (22.0 - 18.0) + 18.0).toFixed(2);
//     let randomVol = (Math.random() * (0.0 - 0.35) + 0.35).toFixed(3);
//     //mqtt.sendMessage("temp", randomNum);
//     //mqtt.sendMessage("volume", randomVol);

//     let con = mysql.createConnection(options.database)
//     con.connect((err => {
//         if (err) {
//             console.log(err);
//             con.end();
//         } else {
//             let query = mysql.format("insert into temp(valor, id_recipiente) values(?,?)", [randomNum, 1]);
//             con.query(query, (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     con.end();
//                 } else {
//                     query = mysql.format("insert into volume(valor, id_recipiente) values(?,?)", [randomVol, 1]);
//                     con.query(query, (err, result) => {
//                         if (err) {
//                             console.log(err);
//                             con.end();
//                         } else { con.end() }
//                     })
//                 }
//             })
//         }
//     }))
// }, 3000);

// Page Routing
app.get("/", (req, res) => { res.redirect("/manga") })
app.get("/manga", (req, res) => { res.render("manga") })
app.get("/home", (req, res) => { res.render("home") })
app.get("/equipment", (req, res) => { res.render("equipment") })
app.get("/stats", (req, res) => { res.render("stats") })
app.get("/login", (req, res) => { res.render("login") })
app.get("/register", (req, res) => { res.render("register") })

// User
app.get("/users/", requestHandlers.usersGet);
app.get("/user/:id/", requestHandlers.userGet);
app.post("/user/login/", requestHandlers.userLogin)
app.post("/user/create/", requestHandlers.userCreate)
app.put("/user/update/:id", requestHandlers.userUpdate)
app.post("/user/image/", requestHandlers.userUploadImg)
app.get("/team/users/:userid", requestHandlers.teamUsersGet)

// Equipment
app.get("/equipment/all/", requestHandlers.equipmentGetAll)
app.get("/equipment/mac/:macAdd", requestHandlers.equipmentMacGet)
app.get("/equipment/user/:userid", requestHandlers.equipmentUserGet)
app.post("/equipment/user/add/:userid", requestHandlers.equipmentUserAdd)
app.get("/equipment/:equipmentId/sensors", requestHandlers.equipmentGetSensors)
app.get("/equipment/:equipmentId/sensors/:numReadings", requestHandlers.equipmentGetSensorsLimit)


app.listen(options.server.port, () => {
    console.log(`Server running on http://localhost:${options.server.port}/`);
});