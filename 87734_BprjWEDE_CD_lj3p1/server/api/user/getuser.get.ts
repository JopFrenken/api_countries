import mysql from "mysql2";
import { eventHandler } from 'h3';

export default eventHandler(async (event) => {
    try {
        // url param
        const params = getQuery(event);

        // db connection
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'api_countries',
        });

        // query to get user's travel list
        const query = `SELECT username FROM users WHERE id = ${params.userId}`;
        const executeQuery = () => {
            return new Promise((resolve, reject) => {
                connection.query(query, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        };

        const queryResult: any = await executeQuery();

        connection.destroy();

        return {
            success: true,
            username: queryResult[0].username
        }

    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
})