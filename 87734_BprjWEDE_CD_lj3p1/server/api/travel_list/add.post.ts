import mysql from "mysql2";
import { eventHandler } from 'h3';

export default eventHandler(async (event) => {
    const body = await readBody(event);
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'api_countries',
        });

        let user_id = event.context.session.userId;
        console.log("USERID TESTTTT: " + user_id);


        const query = 'INSERT INTO travel_list (user_id, country) VALUES (?, ?)';
        const values = [user_id, body.countryName];

        const executeQuery = () => {
            return new Promise((resolve, reject) => {
                connection.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.error('Error adding to list:', error);
                        reject(error);
                    } else {
                        console.log('Country added successfully');
                        resolve(results);
                    }
                });
            });
        };

        const queryResult = await executeQuery();

        connection.destroy();

        return 'Country added.'

    } catch (error) {
        return error;
    }

})