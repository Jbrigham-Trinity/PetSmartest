const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

class Product {
	static getProductInstance(){
        if (!this.instance) {
            this.instance = new Product();
        }
        return this.instance;
    }

	async getProductData(connection) {
		return new Promise((resolve, reject) => {
			connection.query("SELECT * FROM products", (err, rows) => {
				if (err) {
					console.error('Error executing SQL query:', err);
					connection.release(); // Release the connection back to the pool
					reject(err); // Reject the promise with the error
				} else {
					// Process fetched products
					const products = rows.map(row => row); 
					resolve(products); // Resolve the promise with the array of products					
				}
			});
		});
	}
}

async function verifyUserAccount(custusername, password, connection) {
    try {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE Custusername = ? AND PasswordHash = ?', [custusername, password], 
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length === 0) {
                        reject(new Error('Invalid username or password.'));
                    } else {
                        resolve(results);
                    }
                }
            });
        });
    } catch (error) {
        throw error;
    }
}

async function createUser(username, password, email, connection) {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(
                "INSERT into users (Custusername, PasswordHash, Email) VALUES (?,?,?)",
                [username, password, email],
                (error, results) => {
                    if (error) {
                        reject(error); // Reject the promise if there's an error
                    } else {
                        resolve(results); // Resolve the promise with the query results
                    }
                }
            );
        });

        console.log('User inserted successfully');
        return { success: true }; // Indication of success
    } catch (error) {
        console.error('Error creating user', error);
        throw error; // Rethrow the error
    } finally {
        connection.release(); // Release the database connection
    }
}

async function verifyAdminAccount(adminusername, password, connection) {
    try {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM admins WHERE AdminUserName = ? AND PasswordHash = ?', [adminusername, password], 
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length === 0) {
                        reject(new Error('Invalid username or password.'));
                    } else {
                        resolve(results);
                    }
                }
            });
        });
    } catch (error) {
        throw error;
    }
}

async function createAdmin(adminusername, password, email, connection) {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(
                "INSERT into users (AdminUserName, PasswordHash, Email) VALUES (?,?,?)",
                [adminusername, password, email],
                (error, results) => {
                    if (error) {
                        reject(error); // Reject the promise if there's an error
                    } else {
                        resolve(results); // Resolve the promise with the query results
                    }
                }
            );
        });

        console.log('Administrator inserted successfully');
        return { success: true }; // Indication of success
    } catch (error) {
        console.error('Error creating administrator', error);
        throw error; // Rethrow the error
    } finally {
        connection.release(); // Release the database connection
    }
}

async function updateProductQuantity(product, buy_quantity, connection){
    try {
        const currentStock = await new Promise((resolve, reject) => {
            connection.query(
                'SELECT StockQuantity FROM products WHERE Name = ?', [product],
                (error, results) => {
                    if (error) {
                        reject(error); 
                    } else {
                        resolve(results); 
                    }
                }
            );
        });

        const newStock = currentStock - buy_quantity;
        if (newStock < 0) {
            throw new Error('Insufficient stock'); 
        }

        await new Promise((resolve, reject) => {
            connection.query(
                'UPDATE products SET StockQuantity = ? WHERE Name = ?',[newStock, product],
                (error, results) => {
                    if (error) {
                        reject(error); 
                    } else {
                        resolve(); // Resolve the promise if the update is successful
                    }
                }
            );
        });

        console.log('Purchase has been registered');
        return { success: true }; // Indication of success
    } catch (error) {
        console.error('Error purchasing product', error);
        throw error; // Rethrow the error
    } finally {
        connection.release(); // Release the database connection
    }
}
module.exports = { Product, createUser, verifyUserAccount, createAdmin, verifyAdminAccount, updateProductQuantity };

