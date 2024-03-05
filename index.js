const express = require("express");
const app = express();
const port = 3000;

//running this makes us able to load express files as web pages
app.set('view engine', 'ejs')

//check it out its our homepage

app.get("/", function (req, res) {
    /*
    let name = (typeof req.query.name === 'undefined') ? "World" : req.query.name;
    res.send(`Hello ${name}!`);
    */
    res.render('home')
    res.render('productPage')
});

app.get("/accounts", function (req, res) {
    res.send("Welcome to another page!")
})
app.get("/productPage", function (req, res) {
    res.render('productPage')
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
