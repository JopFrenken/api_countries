import mysql from 'mysql2';
import { useAuthStore } from '~/store/auth';


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
            return {
                success: false,
                msg: "User not found or password incorrect",
            }
        }

        const user_id = userQueryResult[0].id;
        // After successful login
        const authStore = useAuthStore();
        authStore.setUserId(user_id); // Assuming you have the 'user_id' value available after the login

        connection.destroy()
        return {
            success: true,
            msg: "Successfully logged in.",
            user_id
        }
    } catch (error) {
        return error
    }
})
