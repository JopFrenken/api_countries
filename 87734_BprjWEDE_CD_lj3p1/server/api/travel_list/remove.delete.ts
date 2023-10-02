import mysql from "mysql2";
import { eventHandler } from 'h3';

export default eventHandler(async (event) => {
    try {
        const body = await readBody(event); // Assuming readBody function is available
        const { user_id, id } = JSON.parse(body);

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'api_countries',
        });

        const deleteQuery = `DELETE FROM travel_list WHERE user_id = ? AND country = ?`;
        const deleteValues = [user_id, id];

        const executeDeleteQuery = () => {
            return new Promise((resolve, reject) => {
                connection.query(deleteQuery, deleteValues, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        };

        await executeDeleteQuery(); // Execute the delete query

        connection.destroy();

        return {
            success: true,
            message: `Country deleted successfully for user.`
        }

    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
})
