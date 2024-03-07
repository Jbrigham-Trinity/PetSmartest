const express = require("express");
const app = express();
const port = 3000;

//running this makes us able to load express files as web pages
app.set('view engine', 'ejs')

app.use(express.static('assets'))
app.use(express.static('styles'))

//check it out its our homepage

app.get("/", function (req, res) {
    /*
    let name = (typeof req.query.name === 'undefined') ? "World" : req.query.name;
    res.send(`Hello ${name}!`);
    */
    res.render('home')
    res.render('productPage')
    res.render('shoppingCart')
});

app.get("shopping", function(req, res) {
    res.render("productPage.ejs")
});
app.get("/accounts", function (req, res) {
    res.send("Welcome to another page!")
})
app.get("/productPage", function (req, res) {
    res.render('productPage')
})
app.get("/shoppingCart", function (req, res){
    res.render('shoppingCart')
})
app.get("/home", function (req, res){
    res.render('home.ejs')
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
