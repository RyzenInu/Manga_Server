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

const mqtt = new MqttHandler("mqtt://127.23.5.214", "manga_server", "pwdam", "password");
mqtt.connect();

app.get("/", (req, res) => { res.redirect("/manga") })
app.get("/manga", (req, res) => { res.render("manga") })
app.get("/home", (req, res) => { res.render("home") })
app.get("/equipment", (req, res) => { res.render("equipment") })
app.get("/stats", (req, res) => { res.render("stats") })
app.get("/login", (req, res) => { res.render("login") })

app.listen(options.server.port, () => {
    console.log(`Server running on http://localhost:${options.server.port}/`);
});