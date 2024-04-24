const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const { Product, createUser, verifyUserAccount, verifyAdminAccount, updateProductQuantity, addnewProduct, 
    productRecommendation, audit, requireLogin, requireAdminLogin, selectProduct, selectRecommendation, getAudit} = require('./db_connect');
const dotenv = require('dotenv');
const store = new session.MemoryStore();
const app = express();
const port = 3000;
dotenv.config();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.use(express.static('public'));
const multer  = require('multer');
const upload = multer();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

function reformatCart(req, product, quantity) {
    let found = false;

    for (let item of req.session.cart) {
        if (item.product.ProductID === product.ProductID) {
            item.quantity += quantity;
            found = true;
            break;
        }
    }
    if (!found) {
        req.session.cart.push({ product, quantity });
    }
}

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.get("/", function (req, res) {
    console.log(req.session.isLoggedIn);
    res.render('home');

});

app.get("/productPage", requireLogin, async function (req, res) {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database for product page:', err);
                return;
            }
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
    res.render('reviewPage')
    res.render('checkout')
});

app.get("shopping", function(req, res) {
    res.render("productPage.ejs")
});

app.get("/accounts", function (req, res) {
    res.send("Welcome to another page!")
});



app.get("/checkout", requireLogin, function (req, res) {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    res.render('checkout', { cart: req.session.cart })
});

app.get("/shoppingCart", requireLogin, function (req, res) {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    res.render('shoppingCart', { cart: req.session.cart });
});

app.get("/search", requireLogin, function (req, res) {
    const searchQuery = req.query.q;

    if (!searchQuery) {
        res.render('productPage', { products: [] });
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        let sql = `SELECT * FROM Products WHERE Name LIKE ? OR Description LIKE ?;`;
        let query = `%${searchQuery}%`;
        
        connection.query(sql, [query, query], (err, results) => {
            if (err) throw err;
            
            res.render('productPage', { products: results});
            connection.release();
        });
    });
});

app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.admin = req.session.admin;
    next();
});


app.post("/updateCart", upload.none(), async (req, res) => {
    const formData = req.body;
    req.session.cart = [];

    pool.getConnection(async (err, connection) => {
        if (err) throw err;
        try {
            const promises = []; 
            for (let key in formData) {
                const value = formData[key];
                const productID = key;
                const quantity = value;
                promises.push(
                selectProduct(productID, connection)
                .then(results => {
                    if (results.length > 0) {
                        const product = results[0];
                        if (!req.session.cart) {
                            req.session.cart = [];
                        }
                        reformatCart(req, product, quantity);
                    }
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                    reject(error);
                })
                );
             }
             await Promise.all(promises);
             connection.release();
             return res.json({ success: true });   
        } catch (error) {
            console.error('Error removing product:', error);
            return res.jason({ success: false})
        }
    });
})
app.post("/addToCart", async (req, res) => {
    const { productID, action} = req.body;
    try{
        pool.getConnection((err, connection) => {
            if (err) throw err;
            selectProduct(productID, connection)
            .then(results => {
                if (results.length > 0) {
                    const product = results[0];
                    if (!req.session.cart) {
                        req.session.cart = [];
                    }
                    reformatCart(req, product, 1);
                    return res.json({ success: true });   
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
                return res.json({ success: false });   
            })
            .finally(() => {
                connection.release();
            });
         });

    } catch (error) {
        console.error('Error removing product:', error);
    }

});

app.post("/removeFromCart", async (req, res) => {
    const productName = req.body.productName;

    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart = req.session.cart.filter(item => item.product.Name !== productName);
    res.redirect('/shoppingCart');
});

app.post("/checkout", async (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return;
            }
            const currentUser = req.session.user[0].Custusername;
            Promise.all(req.session.cart.map(async (cartItem) => {
                const productID = cartItem.product.ProductID;
                const quantity = cartItem.quantity;
                const productName = cartItem.product.Name;
                console.log(cartItem.product.ProductID + " " + quantity);
                await updateProductQuantity(productID, quantity, connection);
                await productRecommendation(currentUser, productID, connection);
                await audit("Delete", currentUser, "User", productID, currentUser + " bought " + quantity + " of " + productName,null, connection);
            }))
            .then(() => {
                console.log("All bought items updated");
                res.redirect('/home')
            })
            .catch(error => {
                console.error('Error updating product quantities:', error);
            })
            .finally(() => {
                connection.release();
            });
        });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).send('Internal server error');
    }

});
app.get("/reviewPage", requireLogin, function (req, res) {
    res.render('reviewPage' )
});

app.post("/reviewPage", async (req, res) => {
        const productId = req.body.ProductID;
        
        pool.getConnection(async (err, connection) => {
            if (err) throw err;

            let sql = 'SELECT * FROM customer_reviews WHERE ProductID = ?;';

            connection.query(sql, [productId], (err, results) => {
                if (err) throw err;

                console.log(results);
                res.render('reviewPage', { reviews: results });
                connection.release();
            });
        });
    });


app.get("/home", function (req, res){
    res.render('home.ejs')
});

app.get("/login", function (req, res){
    res.render('login.ejs', { user : req.session.user })

})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return;
            }
            verifyUserAccount(username, password, connection)
                .then(user => {
                    if (user) {
                        req.session.user = user;  // Set user info in session
                        req.session.isLoggedIn = true; // Set the login flag
                        return res.json({ success: true });   
                    } 
                })
                .catch(error => {
                    console.error('Error verifying user account:', error);
                    return res.json({ success: false });   
                })
                .finally(() => {
                    connection.release();
                });
        });
    } catch (error) {
        console.error('Error processing login request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/adminLogin", function (req, res){
    res.render('adminLogin.ejs')

})
app.post('/adminLogin', async (req, res) => {
    const { username, password } = req.body;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return;
            }
            verifyAdminAccount(username, password, connection)
                .then(admin => {
                    if (admin) {
                        console.log(admin);
                        req.session.admin = admin;  
                        req.session.isAdminLoggedIn = true; 
                        res.redirect('/adminPage');  // Redirect to the admin page
                    } else {
                        res.status(401).send('Invalid username or password');
                    }
                })
                .catch(error => {
                    console.error('Error verifying admin account:', error);
                    res.status(401).send('Invalid username or password');
                })
                .finally(() => {
                    connection.release();
                });
        });
    } catch (error) {
        console.error('Error processing admin login request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/RECOMMENDATIONS', function (req, res){
    try {
        pool.getConnection(async (err, connection) => {
            if(err){
                throw err;
            }
            const currentUser = req.session.user[0].Custusername;

            const allRecommendation = await selectRecommendation(currentUser, connection);

            if (allRecommendation.length > 0) {
                const productPromises = allRecommendation.map(async recommendation => {
                    try {
                        const productDetails = await selectProduct(recommendation.ProductID, connection);
                        return productDetails;
                    } catch (error) {
                        console.error("Error fetching product details:", error);
                        return null;
                    }
                });

                const products = await Promise.all(productPromises);

                const validProducts = products.filter(product => product !== null);
                console.log(validProducts);
                res.render('productPage', { products: validProducts.flat() });
            } else {
                res.render('productPage', { products: [] });
            }
            connection.release();
    });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

});



app.post('/FOOD', function (req, res){
    const category = "food";

    if (!category) {
        res.render('productPage', { products: [] });
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        let sql = `SELECT * FROM Products WHERE Category = ?;`;
        
        connection.query(sql, [category], (err, results) => {
            if (err) throw err;
            
            res.render('productPage', { products: results });
            connection.release();
        });
    });
}) 

app.post('/TOYS', function (req, res){
    const category = "toys";

    if (!category) {
        res.render('productPage', { products: [] });
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        let sql = `SELECT * FROM Products WHERE Category = ?;`;
        
        connection.query(sql, [category], (err, results) => {
            if (err) throw err;
            
            res.render('productPage', { products: results });
            connection.release();
        });
    });
}) 

app.post('/ACCESSORIES', function (req, res){
    const category = "accessories";

    if (!category) {
        res.render('productPage', { products: [] });
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        let sql = `SELECT * FROM Products WHERE Category = ?;`;
        
        connection.query(sql, [category], (err, results) => {
            if (err) throw err;
            
            res.render('productPage', { products: results });
            connection.release();
        });
    });
}) 

app.post('/HEALTH', function (req, res){
    const category = "health";

    if (!category) {
        res.render('productPage', { products: [] });
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        let sql = `SELECT * FROM Products WHERE Category = ?;`;
        
        connection.query(sql, [category], (err, results) => {
            if (err) throw err;
            
            res.render('productPage', { products: results });
            connection.release();
        });
    });
}) 

app.post('/DOGS', function (req, res){
    const category = "dog";

    if (!category) {
        res.render('productPage', { products: [] });
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        let sql = `SELECT * FROM Products WHERE AnimalType = ?;`;
        
        connection.query(sql, [category], (err, results) => {
            if (err) throw err;
            
            res.render('productPage', { products: results });
            connection.release();
        });
    });
}) 

app.post('/CATS', function (req, res){
    const category = "cat";

    if (!category) {
        res.render('productPage', { products: [] });
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        let sql = `SELECT * FROM Products WHERE AnimalType = ?;`;
        
        connection.query(sql, [category], (err, results) => {
            if (err) throw err;
            
            res.render('productPage', { products: results });
            connection.release();
        });
    });
}) 

app.post('/FISH', function (req, res){
    const category = "fish";
    const all = "All Pets"

    if (!category) {
        res.render('productPage', { products: [] });
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        let sql = `SELECT * FROM Products WHERE AnimalType = ?;`;
        
        connection.query(sql, [category || all], (err, results) => {
            if (err) throw err;
            
            res.render('productPage', { products: results });
            connection.release();
        });
    });
}) 
app.post('/ALL', function (req, res){
    const category = "All Pets"

    if (!category) {
        res.render('productPage', { products: [] });
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        let sql = `SELECT * FROM Products WHERE AnimalType = ?;`;
        
        connection.query(sql, [category || all], (err, results) => {
            if (err) throw err;
            
            res.render('productPage', { products: results });
            connection.release();
        });
    });
}) 


app.get("/makeAccount", function (req, res){
    res.render('makeAccount.ejs')
})
app.post('/makeAccount', async (req, res) => {
    const { username, password, confirmPassword, email } = req.body;

    if (password === '' | username === '' | email === '') {
        return res.status(400).send('Please fill in all information');
    }
    if (password !== confirmPassword){
        return res.status(400).send('Password and Confirm Password do not match');
    }
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return;
            }
            console.log(`MySQL Connected to create user account`);
            createUser(username, password, email, connection)
            .then(results => {
                if (results) {
                    res.redirect('/login');
                }
            })
            .catch(error => {
                console.error('Error creating account:', error);
                res.status(401).send('Error creating account');
            })
            .finally(() => {
                connection.release();
            });
         });


    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');   
    }
})
app.get("/adminPage", requireAdminLogin, function (req, res) {
    res.render("adminPage.ejs")
})
app.get("/adminAddProducts", requireAdminLogin, function (req, res) {
    res.render("adminAddProducts.ejs")
})
app.post('/adminAdd', async(req,res) => {
    const {name, category, description, price, quantity, brand, animal, imageurl} = req.body;
    const adminusername = req.session.admin[0].AdminUserName;
    try {
        pool.getConnection(async (err, connection) => {
            if(err){
                throw err;
            }
        const productID = await addnewProduct(name, category, description, price, quantity, brand, animal, imageurl, connection);
        console.log(productID); 
        await audit("Add", null, "Admin", productID, 
                         `Admin created a new product named ${name} with ${quantity} in stock`, adminusername,
                         connection);
        connection.release(); 
        res.json({ success: true }); 
        })
    } catch (error) {
        console.error('Error adding product or updating audit trail:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/adminSubProducts", requireAdminLogin, function (req, res) {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database for editing product page:', err);
                return;

            }
            const productInstance = Product.getProductInstance();
            productInstance.getProductData(connection)
                .then(products => {
                    res.render('adminSubProducts', { products });
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
app.post('/adminUpdate', async(req,res) =>{
    const { productName, quantity, productID, action } = req.body;
    const adminusername = req.session.admin[0].AdminUserName;

    let adjustedQuantity = quantity;
    try {
        pool.getConnection(async (err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return;
            }
            if(action === 'add'){
                adjustedQuantity = -quantity;
            }

            await updateProductQuantity(productID, adjustedQuantity, connection);
            await audit("Edit", null, "Admin", productID, 
                         `Admin ${action} ${quantity} ${productName}  ${quantity} from stock`, adminusername,
                         connection);
            connection.release();
            return res.json({ success: true });
        });
    } catch (error) {
        console.error('Error removing product:', error);
    }
})

app.get("/auditTrail", requireAdminLogin, async function (req, res) {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                throw err;
            }
            getAudit(connection)
                .then(audit => {
                    res.render('auditTrail', { audit });
                })
                .finally(() => {
                    connection.release();

            });
        })
    } catch (error) {
        console.error('Error fetching audit:', error);
        res.status(500).send('Internal Server err');
    }
});
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

//for testing:
module.exports = app.listen(3001, function () {
    //console.log(`Example app listening on port ${3001}!`);
});