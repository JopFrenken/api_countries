import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { eventHandler } from 'h3';
import crypto from 'crypto';

export default eventHandler(async (event) => {
    let body = await readBody(event);
    try {
        // db connection
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'api_countries',
        });

        // query to check if user exists
        const checkUserQuery = 'SELECT id, password FROM users WHERE username = ?';
        const checkUserValues = [body.username];
        const userQueryResult: any = await new Promise((resolve, reject) => {
            connection.query(checkUserQuery, checkUserValues, (error, results, fields) => {
                if (error) {
                    console.error('Error checking user:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (userQueryResult.length === 0) {
            // User not found, return an error or appropriate response
            return {
                success: false,
                msg: "User not found",
            };
        }

        const hashedPassword = userQueryResult[0].password;
        const user_id = userQueryResult[0].id;

        // Compare the hashed password from the database with the entered password
        const passwordMatch = await bcrypt.compare(body.password, hashedPassword);

        if (!passwordMatch) {
            // Passwords do not match, return an error or appropriate response
            return {
                success: false,
                msg: "Incorrect password",
            };
        }

        const secretKey = crypto.randomBytes(32).toString('hex');
        const userData = {
            userId: user_id, // This should come from your authentication process
        };

        // sets jwt token to use in frontend
        const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });

        connection.destroy();
        return {
            success: true,
            msg: "Successfully logged in.",
            token,
            user_id
        };
    } catch (error) {
        return error;
    }
});
