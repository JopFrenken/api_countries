import mysql from "mysql2";
import { eventHandler } from 'h3';

export default eventHandler(async (event) => {
    const body = await readBody(event);

    // connects to db
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'api_countries',
        });

        // check if country already exists in list
        const checkDuplicateQuery = 'SELECT * FROM travel_list WHERE user_id = ? AND country = ?';
        const checkDuplicateValues = [body.user_id, body.countryName];

        const checkDuplicate = () => {
            return new Promise((resolve, reject) => {
                connection.query(checkDuplicateQuery, checkDuplicateValues, (error, results: any, fields) => {
                    if (error) {
                        console.error('Error checking for duplicate:', error);
                        reject(error);
                    } else {
                        resolve(results.length > 0);
                    }
                });
            });
        };

        // if duplicate, stop the action and return
        const isDuplicate = await checkDuplicate();
        if (isDuplicate) {
            connection.destroy();
            return {
                success: false,
                message: 'Country already in the list.',
            };
        }

        // query for adding country to list
        const insertQuery = 'INSERT INTO travel_list (user_id, country) VALUES (?, ?)';
        const insertValues = [body.user_id, body.countryName];
        const executeInsertQuery = () => {
            return new Promise((resolve, reject) => {
                connection.query(insertQuery, insertValues, (error, results, fields) => {
                    if (error) {
                        console.error('Error adding to list:', error);
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        };

        await executeInsertQuery();

        connection.destroy();

        return {
            success: true,
            message: 'Country added.',
        };

    } catch (error) {
        return {
            success: false,
            message: error
        };
    }
});
