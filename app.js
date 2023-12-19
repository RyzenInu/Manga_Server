const express = require("express")
const requestHandlers = require("./scripts/requestHandlers")
const bodyParser = require("body-parser")
const app = express()

app.use("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("./public"))

app.listen(2000, () => {
    console.log("Server running on http://localhost:2000/");
});

app.get("/", res.render())
app.get("/login", requestHandlers.login)