const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const Product = require('./db_connect');
const dotenv = require('dotenv');
dotenv.config();

//running this makes us able to load express files as web pages
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.set('view engine', 'ejs')

app.use(express.static('public'));

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Secure in production only
  }));

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
app.get("/shoppingCart", function (req, res) {
    // Ensure there's a cart array in the session, if not, create an empty one
    if (!req.session.cart) {
        req.session.cart = [];
    }
    // Pass the cart to the shoppingCart.ejs template
    console.log(req.session.cart); // Add this line to log the cart's contents
    res.render('shoppingCart', { cart: req.session.cart });
});

app.get("/search", function (req, res) {
    const searchQuery = req.query.q; // Extract the search query from the URL parameter

    if (!searchQuery) {
        res.render('productPage', { products: [] }); // Handle case where search query is empty
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err; // or handle error appropriately
        
        let sql = `SELECT * FROM Products WHERE Name LIKE ? OR Description LIKE ?;`; // Adjust table name and fields according to your schema
        let query = `%${searchQuery}%`; // Prepare the search query for SQL LIKE operator
        
        connection.query(sql, [query, query], (err, results) => {
            if (err) throw err; // or handle error appropriately
            
            res.render('productPage', { products: results }); // Assuming 'productPage.ejs' can display a list of products
            connection.release();
        });
    });
});


app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = []; // Initialize the cart if it doesn't exist
    }
    next();
});



// Route to handle adding items to the cart
app.post("/addToCart", async (req, res) => {
    const productName = req.body.productName; // Ensure the name matches your form/input name

    pool.getConnection(async (err, connection) => {
        if (err) throw err; // or handle error appropriately
        const sql = "SELECT * FROM Products WHERE Name = ?"; // Adjust according to your schema
        connection.query(sql, [productName], (err, results) => {
            if (err) throw err; // or handle error appropriately
            if (results.length > 0) {
                const product = results[0];
                if (!req.session.cart) {
                    req.session.cart = [];
                }
                req.session.cart.push(product); // Add the product to the session cart
                res.redirect('/productPage');
            } else {
                // Handle case where product is not found
                res.send("Product not found");
            }
            connection.release();
        });
    });
});
app.post("/buyNow", async (req, res) => {
    const productName = req.body.productName; // Ensure the name matches your form/input name

    pool.getConnection(async (err, connection) => {
        if (err) throw err; // or handle error appropriately
        const sql = "SELECT * FROM Products WHERE Name = ?"; // Adjust according to your schema
        connection.query(sql, [productName], (err, results) => {
            if (err) throw err; // or handle error appropriately
            if (results.length > 0) {
                const product = results[0];
                if (!req.session.cart) {
                    req.session.cart = [];
                }
                req.session.cart.push(product); // Add the product to the session cart
                res.redirect('/shoppingCart');
            } else {
                // Handle case where product is not found
                res.send("Product not found");
            }
            connection.release();
        });
    });
});




app.get("/home", function (req, res){
    res.render('home.ejs')
})
app.get("/login", function (req, res){
    res.render('login.ejs')
})
app.get("/makeAccount", function (req, res){
    res.render('makeAccount.ejs')
})

app.get("/adminLogin",function (req, res){
    res.render("adminLogin.ejs")
})

app.get("/adminPage",function (req, res){
    res.render("adminPage.ejs")
})
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});