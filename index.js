const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const Product = require('./db_connect');
const dotenv = require('dotenv');
dotenv.config();

//running this makes us able to load express files as web pages
app.set('view engine', 'ejs')

app.use(express.static('public'));

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

// Homepage route
app.get("/", function (req, res) {
    res.render('home');
});

// Product page route
app.get("/productPage", async function (req, res) {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return;
            }
            console.log(`MySQL Connected`);
            
            const productInstance = Product.getProductInstance();
            productInstance.getProductData(connection)
                .then(products => {
                    res.render('productPage', { products });
                })
                .catch(error => {
                    console.error('Error fetching product data:', error);
                    res.status(500).send('Internal Server err');
                })
                .finally(() => {
                    connection.release();
                });
        });
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).send('Internal Server err');
    }
});
app.get("/", function (req, res) {
    
    let name = (typeof req.query.name === 'undefined') ? "World" : req.query.name;
    res.send(`Hello ${name}!`);
    
    res.render('home')
    res.render('productPage')
    res.render('shoppingCart')
    res.render('login')
    res.render('makeAccount')
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
app.get("/login", function (req, res){
    res.render('login.ejs')
})
app.get("/makeAccount", function (req, res){
    res.render('makeAccount.ejs')
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
