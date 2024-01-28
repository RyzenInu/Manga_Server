const express = require("express")
const requestHandlers = require("./scripts/requestHandlers")
const bodyParser = require("body-parser")
const app = express()
const MqttHandler = require("./scripts/mqttHandler");
const options = require("./options.json");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("./public"))

app.set('view engine', 'ejs')
app.set("views", "./views")

const mqtt = new MqttHandler(
    (options.mqtt.protocol + options.mqtt.host),
    options.mqtt.clientId,
    options.mqtt.username,
    options.mqtt.password
);

//mqtt.connect();
//mqtt.sendMessage("peltierControl", "ON");

app.get("/", (req, res) => { res.redirect("/manga") })
app.get("/manga", (req, res) => { res.render("manga") })
app.get("/home", (req, res) => { res.render("home") })
app.get("/equipment", (req, res) => { res.render("equipment") })
app.get("/stats", (req, res) => { res.render("stats") })
app.get("/login", (req, res) => { res.render("login") })
app.get("/register", (req, res) => { res.render("register") })

app.get("/user/:id/", requestHandlers.userGet);
app.post("/user/login/", requestHandlers.userLogin)
app.post("/user/create/", requestHandlers.userCreate)
app.put("/user/update/:id", requestHandlers.userUpdate)

app.listen(options.server.port, () => {
    console.log(`Server running on http://localhost:${options.server.port}/`);
});