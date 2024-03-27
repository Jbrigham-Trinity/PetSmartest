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
					console.log('Fetched products:', rows);
					const products = rows.map(row => row); 
					resolve(products); // Resolve the promise with the array of products					
				}
			});
		});
	}
}

module.exports = Product;