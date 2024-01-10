const express = require("express")
const requestHandlers = require("./scripts/requestHandlers")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("./public"))

app.set('view engine', 'ejs')
app.set("views", "./views")

app.listen(2000, () => {
    console.log("Server running on http://localhost:2000/");
});

app.get("/", (req, res) => {res.redirect("/manga")})
app.get("/manga", (req, res) => {res.render("manga")})
app.get("/home", (req, res) => {res.render("home")})
app.get("/equipment", (req, res) => {res.render("equipment")})
app.get("/stats", (req, res) => {res.render("stats")})
