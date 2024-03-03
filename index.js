const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
    let name = (typeof req.query.name === 'undefined') ? "World" : req.query.name;
    res.send(`Hello ${name}!`);
});

app.get("/accounts", function (req, res) {
    res.send("Welcome to another page!")
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
