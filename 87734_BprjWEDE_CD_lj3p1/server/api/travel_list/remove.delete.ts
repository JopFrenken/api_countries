import mysql from "mysql2";
import { eventHandler } from 'h3';

export default eventHandler(async (event) => {
    try {
        const params = getQuery(event);
        const { user_id, country } = params;

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'api_countries',
        });

        const deleteQuery = `DELETE FROM travel_list WHERE user_id = ? AND country = ?`;
        const deleteValues = [user_id, country];

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

        // Fetch remaining countries after deletion
        const selectQuery = `SELECT * FROM travel_list WHERE user_id = ?`;
        const selectValues = [user_id];

        const executeSelectQuery = () => {
            return new Promise((resolve, reject) => {
                connection.query(selectQuery, selectValues, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        };

        const remainingCountries = await executeSelectQuery();

        connection.destroy();

        return {
            success: true,
            message: `Country deleted successfully`,
            remainingCountries: remainingCountries
        }

    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
})
