import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import { eventHandler } from 'h3';

export default eventHandler(async (event) => {
    let body = await readBody(event);

    try {
        // Generate a salt and hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        // db connection
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'api_countries',
        });

        // query to register user
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const values = [body.username, body.email, hashedPassword]; // Store the hashed password in the database

        // Wrap the connection.query operation in a Promise
        const executeQuery = () => {
            return new Promise((resolve, reject) => {
                connection.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.error('Error registering user:', error);
                        reject(error);
                    } else {
                        console.log('User registered successfully');
                        resolve(results);
                    }
                });
            });
        };

        const queryResult = await executeQuery();

        connection.destroy();

        return "User registered successfully";
    } catch (error) {
        return error;
    }
});
