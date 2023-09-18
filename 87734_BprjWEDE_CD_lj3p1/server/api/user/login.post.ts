import mysql from 'mysql2';
import { eventHandler } from 'h3'

export default eventHandler(async (event) => {
    let body = await readBody(event);

    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'api_countries',
        });

        const checkUserQuery = 'SELECT id FROM users WHERE username = ? AND password = ?';
        const checkUserValues = [body.username, body.password];

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
            return "User not found or password incorrect";
        }

        const user_id = userQueryResult[0].id;
        event.context.session.user_id = user_id;
        connection.destroy()
        return "Success, logged in."
    } catch (error) {
        return error
    }
})