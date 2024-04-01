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



async function getUserByUsernameAndPassword(username, password) {
	try {
	const [rows] = await connection.query('SELECT * from users WHERE username = ? AND password = ?', [username, password])
	return rows.length > 0 ? rows[0] : null;
	} catch (error){
		throw error;
	}
}

async function createUser(username, password, email, connection) {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(
                "INSERT into users (UserID, Username, PasswordHash, Email) VALUES (?,?,?,?)",
                [11, username, password, email],
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
module.exports = { Product, createUser };

