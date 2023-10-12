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
        const query = `SELECT * FROM travel_list WHERE user_id = ${params.userId}`;
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

        const queryResult = await executeQuery();

        connection.destroy();

        return {
            success: true,
            list: queryResult
        }

    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
})