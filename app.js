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
app.post("/mqtt/send/:topic/:message", (req, res) => {
    let topic = req.params.topic;
    let message = req.params.message;
    mqtt.sendMessage(topic, message);
    res.sendStatus(200);
});
//mqtt.sendMessage("peltierControl", "ON");

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
app.get("/equipment/user/:userid", requestHandlers.equipmentUserGet)
app.post("/equipment/user/add/:userid", requestHandlers.equipmentUserAdd)


app.listen(options.server.port, () => {
    console.log(`Server running on http://localhost:${options.server.port}/`);
});